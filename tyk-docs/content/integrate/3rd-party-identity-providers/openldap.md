---
date: 2017-03-24T17:02:11Z
title: OpenLDAP
menu:
  main:
    parent: "3rd Party Identity Providers"
weight: 0 
---

## Integration Tutorials: OpenLDAP

The LDAP Identity Provider is experimental currently and provides limited functionality to bind a user to an LDAP server based on a username and password configuration. The LDAP provider currently does not extract user data from the server to populate a user object, but will provide enough defaults to work with all handlers.

## <a name="log-into-the-dashboard-using-ldap"></a> Log into the Dashboard using LDAP

Below is a sample TIB profile that can be used to log a user into the Dashboard using an LDAP pass-through provider:

```{.copyWrapper}
    {
        "ActionType": "GenerateOrLoginUserProfile",
        "ID": "4",
        "OrgID": "{YOUR-ORG-ID}",
        "ProviderConfig": {
            "FailureRedirect": "http://{DASH-DOMAIN}:{DASH-PORT}/?fail=true",
            "LDAPAttributes": [],
            "LDAPPort": "389",
            "LDAPServer": "localhost",
            "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=test-ldap,dc=tyk,dc=io"
        },
        "ProviderName": "ADProvider",
        "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
        "Type": "passthrough"
    }

```
    

The only step necessary to perform this is to send a POST request to the LDAP URL.

TIB can pull a username and password out of a request in two ways:

1.  Two form fields called "username" and "password"
2.  A basic auth header using the Basic Authentication standard form

By default, TIB will look for the two form fields. To enable Basic Auth header extraction, add `"GetAuthFromBAHeader": true` to the `ProviderConfig` section.

The request should be a `POST`.

If you make this request with a valid user that can bind to the LDAP server, Tyk will redirect the user to the dashboard with a valid session. There's no more to it, this mechanism is pass-through and is transparent to the user, with TIB acting as a direct client to the LDAP provider.

> **Note**: The `LDAPUserDN` field MUST contain the special `*USERNAME*` marker in order to construct the users OU properly.


## <a name="generate-an-oauth-token-using-ldap"></a> Generate an OAuth token using LDAP

The configuration below will take a request that is posted to TIB, authenticate it against LDAP, if the request is valid, it will redirect to the Tyk Gateway OAuth clients' `Redirect URI` with the token as a URL fragment:

```{.copyWrapper}
    {
        "ActionType": "GenerateOAuthTokenForClient",
        "ID": "6",
        "IdentityHandlerConfig": {
            "DashboardCredential": "{DASHBAORD-API-ID}",
            "DisableOneTokenPerAPI": false,
            "OAuth": {
                "APIListenPath": "{API-LISTEN-PATH}",
                "BaseAPIID": "{BASE-API-ID}",
                "ClientId": "{TYK-OAUTH-CLIENT-ID}",
                "RedirectURI": "http://{APP-DOMAIN}:{PORT}/{AUTH-SUCCESS-PATH}",
                "ResponseType": "token",
                "Secret": "{TYK-OAUTH-CLIENT-SECRET}"
            }
        },
        "MatchedPolicyID": "POLICY-ID",
        "OrgID": "53ac07777cbb8c2d53000002",
        "ProviderConfig": {
            "FailureRedirect": "http://{APP-DOMAIN}:{PORT}/failure",
            "LDAPAttributes": [],
            "LDAPPort": "389",
            "LDAPServer": "localhost",
            "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=ldap,dc=tyk-ldap-test,dc=com"
        }
        "ProviderName": "ADProvider",
        "ReturnURL": "",
        "Type": "passthrough"
    }
```

This configuration is useful for internal APIs that require valid OAuth tokens (e.g.a webapp or mobile app) but needs validation by an LDAP provider.

## <a name="log-into-the-developer-portal-using-ldap"></a>Log into the Developer Portal using LDAP

LDAP requires little configuration, we can use the same provider config that we used to log into the Dashboard to target the Portal instead - notice the change in the handler configuration and the return URL:

```{.copyWrapper}
    {
        "ActionType": "GenerateOrLoginDeveloperProfile",
        "ID": "5",
        "IdentityHandlerConfig": {
            "DashboardCredential": "822f2b1c75dc4a4a522944caa757976a"
        },
        "OrgID": "53ac07777cbb8c2d53000002",
        "ProviderConfig": {
            "FailureRedirect": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/login/",
            "LDAPAttributes": [],
            "LDAPPort": "389",
            "LDAPServer": "localhost",
            "LDAPUserDN": "cn=*USERNAME*,cn=dashboard,ou=Group,dc=test-ldap,dc=tyk,dc=io"
        },
        "ProviderConstraints": {
            "Domain": "",
            "Group": ""
        },
        "ProviderName": "ADProvider",
        "ReturnURL": "http://{PORTAL-DOMAIN}:{PORTAL-PORT}/portal/sso/",
        "Type": "passthrough"
    }
```
    

Once again, a simple `POST` request is all that is needed to validate a user via an LDAP provider.

