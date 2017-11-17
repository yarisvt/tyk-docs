---
date: 2017-03-24T09:58:52Z
title: Version 2.4 & 1.4 & 0.5
menu:
  main:
    parent: "Release Notes"
weight: 0 
---

# Tyk Gateway v2.4, Tyk Dashboard v1.4, Tyk Pump v0.5

## <a name="new"></a>New in this release:

## <a name="gateway"></a>Tyk Gateway

### Default User Agent set to Tyk/$VERSION

If no user agent is specified in a request, it is now set as `Tyk/$VERSION`.

https://github.com/TykTechnologies/tyk/issues/422

### Include x-tyk-api-expires date header for versioned APIs

If a request is made for an API which has an expiry date, the response will include the expiry date as meta data in the header.

https://github.com/TykTechnologies/tyk/issues/437

### Run Admin Control API on a separate port

We have added a new `control_api_port` option to the Gateway configuration file, which allows you to run the admin control api on a separate port, and hide it behind firewall if needed.

https://github.com/TykTechnologies/tyk/issues/354

### Added a Configuration Linter

We have Added a new `tyk lint` command which takes the Gateway configuration file path as argument, and validates the syntax, misspelled attribute names or values format. 

For example: `tyk lint ./tyk.conf`

https://github.com/TykTechnologies/tyk/issues/336

### Set log_level from tyk.conf

We have added a new `log_level` configuration variable to `tyk.conf` to control logging level.

Possible values are: `debug`, `info`, `warn`, `error`

https://github.com/TykTechnologies/tyk/issues/1182

### Added jsonMarshal to body transform templates

We have added the `jsonMarshal` helper to the body transform templates. You can apply jsonMarshal on a string in order to perform JSON style character escaping, and on complex objects to serialise them to a JSON string.

Example: `{{ .myField | jsonMarshal }}`

https://github.com/TykTechnologies/tyk/pull/1175

### Added a blocking reload endpoint

Now you can add a `?block=true` argument to the `/tyk/reload` API endpoint, which will block a response, until the reload is performed. This can be useful in scripting environments like CI/CD workflows.

https://github.com/TykTechnologies/tyk/issues/703

### TykJSPath now User Code only

If never used, users should now delete the `js/tyk.js` file or only keep user specific code in it. The Tyk code has now been included in our installation binaries.

https://github.com/TykTechnologies/tyk/issues/739

## <a name="gateway-dashboard"></a>Tyk Gateway & Tyk Dashboard

### Mutual TLS

A major feature of this release is the implementation of Mutual TLS. For details, see [Mutual TLS](/docs/security/tls-and-ssl/mutual-tls/).


### Extended use of Multiple Policies

We have extended support for partitioned policies, and you can now mix them up when creating a key. Each policy should have own partition, and will not intersect, to avoid conflicts while merging their rules. 

Using this approach could be useful when you have lot of APIs and multiple subscription options. Before, you had to create a separate policy per API and subscription option. 

Using multiple partitioned policies you can create basic building blocks separately for accessing rules, rate limits and policies, and then mix them for the key, to creating unique combination that fit your needs. 

We have added a new `apply_policies` field to the Key definition, which is an string array of Policy IDs. 
> **NOTE**: The old key apply_policy_id is supported, but is now deprecated.

We have updated the Dashboard **Apply Policies** section of the **Add Key** section.

![apply-policy][1]

For this release multiple policies are only supported only via the Add Key section and via the API. Support for OIDC, oAuth, and Portal API Catalogues are planned for subsequent releases.

https://github.com/TykTechnologies/tyk/issues/355

### Improved Swagger API import defaults

When importing Swagger based APIs they now generate tracked URLs instead of white listed ones.

https://github.com/TykTechnologies/tyk/issues/643

### Global API Rate Limits

We have added a new API definition field `global_rate_limit` which specifies a global API rate limit in the following format: `{"rate": 10, "per": 1}`, similar to policies or keys. 

The API rate limit is an aggregate value across all users, which works in parallel with user rate limits, but has higher priority.

Extended Dashboard API designer Rate Limiting and Quotas section in Core 
settings:

![rate-limits][2]

https://github.com/TykTechnologies/tyk/issues/356

### Specify custom analytics tags using HTTP headers

We have added a new API definition field `tag_headers` which specifies a string array of HTTP headers which can be extracted and turned to tags. 

For example if you include `X-Request-ID` header to tag_headers, for each incoming request it will include a `x-request-id-<header_value>` tag to request an analytic record.

This functionality can be useful if you need to pass additional information from the request to the analytics, without enabling detailed logging, which records the full request and response objects.

We have added a new **Tag headers** section to the Dashboard **API Designer Advanced** tab.

![tag_headers][3]

## <a name="dashboard"></a>Tyk Dashboard

### Service discovery form improved with most common pre-defined templates

### RPC credentials renamed to Organization ID

### Replaced text areas with a code editors

We have replaced multi-line text fields with a code editors. For example when importing API definitions.

![editors][4]

https://github.com/TykTechnologies/tyk-analytics/issues/488

### Replace dropdowns with the live search component

We have changed all the dropdown lists with the live search component. Now all dropdowns, like API or Policiy lists, work with large list of elements, and have ability to search over the results.

![live-search][5]

https://github.com/TykTechnologies/tyk-analytics-ui/issues/222

### Display user ID and email on when listing users

The **Users list** now displays the **User ID** and **Email**.

![user-list][6]

https://github.com/TykTechnologies/tyk-analytics/issues/361

https://github.com/TykTechnologies/tyk-analytics/issues/363

### Added search for portal developers

We have added search for the users listed in the developer portal.

![search][7]

### Key request email link to developer details

The email address in a **Key Request** from the **Developer Portal** is now a link to the relevant developer profile.

![key][8]

### Country code in log browser links to geo report

The country code in the log browser has been changed to a link to the geographic report.

https://github.com/TykTechnologies/tyk-analytics/issues/369

## Other UX Improvements

* Key pieces of data made accessible to quickly copy+paste
* Improved help tips
* Get your API URL without having to save and go back
* Improved pagination
* Improved feedback messaging
* Improved charts
* Improved analytics search

## <a name="pump"></a>Tyk Pump

### Support added for Mongo SSL connections

We have added support for **Mongo SSL connections**.

See https://tyk.io/docs/configure/tyk-pump-configuration/ for a sample pump.conf file.

## <a name="fixed"></a>Issues fixed in this release

### Gateway

Respond with 503 if all hosts are down.
Previously, the internal load balancer was cycling though hosts even if they were known as down.
https://github.com/TykTechnologies/tyk/issues/836

Request with OPTIONS method should not be cached.
https://github.com/TykTechnologies/tyk/issues/376

Health check API is officially deprecated.
https://github.com/TykTechnologies/tyk/issues/784

Fix custom error templates for authentication errors.
https://github.com/TykTechnologies/tyk/issues/438

### Dashboard

Redirect user to the login page if session is timed out.
https://github.com/TykTechnologies/tyk-analytics/issues/387

When creating a portal API catalogue, you can now attach documentation without saving the catalogue first.
https://github.com/TykTechnologies/tyk-analytics-ui/pull/175

Fixed the proxy.preserve_host_header field when saved via the UI.
Previously, the field was available in the API definition, but got removed if the API was saved via the UI.
https://github.com/TykTechnologies/tyk-analytics/issues/392

Fixed the port removal in service discovery properties.
https://github.com/TykTechnologies/tyk-analytics-ui/issues/12

Prevent an admin user revoking their own permissions.
This is a  UI only fix, it is still allowable via the API.
https://github.com/TykTechnologies/tyk-analytics-ui/issues/200

Added support for HEAD methods in the Dashboard API Designer.
https://github.com/TykTechnologies/tyk/issues/1055

[1]: /docs/img/release-notes/apply_policy.png
[2]: /docs/img/release-notes/rate_limits.png
[3]: /docs/img/release-notes/tag_headers.png
[4]: /docs/img/release-notes/import_api_definition.png
[5]: /docs/img/release-notes/live_search.png
[6]: /docs/img/release-notes/user_list.png
[7]: /docs/img/release-notes/dev_list.png
[8]: /docs/img/release-notes/key_request_user.png

