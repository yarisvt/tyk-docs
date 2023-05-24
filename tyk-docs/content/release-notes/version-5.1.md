---
title: Tyk v5.1
menu:
  main:
    parent: "Release Notes"
weight: 1
---

## Major features

<< INSERT PARAGRAPH HERE RECEIVED FROM DEVS >>

## Changelog

### Tyk Gateway

#### Deprecated

#### Added

#### Changed

- Tyk Gateway updated to use Go 1.19

#### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- When the control API is not protected with mTLS we now do not ask for a cert, even if all the APIs registered have mTLS as authorization mechanism
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behaviour for OAuth is now the same as for other authorisation methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to @PatrickTaibel for the contribution!
- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.
- Added support for the `:authority` header when making GRPC requests. If the `:authority` header is not present then some GRPC servers return PROTOCOL_ERROR which prevents custom GRPC plugins from running. Thanks to @vanhtuan0409 from the Tyk Community for the contribution!

### Tyk Dashboard

#### Deprecated

#### Added

#### Changed

- Tyk Dashboard updated to Go 1.19

#### Fixed

- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- Fixed an issue where API Ownership was not respected in the _API Activity Dashboard Requests_ and _Average Errors Over Time_ charts in the Tyk Dashboard. Note that it is not currently possible to respect API Ownership in other aggregated charts
- Fixed an issue where the LOGIN URL was displayed as undefined when creating a TIB Profile using LDAP as a provider
- Fixed an issue where it was not possible to download Activity by API or Activity by Key from the Dashboard when using PostgreSQL for the analytics store
- Fixed an issue where a new user could be stuck in a password reset loop in the dashboard if `TYK_DB_SECURITY_FORCEFIRSTLOGINPWRESET` was enabled
- CHECK Fixed an issue where the `ssl_force_common_name_check` flag was disappearing. The flag was disappearing after being updated via dashboard UI raw API editor and a subsequent page reload. It was also disappearing when updating the API Definition via the GW/DB API.
- Fixed an issue where a user could update their email address to match that of another user within the same organisation
- Fixed an issue where users without `user:write` permission were able to update their permissions through manipulation of Dashboard API calls
- Fixed an issue where the versions endpoint returned APIs not owned by the logged-in user
- Fixed an issue where the log browser showed analytics for APIs not owned by the logged-in user
- Fixed an issue that prevented non-admin users from seeing _Endpoint Popularity_ data in the Tyk Dashboard
- Fixed an issue where additional data was returned when requesting analytics with p=-1 query when using SQL for the analytics store
- Fixed an issue so that filtering by API respects API Ownership in three Dashboard charts.

  - Gateway Dashboard - API Activity Dashboard - Requests
  - Activity by API - Traffic Activity per API
  - Errors - Average Errors Over Time

- Fixed an issue so that the Log Browser now respects API Ownership. A user will now only be able to see logs for the APIs that they are authorised to view
- Fixed filters for the Log Browser, Errors - Average Errors Over Time and API Activity Dashboard - Requests so that a user can only select from versions of APIs for which they have visibility

### Tyk Portal Classic

#### Deprecated

#### Added

#### Changed

#### Fixed

### Tyk Pump

#### Deprecated

#### Added

#### Changed

#### Fixed

- Reduced default CPU and memory footprint by changing the default RPC pool size from 20 to 5 connections.

## Updated Versions

Tyk Gateway 5.1 - [docker](https://hub.docker.com/layers/tykio/tyk-gateway/v5.0.0/images/sha256-196815adff2805ccc14c267b14032f23913321b24ea86c052b62a7b1568b6725?context=repo)

Tyk Dashboard 5.1 - [docker](https://hub.docker.com/layers/tykio/tyk-dashboard/v5.0/images/sha256-3d736b06b023e23f406b1591f4915b3cb15a417fcb953d380eb8b4d71829f20f?tab=vulnerabilities)

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk.md" >}}), there are no breaking changes in this release.

In case you want to switch from MongoDB to SQL, you can [use our migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**

Note: Upgrading the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to v5.0 of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "plugins/supported-languages/golang#upgrading-tyk" >}}).
{{< /note >}}
