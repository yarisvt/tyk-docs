---
title: Tyk Environment Variables
menu:
  main:
    parent: "Configure"
weight: 12 
---

For each JSON based configuration option in the [Gateway](/docs/configure/tyk-gateway-configuration-options/), [Dashboard](/docs/configure/tyk-dashboard-configuration-options/) and [Pump](/docs/configure/tyk-pump-configuration/) configuration files, you can map to an Environment Variable. The Environment Variable will then override the configuration file option.

The format for creating Environment Variables is as follows:

* All Environment Variables are written in uppercase
* All underscores in the JSON are removed in the environment variable
* All full stops in the JSON are replaced by an underscore

## Gateway

Each Gateway environment variable requires a `TYK_GW_` prefix

### Example

#### JSON Config File Option

`analytics_config.normalise_urls.enabled`

#### Equivalent Environment Variable

`TYK_GW_ANALYTICSCONFIG_NORMALISEURLS_ENABLED`


## Dashboard

Each Dashboard environment variable requires a `TYK_DB_` prefix

### Example

#### JSON Config File Option

`email_backend.settings`

#### Equivalent Environment Variable

`TYK_DB_EMAILBACKEND_SETTINGS`

## Pump

Each Pump environment variable requires a `TYK_PMP_` prefix

### Example

#### JSON Config File Option

`analytics_storage_type`

#### Equivalent Environment Variable

`TYK_PMP_ANALYTICSSTORAGETYPE`