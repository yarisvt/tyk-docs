---
date: 2017-03-23T15:50:24Z
title: JSON Web Tokens
menu:
  main:
    parent: "Your APIs"
weight: 5 
---

A [JSON Web Token](http://jwt.io/introduction/) (JWT) is a JSON-based open standard (RFC 7519) for passing claims between parties in a web application environment. The tokens are designed to be compact, URL-safe and usable especially in web browser single sign-on (SSO) context.

One of the best things about a JWT is that it is cryptographically signed, and can be signed in a number of ways such as using HMAC shared secret and RSA public/private key pairs.

What is useful is when a token is issued by a third-party (e.g. an OAuth provider, or an SSO interface), that third party can use a private key to sign the claims of the token, and then any third-party can verify that the claims were issued by a safe third-party by validating the signature using a public key.

## Option 1: JWTs with Tyk

![Tyk JWT Flow Diagram](/docs/img/diagrams/jwt2.png)

Tyk supports storing a shared secret in your API definition (either an RSA public key or a HMAC shared secret) that will be used to validate any inbound JSON Web Token for the given API.

For example, if you are using a third-party identity provider (IdP) that can issue JWTs, you can embed their public key in your API Definition, and then use this public key to validate the claims on the inbound token.

With Tyk, you can set up some specific claims that will then enforce a token policy on this identity, and the token policy quotas and rate limits will be maintained for the given JWT holder identity even if a new JWT is issued, so long as the Tyk-specific claims remain unchanged.

Currently HMAC Signing and RSA Public/Private key signing is supported. To enable centralised JWT on an API, add the following to the root of your API Definition:

```{.copyWrapper}
"enable_jwt": true,
"jwt_source": "BASE64-Encoded secret",
"jwt_identity_base_field": "sub",
"jwt_policy_field_name": "pol",
"jwt_signing_method": "rsa"
```

`jwt_identity_base_field` - The `sub` claim will be the base for this token's identity. It could represent a user id and as such, needs to be unique as it will form the basis of the token tyk will use internally to enforce rate limits & quotas.

`jwt_policy_field_name` - The `pol` claim (e.g `72ab02b3be743101c6132342`) is the policy id to apply to this token, the policy will be applied the first time the token is seen and then modified if the policy changes in the claim.

---

### Configure JWT Support in the Dashboard

Getting JWT support set up in the Dashboard only requires a few fields to be set up in the Core settings tab:

#### Step 1: Set Authentication Mode

Select JSON Web Tokens as the Authentication mode:

![Target Details: JSON Web Token](/docs/img/dashboard/system-management/jwt_auth_2.5.png)

#### Step 2: Set the JWT Signing Method

Set the cryptographic method to use. this can either be an **RSA public key** or a **HMAC shared secret**. If using a RSA, you can use either a PEM encoded **Public Key**, or a JWKS REST discovery endpoint.  JWKS is covered more in option #3.

Note, if you want to embed this at the Key level, leave this field blank.

![JWT signing method dropdown](/docs/img/dashboard/system-management/jwt_sign_2.5.png)

#### Step 3: Set the Identity Source and Policy Field Name

![Policy and identity claim form](/docs/img/dashboard/system-management/jwt_claim_2.7.png)

* **The Identity Source**: This is the identity that will be affected by the underlying policy (e.g. if you set this to use the `sub` claim, and this is traditionally a user ID of some sort, then Tyk will begin a rate limiter and quota counter for this specific identity). If you wanted to instead limit a client, e.g. all the users of a specific application, then you can use a different identity claim that identifies the group (i.e. one that is shared by all JWTs issued).

* **The Policy Field Name**: This is a custom requirement for Tyk. You need to tell Tyk which claim will signal to it the correct policy to use. A policy encapsulates rate limits, quota and security information and Tyk will use this policy to apply the correct access rules to the identity that has been specified in the Identity claim above.

#### Step 4: Set a Default Policy

![Default Policy](/docs/img/dashboard/system-management/jwt_default_policy2.9.3.png)

If your JWT policy ID is missing, a default policy can be used. Set your default policy from the drop-down list.

#### Step 5: Use Scope Claim

See [Setting JWT Scope Claims](/docs/advanced-configuration/integrate/api-auth-mode/open-id-connect/#setting-jwt-scope-claims-with-the-dashboard) for more details on this option.

#### Step 6: Authentication Configuration

![Auth Configuration](/docs/img/dashboard/system-management/auth_config2.9.3.png)

1. Tyk will by default assume you are using the `Authorization` header, but you can change this by setting the **Auth Key Header** name value
2. You can select whether to use a URL query string parameter as well as a header, and what parameter to use. If this is left blank, it will use the **Auth Key Header** name value.
3. You can select whether to use a **cookie value**. If this is left blank, it will use the Header name value.


#### Step 7: Generate an API policy

Now that you have created the API and set its parameters for the JWTs, you will also need to generate a policy that has access to your API(s). You can do this in the policies editor.

Once the API is saved and you have a policy created for this API, generate a JWT using your identity provider, a library or one of the many test JWT generators available on the web, and make sure that they have the identity and policy claims added to their claim set. Once the token is generated, use it as an `Authorization: Bearer {token}` header in your requests to Tyk.

Tyk will now handle inbound traffic transparently so long as the policy ID being used is valid.

---

## Option 2: Individual JWT secrets

Tyk supports validating an inbound token against a stored key. Tyk will not issue JWTs, but can issue a token ID that is bound to a JWT key so that inbound tokens that bear this id (key) can be validated.

Currently HMAC Signing and RSA Public/Private key signing is supported. To enable JWT on an API, add this to your API Definition:

```{.copyWrapper}
"enable_jwt": true,
"jwt_signing_method": "rsa"
```

Then set your tokens up with these new fields when you create them:

```{.copyWrapper}
"jwt_data": {
  "secret": "Secret"
}
```

HMAC JWT secrets can be any string, but the secret is shared and therefore less secure since the same key is used for signing and validation.

RSA secrets must be a PEM encoded PKCS1 or PKCS8 RSA private key, these can be generated on a Linux box using:

```{.copyWrapper}
openssl genrsa -out key.rsa 
openssl rsa -in key.rsa -pubout > key.rsa.pub
```

When a JWT is passed to Tyk for validation, it *must* use the `kid` header field, as this is the internal access token (when creating a key) that is used to track the rate limits, policies and quotas for the token owner.

If Tyk cannot find a `kid` header, it will try to find an ID in the `sub` field of the claims section. This is not recommended, but is supported as many JWT libraries do not necessarily set the `kid` header claim (especially publicly available test generators).

The benefit here is that if RSA is used, then all that is stored in a Tyk installation that uses hashed keys is the hashed ID of the end user and their public key, so it is very secure.

---

## Option 3: Dynamic public key rotation using JWKs

Instead of specifying static public key in API definition, it is possible to specify URL pointing to JSON Web Key Set (JWKs). At the most basic level, the JWKs is a set of keys containing the public keys that should be used to verify any JWT issued by the authorization server. You can read more about JWKs here: https://auth0.com/docs/jwks

Using JWKs you can maintan dynamic list of currently active public keys, and safely rotate them, since both old and new JWT tokens will work, until you remove expired JWK. Generated JWT keys should have `kid` a claim, which should match with the `kid` field of JWK, used for validating the token. 

So, instead of using a static public key, we would use 

![JWKS Public Key Rotation](/docs/img/dashboard/system-management/JWKS_Key_Rotation_3_1.png)

This /certs endpoint returns the following payload:

```{.json}
{
  "keys": [
      {
          "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM",
          "kty": "RSA",
          "alg": "RS256",
          "use": "sig",
          "n": "k-gUvKl9-sS1u8odZ5rZdVCGTe...m2bMmw",
          "e": "AQAB",
          "x5c": [
              "MIICmzCCAYMCBgFvyVrRq....K9XQYuuWSV5Tqvc7mzPd/7mUIlZQ="
          ],
          "x5t": "6vqj9AeFBihIS6LjwZhwFLmgJXM",
          "x5t#S256": "0iEMk3Dp0XWDITtA1hd0qsQwgES-BTxrz60Vk5MjGeQ"
      }
  ]
}

```

This is a JWKS complaint payload.  If the issuer generates an ID Token or Access Token using OIDC or OAuth 2.0, the header will include the following kid, which matches the JWKS kid above.

```{.json}
{
  "alg": "RS256",
  "typ": "JWT",
  "kid": "St1x2ip3-wzbrvdk4yVa3-inKWdOwbkD3Nj3gpFJwYM"
}
```

The Bearer tokens will be signed by the private key of the issuer, which in this example is our keycloak host.  This bearer token can be verified by Tyk using the public key available in the above payload under "x5C".

All of this happens automatically.  You just need to specify to Tyk what the JWKs url is, and then apply a "sub" and default policy in order for everything to work.  See Step #3, 4, and 5 under option #1 for examples above.

## JWT Clock Skew Configuration

> **NOTE**: Available from v2.7.2 onwards

Due to the nature of distributed systems it is expected that despite best efforts you can end up in a situation with clock skew between the issuing party (An OpenID/OAuth provider) and the validating party (Tyk).

This means that in certain circumstances Tyk would reject requests to an API endpoint secured with JWT with the `Token is not valid yet` error . This occurs due to the clock on the Tyk server being behind the clock on the Identity Provider server even with all servers ntp sync'd from the same ntp server.

You can now configure JWT clock skew using the following variables. All values are in seconds. The default is `0` (i.e. no skew).

```{.json}
"jwt_issued_at_validation_skew": 0,
"jwt_expires_at_validation_skew": 0,
"jwt_not_before_validation_skew": 0
```

#### JWT scope to policy mapping support

> **NOTE**: This feature is available starting from v2.9

You can map JWT scopes to security policies to be applied to a key. To enable this feature you will need to specify the following fields in your API spec:

```{.copyWrapper}
  "jwt_scope_to_policy_mapping": {
    "admin": "59672779fa4387000129507d",
    "developer": "53222349fa4387004324324e"
  },
  "jwt_scope_claim_name": "our_scope"
}
```

Here we have set:

- `"jwt_scope_to_policy_mapping"` provides mapping of scopes (read from claim) to actual policy ID. I.e. in this example we specify that scope "admin" will apply policy `"59672779fa4387000129507d"` to a key
- `"jwt_scope_claim_name"` identifies the JWT claim name which contains scopes. This API Spec field is optional with default value `"scope"`. This claim value is a string with space delimited list of values (by standard)


> **NOTE**: several scopes in JWT claim will lead to have several policies applied to a key. In this case all policies should have `"per_api"` set to `true` and shouldn't have the same `API ID` in access rights. I.e. if claim with scopes contains value `"admin developer"` then two policies `"59672779fa4387000129507d"` and `"53222349fa4387004324324e"` will be applied to a key (with using our example config above).
