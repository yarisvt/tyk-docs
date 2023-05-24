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

#### Fixed

- Fixed an issue where invalid IP addresses could be added to the IP allow list
- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity
- When the control API is not protected with mTLS we now do not ask for a cert even if all the APIs registered have mTLS as authorization mechanism
- Fixed an issue where OAuth access keys were physically removed from Redis on expiry. Behaviour for OAuth is now the same as for other authorisation methods
- Fixed an issue where the `global_size_limit` setting didn't enable request size limit middleware. Thanks to @PatrickTaibel for the contribution!

### Tyk Dashboard

#### Deprecated

#### Added

#### Changed

#### Fixed

- Fixed an issue when using custom authentication with multiple authentication methods, custom authentication could not be selected to provide the base identity

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
