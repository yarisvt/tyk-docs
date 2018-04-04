---
title: Tyk Gateway v2.6 and more
menu:
  main:
    parent: "Release Notes"
weight: 0 
---

# <a name="new"></a>New in this Release:

## <a name="gateway"></a>Tyk Gateway v2.6.0

### Organisation Level Rate Limiting

Endpoints [Create organisation keys](https://tyk.io/docs/tyk-rest-api/organisation-quotas/#create-organisation-keys) and 
[Add/update organisation keys](https://tyk.io/docs/tyk-rest-api/organisation-quotas/#add-update-organisation-keys) now 
allow you to set rate limits at an organisation level. You will need to add the following fields in your create/add/update key request:

* `"allowance"`
* `"rate"`

These are the number of allowed requests for the specified `per` value, and need to be set to the same value.

* `"per"` is the time period, in seconds.

So, if you want to restrict an organisation rate limit to 100 requests per second you will need to add the following to your request:
```
    "allowance": 100,
    "rate": 100,
    "per": 5
```

> **NOTE:** if you don't want to have organisation level rate limiting, set `"rate"` or `"per"` to zero, or don't add them to your request.

### Keys hashing improvements

Now it is possible to do more operations with key by hash (when we have setting `"hash_keys": true` in `tyk.conf`):

- endpoints `POST /keys/create`, `POST /keys` and `POST /keys/{keyName}` also return field `"key_hash"` for future use
- endpoint `GET /keys` get all (or per API) key hashes, you can disable this endpoint with using new tyk.conf setting `enable_hashed_keys_listing` (false by default)
- endpoint `GET /keys/{keyName}` was modified to be able to get key by hash. You just need provide key hash as a `keyName` 
and call it with new optional query parameter `hashed=true`, so new format is `GET /keys/{keyName}?hashed=true"`
- also, we already have the same optional parameter for endpoint `DELETE /keys/{keyName}?hashed=true`

### JSON schema validation

You can now use Tyk to verify users’ requests against specified JSON schema and check that the data sent to your API by a consumer is in the right format. This means you can offload data validation from your application onto us.

If it’s not in the right format, then the request will be rejected. And even better, the response will be a meaningful error rather than just a ‘computer says no’.

Schema validation implemented as rest of plugins, and its configuration should be put to `extended_paths` in following format:
```
"validate_json": [{
  "method": "POST",
  "path": "me",
  "schema": {..schema..}, // JSON object
  "error_response_code": 422 // 422 default however can override.
}]
```

The schema must be a draft v4 JSON Schema spec, see http://json-schema.org/specification-links.html#draft-4 for details. Example schema can look like this:
```
{
    "title": "Person",
    "type": "object",
    "properties": {
        "firstName": {
            "type": "string"
        },
        "lastName": {
            "type": "string"
        },
        "age": {
            "description": "Age in years",
            "type": "integer",
            "minimum": 0
        }
    },
    "required": ["firstName", "lastName"]
}
```


### New endpoint to get list of tokens generated for provided OAuth-client

`GET /oauth/clients/{apiID}/{oauthClientId}/tokens`

This endpoint allows you to retrieve a list of all current tokens and their expiry date issued for a provided API ID and OAuth-client ID in the following format. New endpoint will work only for newly created tokens:
```
[
    {
        "code": "5a7d110be6355b0c071cc339327563cb45174ae387f52f87a80d2496",
        "expires": 1518158407
    },
    {
        "code": "5a7d110be6355b0c071cc33988884222b0cf436eba7979c6c51d6dbd",
        "expires": 1518158594
    },
    {
        "code": "5a7d110be6355b0c071cc33990bac8b5261041c5a7d585bff291fec4",
        "expires": 1518158638
    },
    {
        "code": "5a7d110be6355b0c071cc339a66afe75521f49388065a106ef45af54",
        "expires": 1518159792
    }
]
```

You can control how long you want to store expired tokens in this list using `oauth_token_expired_retain_period ` which specifies retain period for expired tokens stored in redis. By default expired token not get removed.

### Creating oAuth clients with access to multiple APIs

When creating a client using `POST /oauth/clients/create`, `api_id` now optional - these changes make endpoint more generic, if we provide API ID it works the same it was before, if we don't provide API ID it uses policy's access rights and enumerates APIs from there setting the same newly created oauth-client. 

At the moment this changes not reflected on Dashboard UI yet, as we going to do major oAuth improvements in 2.7

### Certificate public key pinning

Certificate pinning is a feature which allows you to whitelist public keys used to generated certificates, so you will be protected in cases when upstream certificate is compromised.

Using Tyk you can white-list one or multiple public keys per domain. Wildcard domains also supported.

Public keys stored inside Tyk certificate storage, so you can use Certificate API to manage them.

You can define them globally, using Tyk configuration file and `security.pinned_public_keys` option, or via API definition `pinned_public_keys` field, using the following format:
```
{
    "example.com": "<key-id>",
    "foo.com": "/path/to/pub.pem",
    "*.wild.com": "<key-id>,<key-id-2>"
}
```

As `key-id` you should set ID returned after you uploaded public key using Certificate API. Additionally, you can just set path to public key, located on your server. You can specify multiple public keys by separating their IDs by a comma.

Note that only public keys in PEM format are supported.

If public keys are not provided by your upstream, you can extract them
by yourself using the following command:
> openssl s_client -connect the.host.name:443 | openssl x509 -pubkey -noout

If you already have a certificate, and just need to get its public key, you can do it using the following command:
> openssl x509 -pubkey -noout -in cert.pem

PS. Upstream certificates now also have wildcard domain support

## JQ transformations

If you worked with JSON you probably know popular `jq` command line JSON processor, learn more about it here https://stedolan.github.io/jq/

Now you can use the full power of its queries and transformations, to transform requests, responses, headers and even context variables.

We added two new plugins `transform_jq_response` - for transorming responses, and `transform_jq` for transforming requests. 
Both have the same structure, similar to rest of plugins: `{ "path": "<path>", "method": "<method>", "filter": "<content>" }`

### Request transform
Inside request transform you can use following variables: 
* `.body` - your current request body
* `._tyk_context` - Tyk context variables, you can use it to access request headers as well.

Your JQ request transform should return object with following format: `{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>, "tyk_context": <set-or-add-context-vars> }`. `body` is required, while `rewrite_headers` and `tyk_context` are optional.


### Response transform 
Inside response transform you can use following variables: 
* `.body` - your current response body
* `._tyk_context` - Tyk context variables, you can use it to access request headers as well.
* `._tyk_response_headers` - Access to response headers

Your JQ response transform should return object with following format: `{ "body": <transformed-body>, "rewrite_headers": <set-or-add-headers>}`. `body` is required, while `rewrite_headers` is optional.

### Example
```
"extended_paths": {
  "transform_jq": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-REQUEST-BY-JQ\": true, path: ._tyk_context.path, user_agent: ._tyk_context.headers_User_Agent}), \"rewrite_headers\": {\"X-added-rewrite-headers\": \"test\"}, \"tyk_context\": {\"m2m_origin\": \"CSE3219/C9886\", \"deviceid\": .body.DEVICEID}}"
   }],
  "transform_jq_response": [{
    "path": "/post",
    "method": "POST",
    "filter": "{\"body\": (.body + {\"TRANSFORMED-RESPONSE-BY-JQ\": true, \"HEADERS-OF-RESPONSE\": ._tyk_response_headers}), \"rewrite_headers\": {\"JQ-Response-header\": .body.origin}}"
  }]
}
```


## <a name="dashboard"></a>Tyk Dashboard v1.6.0

### API categories

You can attach multiple categories to an API definition, and then filter by these categories on the API list page.

They might refer to the API’s general focus: ‘weather’, ‘share prices’; geographic location ‘APAC’, ‘EMEA’; or  technical markers ‘Dev’, ‘Test’. It’s completely up to you.

From API perspective, categories are stored inside API definition `name` field like this: "Api name #category1 #category2", e.g. categories just appended to the end of the name. 

Added new API `/api/apis/categories` to return list of all categories and belonging APIs.

### Raw API edit mode

Now you can directly edit API definition JSON object directly from API designer, by simply toggling between the ‘visual’ and the ‘raw’ in top header. 

This feature comes especially handy if you need copy paste parts of one API to another, or if you need to access fields not yet exposed to Dashbard UI.

### Certificate public key pinning

You can configure pinning on "Advanced" tab of API designer screen, in a similar maneer how you specify upstream client certificates.

### JSON schema validation

Reflecting Gateway changes, on Dashboard we added new "Validate JSON" plugin, which you can specify per URL, and can set both schema, and custom error code, if needed.

### JQ transforms
Added two new plugins "JQ transform" and "JQ response transform". See Gateway changelog above, on documentation how to use this feature.  

### Improved key hashing support

Dashboard API reflect changes in Gateway API, mentioned above, and now supports more operations with key by hash (when we have setting `"hash_keys": true` in `tyk_analytics.conf`):

- endpoint `POST /keys/` also returns new field "key_hash" per each key in the list
- endpoint `GET /apis/{apiId}/keys/{keyId}` supports query string parameter `hashed=true` to get key info via hash
- endpoint `GET /apis/{apiId}/keys` returns keys hashes
- endpoint `DELETE /apis/{apiId}/keys?hashed=true` can delete key by its hash, but its functionality disabled by default, unless you set `enable_delete_key_by_hash` boolean option inside Dashboard configuration file. 


### Key requests management API now supports OAuth

For this latest release we’ve improved our developer portal APIs to fully support OAuth2.0 based workflow. Developers using your API will now be able to register OAuth clients and manage them.

This change not yet supported by our built-in portal, but if you are using custom developer portals, you can start using this new functionality right away. Full UI support for built-in portal will be shipped with our next 2.7 release.

Developers can request access to an API protected with OAuth and get OAuth client credentials.

The endpoint `POST /api/portal/requests` now has an optional `"oauth_info"` field which identifies the OAuth key request.

Example of the OAuth key request:  
```
{
  "by_user": "5a3b2e7798b28f03a4b7b3f0",
  "date_created": "2018-01-15T04:49:20.992-04:00",
  "for_plan": "5a52dfce1c3b4802c10053c8",
  "version": "v2",
  "oauth_info": {
    "redirect_uri": "http://new1.com,http://new2.com"
  }
}
```

Where:

- `"by_user"` - contains ID of portal developer who is requesting OAuth access
- `"for_plan"` - subscription ID
- `"version"` is expected to have values `"v2"`
- `"oauth_info"` - simple structure which contains a field with comma-separated list of redirect URI for OAuth flow

This new field `"oauth_info"` will be present in replies for endpoints `GET /api/portal/requests/{id}` and `GET /api/portal/requests`

When this kind of OAuth key request gets approved when using endpoint `PUT /api/portal/requests/approve/{id}` 
a new OAuth-client is generated for a developer specified in the specified `"by_user"` field.

Example of OAuth key request approval reply:
```
{
    "client_id": "203defa5162b42708c6bcafcfa28c9fb",
    "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw",
    "policy_id": "5a52dfce1c3b4802c10053c8",
    "redirect_uri": "http://new1.com,http://new2.com"
}
```

Where:

- `"client_id"` and `"secret"` are OAuth-client credentials used to request get token (they to be kept in secret)
- `"policy_id"` - subscription this OAuth-client provides access to
- `"redirect_uri"` - with comma-separated list of redirect URI for OAuth flow

Also, if you set email notifications in your portal, an email with the  OAuth-client credentials will be sent to the developer 
who made that OAuth key request.

There is also a change in the reply from endpoint `GET /api/portal/developers` - developer object will have new field
`"oauth_clients"` which will contain a mapping of subscription IDs to the list of OAuth clients that the developer requested and
was approved, i.e.:
```
"oauth_clients": {
    "5a52dfce1c3b4802c10053c8": [
        {
            "client_id": "203defa5162b42708c6bcafcfa28c9fb",
            "redirect_uri": "http://new1.com,http://new2.com",
            "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw"
        }
    ]
},
```

### New endpoints to get tokens per OAuth-client

These endpoints allow you to get a list of all current tokens issued for provided OAuth client ID:

- `GET /apis/oauth/{apiId}/{oauthClientId}/tokens`
- `GET /apis/oauth/{oauthClientId}/tokens` when the API ID is unknown or OAuth-client provides access to several APIs


### Developers can get more than one key per subscription

Dashboard [Manage Key Requests](https://tyk.io/docs/tyk-dashboard-api/manage-key-requests/) API now allows you to submit 
more than one key request for developer per subscription.

Also, [Portal Developers](https://tyk.io/docs/tyk-dashboard-api/portal-developers/) endpoints have one small changes in 
reply format. The list of the developer `"subscriptions"` field are now a comma-separated list of keys (for developers who 
requested and got approved several keys per subscription).

This change right now is API only, and not included into our built-in portal.

### SSO API custom email support

Now you can set email address for users logging though Dashboard SSO API, by adding "Email" field to JSON payload which you sent to `/admin/sso` endpoint. For example:
```
POST /admin/sso HTTP/1.1
Host: localhost:3000
admin-auth: 12345
    
{
    "ForSection": "dashboard",
    "Email": "user@example.com",
    "OrgID": "588b4f0bb275ff0001cc7471"
}
```

### Set Catalogue settings for each individual API 

Now you can override the global catalogue settings and specify settings per catalogue. 
Catalogue object now has `config` field, with exactly same structure as Portal Config, except new `override` boolean field. 
If set, Catalogue settings will override global ones. 

At the moment following options can be overriden: `Key request fields`, `Require key approval` and `Redirect on key request` (with `Redirect to` option as well).

## Tyk Identity Broker v0.4.0

With this release TIB join Tyk product line as a first class citizen and now distributed via packages and docker images.

### Support for SSO API email field
If IDP provides user email, it should be passed to the Dashboard SSO API, and you should see it dashboard ui.

### Improved support for local IDPs
If you run local IDP, like Ping, with untrusted SSL certificate, you now can turn off SSL verification by setting `SSLInsecureSkipVerify` to `true` in TIB configuration file. 

### Added Redis TLS support
To enable set `BackEnd.UseSSL` and, optionally, `BackEnd.SSLInsecureSkipVerify`.


## Redis TLS support

Many Redis hosting providers now support TLS and we’re pleased to confirm that we do too.

Whether it’s the open source API Gateway, or Dashboard, Pump, Sink and Tyk Identity Broker (TIB): you can now make secure connections to Redis from all Tyk products, as long as your provider allows it.

## <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/).

## <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)




