---
date: 2017-03-24T16:58:32Z
title: Social OAuth
menu:
  main:
    parent: "3rd Party Identity Providers"
weight: 0 
---

## Log into Dashboard with Google

Similarly to logging into an app using Tyk, OAuth and Google Plus, if we have our callback URL and client IDs set up with Google, we can use the following profile setup to access our Developer Portal using a social provider:

```
    {
        "ActionType": "GenerateOrLoginUserProfile",
        "ID": "2",
        "IdentityHandlerConfig": null,
        "MatchedPolicyID": "1C",
        "OrgID": "53ac07777cbb8c2d53000002",
        "ProviderConfig": {
            "CallbackBaseURL": "http://:{TIB-PORT}",
            "FailureRedirect": "http://{DASH-DOMAIN}:{DASH-PORT}/?fail=true",
            "UseProviders": [{
                "Name": "gplus",
                "Key": "GOOGLE-OAUTH-CLIENT-KEY",
                "Secret": "GOOGLE-OAUTH-CLIENT-SECRET"
            }]
        },
        "ProviderConstraints": {
            "Domain": "yourdomain.com",
            "Group": ""
        },
        "ProviderName": "SocialProvider",
        "ReturnURL": "http://{DASH-DOMAIN}:{DASH-PORT}/tap",
        "Type": "redirect"
    }
```
    

It is worth noting in the above configuration that the return URL's have changed for failure and return states.

The login to the Portal, much like the login to the Dashboard, makes use of a one-time nonce to log the user in to the session. The nonce is only accessible for a few seconds. It is recommended that in production use, all of these transactions happen over SSL connections to avoid MITM snooping.