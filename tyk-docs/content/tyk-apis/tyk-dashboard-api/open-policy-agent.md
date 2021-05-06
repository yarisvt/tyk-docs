---
date: 2017-03-27T12:13:12+01:00
title: Open Policy Agent
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 5 
url: /tyk-dashboard-api/org/opa
aliases: /tyk-apis/tyk-dashboard-api/org/opa
---
{{< note success >}}
**Note**  

This API helps you to manage (CRUD) the OPA (Open Policy Agent) rules, that are being applied to the Tyk Dashboard. Also through this API,
you are able to change the OPA settings, such as to enable/disable it or enable/disable the debug mode.

Only Admin Dashboard users will be authorised to use it.
{{< /note >}}


### List OPA rules and settings

This API returns by default the initial set of OPA rules defined in your Tyk Dashboard, which are located in [`schema/dashboard.rego`](/docs/tyk-dashboard/opa-rules/) (accessible in Self-Managed installations).

Once you update the rules via the API, the OPA rules will be stored at the organisation level.

| **Property** | **Description**       |
| ------------ | --------------------- |
| Resource URL | `/api/org/opa        `|
| Method       | GET                   |
| Type         | None                  |
| Body         | None                  |
| Param        | None                  |

#### Sample Request

```{.copyWrapper}
GET /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  "open_policy": {
    "enabled": true,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```
### Update OPA rules and settings

{{< note success >}}
**Note**  

Whenever you want to update OPA rules or its settings, just send back the updated value of the OPA rules or changed valiues for the settings (`enabled`, `debug`) , via a PUT request to the API.
{{< /note >}}


| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/org/permission`    |
| Method       | PUT                      |
| Type         | None                     |
| Body         | Permissions Object       |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/org/opa HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

```
{
  "open_policy": {
    "enabled": false,
    "rules": "default hello = false\r\n\r\nhello {\r\n    m := input.message\r\n    m == \"world\"\r\n}"
  }
}
```

#### Sample Response

```
{
    "Status": "OK",
    "Message": "OPA rules has been updated on org level",
    "Meta": null
}
```
