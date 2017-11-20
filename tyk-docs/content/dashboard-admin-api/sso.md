---
date: 2017-03-27T12:47:13+01:00
title: Admin API Single Sign On
menu:
  main:
    parent: "Tyk Dashboard Admin API"
weight: 5
---

SSO API allows you to implement custom authentification schemes for the Dashboard and Portal. 
In fact Tyk Identity Broker internally use this API. 

### Generate authentication token

Dashboard expose `/admin/sso` Admin API which allows you to generate temporary authentication token, valid for 60 seconds. You should provide JSON payload with the scope `ForSection`, possible values "dashboard" and "portal". In addition you should provide organization id via "OrgID" attribute.


| **Property** | **Description**              |
| ------------ | ---------------------------- |
| Resource URL | `/admin/sso` |
| Method       | POST                         |
| Body         | `{"ForSection":"<scope>", "OrgID": "<org-id>"}`  |

#### Sample Request

```{.copyWrapper}
    POST /admin/sso HTTP/1.1
    Host: localhost:3000
    admin-auth: 12345
    
    {
        "ForSection": "dashboard",
        "OrgID": "588b4f0bb275ff0001cc7471"
    }
```

#### Sample Response:
```{.copyWrapper}
{"Status":"OK","Message":"SSO Nonce created","Meta":"YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw"}
```

### Using token

Once you issued a token you can login to the dashboard using `/tap` url, or to the portal using `<portal-url>/sso` url, and provide authentication token via `nonce` query param.
If `nonce` is valid, Tyk will create temporary user and log him in. If used for `dashboard`, you can use `sso_permission_defaults` configuration option in Dashboard config file, to specify SSO user permissions, in the following format:

```
"sso_permission_defaults": {
  "oauth" : "read",
  "apis" : "read",
  "log" : "read",
  "policy" : "read",
  "keys" : "write",
  "hooks" : "read",
  "analytics" : "read"
}
```

#### Sample Request

```{.copyWrapper}
    GET /tap?nonce=YTNiOGUzZjctYWZkYi00OTNhLTYwODItZTAzMDI3MjM0OTEw HTTP/1.1
    Host: localhost:3000    
```

