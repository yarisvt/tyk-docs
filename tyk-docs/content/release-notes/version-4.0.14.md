# Release 4.0.14

## Release Features

< summary paragraph here>

## Changelog

### Tyk Dashboard

#### Changed

- Improved Dashboard Analytics to respect API ownership (including versions) for log browser and some charts

#### Fixed

- Fixed an issue where a blank screen was displayed when clicking on policies from the policy management screen

- Fixed an issue where a blank screen was displayed when policies with custom policy IDs were added to an API Key

- Fixed an issue where custom authentication could not be selected to provide the base identity when multi-auth selected

- Fixed an issue where an API could be incorrectly labelled as using multi-auth in the Tyk Developer Portal Catalogue view

- Fixed a UI Bug in the API designer when adding all API versions to a policy [EXPAND WHAT WAS THE BUG]

- Fixed an issue where the Tyk Dashboard did not display key alias on the analytics screens when using SQL analytics data store.

- Fixed an issue where it was not possible to download _activity by API_ or _activity by key_ reports from the dashboard when using PostgreSQL as the analytics store

- Fixed an issue where a new user was stuck in a password reset loop if _Tyk_Db_Security_Forcefirstloginpwreset_ was enabled

- Fixed an issue so that the _showing API Analytics_ page on the Gateway Dashboard is now hidden if the logged in user does not have analytics permissions.

- Fixed an issue so that unregistered users are now redirected to a new page when _Ssoonlyforregisteredusers_ is True

- Fixed an issue so that the list of organisations are correctly displayed [WHAT WAS HAPPENING?]

- Fixed an issue when migrating a portal catalogue with a deleted policy from Mongodb To SQL. [WHAT WAS HAPPENING?]

- Fixed an issue where the _head_ option was not available in the _Allowed Methods_ dropdown within the OCRS section of the API designer

- Fixed When Ssoonlyforregisteredusers=True, Also Checks If User Belongs To The Organization [WHAT DOES THIS MEAN?]

- Fixed Storing The Ssl_Force_Common_Name_Check Field In The Api Definition, If This Was Set Via Raw Api Editor Or By Updating The Api Definition Via The Gw/Db Api. [WHAT WAS THE ISSUE?]

- Fixed an issue where API Ownership was not respected in the _Api Activity Dashboard Requests_ And _Average Errors Over Time_ charts. Note that it is not currently possible to respect API Ownership in other aggregated charts

- Fixed a security issue where a user could update their email address to match that of another user within the same organisation

- Fixed an issue where users without _User:Write_ permission could update their permissions through manipulation of dashboard API Calls

- Fixed an issue that prevented manual allocation of `Api_Id` during API creation

- Fixed an issue where the _versions_ endpoint returned APIs not owned by the logged-in user

- Fixed a security issue where lhe _Log Browser_ displayed analytics for APIs not owned by the logged-in user

- Fixed an issue where security headers were not present when _Classic Portal_ is configured with a custom domain

- Fixed an issue where _Endpoint Popularity_ data was not visible in the Tyk Dashboard for non-admin users

- Fixed an issue where additional data was reported when requesting analytics with _P=-1_ query when using a SQL analytics store

- Fixed an issue where the dashboard granted visibility of unfiltered analytics when API Ownership is enabled. A new user permission (_Owned_Analytics_) has been added to restrict visibility of API usage, errors and request logs for the owned APIs

- Fixed an issue where the dashboard API granted unfiltered access To Analytics Endpoints With Api Ownership Enabled

- Fixed an issue where the incorrect analytics were reported when filtering by _Tag_ for a SQL analytics data store

- Fixed an issue in the _Dashboard Analytics_ screen where the zoom would immediately reset To default


### Tyk Gateway

#### Added

- Added support for the _:Authority_ header when making gRPC requests. Thanks To Vanhtuan0409 From The Tyk Community For This Contribution.

#### Fixed

- Fixed an issue where Tyk could return a HTTP 500 Internal Server error when load balancing at very high API traffic levels

- Fixed an issue where invalid IP addresses could be added to the IP allow list

- Fixed an issue where custom authentication could not be selected to provide the base identity when multi-auth selected

- Fixed a security issue where an _Mtls_ request with an expired certificate could be proxied upstream in _static Mtls_ and _dynamic Mtls_

- Fixed a security issue where Oauth access keys were physically removed from Redis on expiry. Behaviour for Oauth is now the same as For other authorisation methods

- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for the contribution!

- Fixed an issue where an error was not raised for required scalar variables

- Fixed an issue where upstream JSON error messages were not reported to the consumer. This has been added in the _extensions_ section of GQL error response

- Fixed an issue where _Failure To Load Otto (JS)_ middleware did not prevent the API from proxying traffic upstream. Now Gateway logs an error when the plugin fails to load for API creation/update. Subsequently, it responds with a HTTP 500 if the API is called

- Fixed a security issue where the _Basic Auth_ password hash was included in the response when fetching the details of a key

- Fixed an issue that prevented manual allocation of _Api_Id_ during API creation

- Fixed an issue where Tyk could incorrectly complete _Mtls Authentication_ with the client before contacting the upstream service

- Fixed an issue where upstream certificates could be ignored when the API protocol ss TCP/TLS

- Fixed an issue where the gateway panics when Redis Cache_Storage is unavailable

- Fixed an issue that prevented configuration of cache timeout or cached status codes if _Upstream Cache Control_ was enabled

- Fixed an issue where _Edge/Worker Gateway_ did not load APIs and policies on cold start when MDCB is unavailable

- Fixed a security issue where raw keys were exposed in the info logs during _Keyspace Sync_


### Tyk Portal

#### Fixed

- Fixed an issue where an API could be incorrectly labelled as using _Multi-Auth_ in the _Tyk Developer Portal Catalogue_ view

- Fixed an issue where security headers were not present when _Classic Portal_ is configured with a custom domain

### Tyk Plugin

#### Fixed

- Fix: Cve-2023-27536 [WHAT WAS THE FIX?]

## Updated Versions

Tyk Gateway 4.0.14 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-gateway/v4.0.14/images/sha256-e38aac2c72e3f53be285a545f6d8226ca26fbcac9bd3a105855f1ffef25ed62e?context=repo)

Tyk Dashboard 4.0.14 - [docker image to pull](https://hub.docker.com/layers/tykio/tyk-dashboard/v4.0.14/images/sha256-d3db93079e772acb5c926ab3f21a0b8f53fd428a9e9a0e3f77201043668084ea?context=explore)

## Contributors

Special thanks to the following members of the Tyk community for their contributions in this release:

Thanks to [PatrickTaibel](https://github.com/PatrickTaibel) for fixing an issue where `global_size_limit` was not enabling request size limit middleware.

Thanks to [vanhtuan0409](https://github.com/vanhtuan0409) for adding support to the `:authority` header when making gRPC requests.

## Upgrade process

Follow the [standard upgrade guide]({{< ref "upgrading-tyk" >}}), there are no breaking changes in this release.

In case you want to switch from MongoDB to SQL, you can [use our migration tool]({{< ref "planning-for-production/database-settings/postgresql.md#migrating-from-an-existing-mongodb-instance" >}}), but keep in mind that it does not yet support the migration of your analytics data.

{{< note success >}}
**Note**

Please remember that the upgrade to the Golang version implies that all the Golang custom plugins that you are using need to be recompiled before migrating to v5.1 of the Gateway. Check our docs for more details [Golang Plugins]({{< ref "plugins/supported-languages/golang#upgrading-tyk" >}}).
{{< /note >}}