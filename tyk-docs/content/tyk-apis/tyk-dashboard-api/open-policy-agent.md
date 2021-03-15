---
date: 2017-03-27T12:13:12+01:00
title: Open policy Agent
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
you are able to change the OPA settings, like enable/disable it or enable/disable the debug mode.

Only Admin Dashboard users will be authorized to use it.
{{< /note >}}


### List OPA rules and settings

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
    "debug": false,
    "enabled": true,
    "rules": "package dashboard_users\r\n\r\ndefault request_intent = \"write\"\r\nrequest_intent = \"read\" { input.request.method == \"GET\" }\r\nrequest_intent = \"read\" { input.request.method == \"HEAD\" }\r\nrequest_intent = \"delete\" { input.request.method == \"DELETE\" }\r\n\r\n# Set of rules to define which permission required for given request intent\r\n\r\n# read intent require at least \"read\" permission\r\nintent_match(\"read\", \"read\")\r\nintent_match(\"read\", \"write\")\r\nintent_match(\"read\", \"admin\")\r\n\r\n# write intent require \"write\" or \"admin\" permission\r\nintent_match(\"write\", \"write\")\r\nintent_match(\"write\", \"admin\")\r\n\r\n# delete intent require \"write\" or \"admin\" permission\r\nintent_match(\"delete\", \"write\")\r\nintent_match(\"delete\", \"admin\")\r\n\r\n\r\n# Helper to check if user an admin\r\ndefault is_admin = false\r\nis_admin {\r\n\tinput.user.user_permissions[\"IsAdmin\"] == \"admin\"\r\n}\r\n\r\n# Check if request path match any of the known permissions\r\n# input.permissions is an object passed from Tyk Dashboard containing mapping between routes (regexp) and user permissions:\r\n#\r\n# Exampe object:\r\n#  \"permissions\": [\r\n#        {\r\n#            \"permission\": \"analytics\",\r\n#            \"rx\": \"\\\\\/api\\\\\/usage\"\r\n#        },\r\n#        {\r\n#            \"permission\": \"analytics\",\r\n#            \"rx\": \"\\\\\/api\\\\\/uptime\"\r\n#        }\r\n#        ....\r\n#  ]\r\n# \r\n# You can extend this object with own permissions inside this script using array.concat function\r\n#\r\nrequest_permission[role] {\r\n\tperm := input.permissions[_]\r\n\tregex.match(perm.rx, input.request.path)\r\n    role := perm.permission\r\n}\r\n\r\n# --------- Start \"deny\" rules -----------\r\n# Deny object contains detailed reason behind rejection\r\n\r\ndefault allow = false\r\nallow { count(deny) == 0 }\r\n\r\ndeny[\"User is not active\"] {\r\n\tnot input.user.active\r\n}\r\n\r\n# None of the requests was matched\r\ndeny[x] {\r\n\tcount(request_permission) == 0\r\n    x := sprintf(\"Unknown action \'%v\'\", [input.request.path])\r\n}\r\n\r\ndeny[x] {\r\n    perm := request_permission[_]\r\n\tnot is_admin\r\n\tnot input.user.user_permissions[perm]\r\n    x := sprintf(\"Not allowed to access \'%v\'\", [input.request.path])\r\n}\r\n\r\n# Deny request for non admins if intent not match, or not exists\r\ndeny[x] {\r\n\tperm := request_permission[_]\r\n\tnot is_admin\r\n    not intent_match(request_intent, input.user.user_permissions[perm])\r\n    x := sprintf(\"\'%v\' operation is not allowed for \'%v\'\", [request_intent, input.request.path])\r\n}\r\n\r\n# If \"deny\" rule found, disallow even for admins\r\ndeny[x] {\r\n\tperm := request_permission[_]\r\n\tis_admin\r\n\tinput.user.user_permissions[perm] == \"deny\"\r\n    x := sprintf(\"\'%v\' operation is denied for \'%v\'\", [request_intent, input.request.path])\r\n}\r\n\r\n# Do not allow reset password on behalf of another user\r\ndeny[x] {\r\n\trequest_permission[_] = \"ResetPassword\"\r\n\tnot is_admin\r\n    user_id := split(input.request.path, \"\/\")[3]\r\n    user_id != input.user.id\r\n    x := sprintf(\"Not allowed to reset password for \'%v\' user\", [user_id])\r\n}\r\n\r\n# Even admins can\'t reset if it not allowed in the global config\r\ndeny[x] {\r\n\trequest_permission[_] == \"ResetPassword\"\r\n\tis_admin\r\n    not input.config.allow_admin_reset_password\r\n    not input.user.user_permissions[\"ResetPassword\"]\r\n    x := \"Admin not allowed to reset password without explicit permission\"\r\n}\r\n\r\n# deny[x] {\r\n#    not input.request.header[\"Milan\"] == [\"Test1\"]\r\n#\tx := \"Access not allowed to user without Milan Header\"\r\n#}\r\n\r\n# --------- End \"deny\" rules ----------\r\n\r\n\r\n###############################################################################\r\n# Demo section, to show rule capabilities.                                    #\r\n# Rules below are not executed untill you set special permission to the user  #\r\n###############################################################################\r\n\r\n\r\n# If you are testing using Opa playground, you can mock Tyk functions like this:\r\n#\r\n# TykAPIGet(path) = {}\r\n# TykDiff(o1,o2) = {}\r\n#\r\n# Use this pre-build playground https:\/\/play.openpolicyagent.org\/p\/T1Rcz5Ugnb\r\n\r\n\r\n# Example of complex rule which forbirds user to change API status, if he has some custom permission\r\n# This rule will not be executed, unless this custom permission set\r\ndeny[\"You are not allowed to change API status\"] {\r\n\t# Custom permission which can be enabled with tyk_analytics config: `\"custom_permissions\":[\"disable_deploy\"]`\r\n\tinput.user.user_permissions[\"test_disable_deploy\"]\r\n\r\n\t# Intent is to to update API\r\n\trequest_permission[_] == \"apis\"\r\n\trequest_intent == \"write\"\r\n\r\n\t# Lets get original API object, before update\r\n\t# TykAPIGet accepts API url as argument, e.g. to receive API object call: TykAPIGet(\"\/api\/apis\/<api-id>\")\r\n\tapi := TykAPIGet(input.request.path)\r\n\r\n\t# TykDiff performs Object diff and returns JSON Merge Patch document https:\/\/tools.ietf.org\/html\/rfc7396\r\n\t# For example if only state has change diff may look like: {\"state\": \"active\"}\r\n\tdiff := TykDiff(api, input.request.body)\r\n\r\n\t# API state has changed\r\n\tnot is_null(diff.api_definition.active)\r\n}\r\n\r\n# Using patch_request helper you can modify content of the request\r\n# You should respond with JSON merge patch. \r\n# See https:\/\/tools.ietf.org\/html\/rfc7396 for more detaills\r\n#\r\n# Example: Enforce http proxy configuration for an APIs with category #external. \r\npatch_request[x] {\r\n\t# make it work only in test environment\r\n\t# Remove if you want to enable it for all users\r\n\tinput.user.user_permissions[\"test_patch_request\"]\r\n\r\n\trequest_permission[_] == \"apis\"\r\n\trequest_intent == \"write\"\r\n\tcontains(input.request.body.api_definition.name, \"#external\")\r\n\r\n\tx := {\"api_definition\": {\"proxy\": {\"transport\": {\"proxy_url\": \"http:\/\/company-proxy:8080\"}}}}\r\n}\r\n\r\n\r\n# You also have access not to user group name, so can use it in your rules.\r\ndeny[\"Only admins Group allowed to access this APIs\"] {\r\n\t# Custom permission which can be enabled with tyk_analytics config: `\"custom_permissions\":[\"disable_deploy\"]`\r\n\tinput.user.user_permissions[\"test_admin_usergroup\"]\r\n\r\n\t# Intent is to to access API\r\n\trequest_permission[_] == \"apis\"\r\n\tapi := TykAPIGet(input.request.path)\r\n\r\n\t# If this is APIs in special #admin-teamA category\r\n\tcontains(input.request.body.api_definition.name, \"#admin-teamA\")\r\n\r\n\tnot input.user.group_name == \"TeamA-Admin\"\r\n}"
  }
}
```
### Update OPA rules and settings

{{< note success >}}
**Note**  

Whenever you want to update OPA rules or its settings, just send back the updated value of the OPA rules or changed valiues for the settings (`opa_enabled`, `opa_debug_enabled`) , through a PUT request to the API.

`opa_enabled` and `opa_debug_enabled` are optional fields, so no need to put them in the request payload everytime.
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
    "debug": false,
    "enabled": false,
    "rules": "package dashboard_users\r\n\r\ndefault request_intent = \"write\"\r\nrequest_intent = \"read\" { input.request.method == \"GET\" }\r\nrequest_intent = \"read\" { input.request.method == \"HEAD\" }\r\nrequest_intent = \"delete\" { input.request.method == \"DELETE\" }\r\n\r\n# Set of rules to define which permission required for given request intent\r\n\r\n# read intent require at least \"read\" permission\r\nintent_match(\"read\", \"read\")\r\nintent_match(\"read\", \"write\")\r\nintent_match(\"read\", \"admin\")\r\n\r\n# write intent require \"write\" or \"admin\" permission\r\nintent_match(\"write\", \"write\")\r\nintent_match(\"write\", \"admin\")\r\n\r\n# delete intent require \"write\" or \"admin\" permission\r\nintent_match(\"delete\", \"write\")\r\nintent_match(\"delete\", \"admin\")\r\n\r\n\r\n# Helper to check if user an admin\r\ndefault is_admin = false\r\nis_admin {\r\n\tinput.user.user_permissions[\"IsAdmin\"] == \"admin\"\r\n}\r\n\r\n# Check if request path match any of the known permissions\r\n# input.permissions is an object passed from Tyk Dashboard containing mapping between routes (regexp) and user permissions:\r\n#\r\n# Exampe object:\r\n#  \"permissions\": [\r\n#        {\r\n#            \"permission\": \"analytics\",\r\n#            \"rx\": \"\\\\\/api\\\\\/usage\"\r\n#        },\r\n#        {\r\n#            \"permission\": \"analytics\",\r\n#            \"rx\": \"\\\\\/api\\\\\/uptime\"\r\n#        }\r\n#        ....\r\n#  ]\r\n# \r\n# You can extend this object with own permissions inside this script using array.concat function\r\n#\r\nrequest_permission[role] {\r\n\tperm := input.permissions[_]\r\n\tregex.match(perm.rx, input.request.path)\r\n    role := perm.permission\r\n}\r\n\r\n# --------- Start \"deny\" rules -----------\r\n# Deny object contains detailed reason behind rejection\r\n\r\ndefault allow = false\r\nallow { count(deny) == 0 }\r\n\r\ndeny[\"User is not active\"] {\r\n\tnot input.user.active\r\n}\r\n\r\n# None of the requests was matched\r\ndeny[x] {\r\n\tcount(request_permission) == 0\r\n    x := sprintf(\"Unknown action \'%v\'\", [input.request.path])\r\n}\r\n\r\ndeny[x] {\r\n    perm := request_permission[_]\r\n\tnot is_admin\r\n\tnot input.user.user_permissions[perm]\r\n    x := sprintf(\"Not allowed to access \'%v\'\", [input.request.path])\r\n}\r\n\r\n# Deny request for non admins if intent not match, or not exists\r\ndeny[x] {\r\n\tperm := request_permission[_]\r\n\tnot is_admin\r\n    not intent_match(request_intent, input.user.user_permissions[perm])\r\n    x := sprintf(\"\'%v\' operation is not allowed for \'%v\'\", [request_intent, input.request.path])\r\n}\r\n\r\n# If \"deny\" rule found, disallow even for admins\r\ndeny[x] {\r\n\tperm := request_permission[_]\r\n\tis_admin\r\n\tinput.user.user_permissions[perm] == \"deny\"\r\n    x := sprintf(\"\'%v\' operation is denied for \'%v\'\", [request_intent, input.request.path])\r\n}\r\n\r\n# Do not allow reset password on behalf of another user\r\ndeny[x] {\r\n\trequest_permission[_] = \"ResetPassword\"\r\n\tnot is_admin\r\n    user_id := split(input.request.path, \"\/\")[3]\r\n    user_id != input.user.id\r\n    x := sprintf(\"Not allowed to reset password for \'%v\' user\", [user_id])\r\n}\r\n\r\n# Even admins can\'t reset if it not allowed in the global config\r\ndeny[x] {\r\n\trequest_permission[_] == \"ResetPassword\"\r\n\tis_admin\r\n    not input.config.allow_admin_reset_password\r\n    not input.user.user_permissions[\"ResetPassword\"]\r\n    x := \"Admin not allowed to reset password without explicit permission\"\r\n}\r\n\r\n# deny[x] {\r\n#    not input.request.header[\"Milan\"] == [\"Test1\"]\r\n#\tx := \"Access not allowed to user without Milan Header\"\r\n#}\r\n\r\n# --------- End \"deny\" rules ----------\r\n\r\n\r\n###############################################################################\r\n# Demo section, to show rule capabilities.                                    #\r\n# Rules below are not executed untill you set special permission to the user  #\r\n###############################################################################\r\n\r\n\r\n# If you are testing using Opa playground, you can mock Tyk functions like this:\r\n#\r\n# TykAPIGet(path) = {}\r\n# TykDiff(o1,o2) = {}\r\n#\r\n# Use this pre-build playground https:\/\/play.openpolicyagent.org\/p\/T1Rcz5Ugnb\r\n\r\n\r\n# Example of complex rule which forbirds user to change API status, if he has some custom permission\r\n# This rule will not be executed, unless this custom permission set\r\ndeny[\"You are not allowed to change API status\"] {\r\n\t# Custom permission which can be enabled with tyk_analytics config: `\"custom_permissions\":[\"disable_deploy\"]`\r\n\tinput.user.user_permissions[\"test_disable_deploy\"]\r\n\r\n\t# Intent is to to update API\r\n\trequest_permission[_] == \"apis\"\r\n\trequest_intent == \"write\"\r\n\r\n\t# Lets get original API object, before update\r\n\t# TykAPIGet accepts API url as argument, e.g. to receive API object call: TykAPIGet(\"\/api\/apis\/<api-id>\")\r\n\tapi := TykAPIGet(input.request.path)\r\n\r\n\t# TykDiff performs Object diff and returns JSON Merge Patch document https:\/\/tools.ietf.org\/html\/rfc7396\r\n\t# For example if only state has change diff may look like: {\"state\": \"active\"}\r\n\tdiff := TykDiff(api, input.request.body)\r\n\r\n\t# API state has changed\r\n\tnot is_null(diff.api_definition.active)\r\n}\r\n\r\n# Using patch_request helper you can modify content of the request\r\n# You should respond with JSON merge patch. \r\n# See https:\/\/tools.ietf.org\/html\/rfc7396 for more detaills\r\n#\r\n# Example: Enforce http proxy configuration for an APIs with category #external. \r\npatch_request[x] {\r\n\t# make it work only in test environment\r\n\t# Remove if you want to enable it for all users\r\n\tinput.user.user_permissions[\"test_patch_request\"]\r\n\r\n\trequest_permission[_] == \"apis\"\r\n\trequest_intent == \"write\"\r\n\tcontains(input.request.body.api_definition.name, \"#external\")\r\n\r\n\tx := {\"api_definition\": {\"proxy\": {\"transport\": {\"proxy_url\": \"http:\/\/company-proxy:8080\"}}}}\r\n}\r\n\r\n\r\n# You also have access not to user group name, so can use it in your rules.\r\ndeny[\"Only admins Group allowed to access this APIs\"] {\r\n\t# Custom permission which can be enabled with tyk_analytics config: `\"custom_permissions\":[\"disable_deploy\"]`\r\n\tinput.user.user_permissions[\"test_admin_usergroup\"]\r\n\r\n\t# Intent is to to access API\r\n\trequest_permission[_] == \"apis\"\r\n\tapi := TykAPIGet(input.request.path)\r\n\r\n\t# If this is APIs in special #admin-teamA category\r\n\tcontains(input.request.body.api_definition.name, \"#admin-teamA\")\r\n\r\n\tnot input.user.group_name == \"TeamA-Admin\"\r\n}"
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