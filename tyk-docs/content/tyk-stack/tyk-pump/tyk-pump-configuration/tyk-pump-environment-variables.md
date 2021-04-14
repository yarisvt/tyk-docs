---
date: 2017-03-27T15:47:05+01:00
title: Tyk Pump Environment Variables
tags: ["Tyk Pump", "Envoronment Variables", "Configuration"]
description: "Using Environment Variables to configure your Tyk Pump"
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
url: /tyk-pump/tyk-pump-configuration/tyk-pump-environment-variables/
aliases:
  - /tyk-configuration-reference/tyk-pump-environment-variables/
---

You can use environment variables to override the config file for the Tyk Pump. Environment variables are created from the dot notation versions of the JSON objects contained with the config files.
To understand how the environment variables notation works, see [Environment Variables](/docs/tyk-configuration-reference/environment-variables/). 

All the Pump environment variables have the prefix `TYK_PMP_`. The environment variables will take precedence over the values in the configuration file.
### General configuration

#### Purge configuration
To set the `purge_delay`, `purge_chunk` and `storage_expiration_time` you have to set the following environment variables:
```
TYK_PMP_PURGEDELAY
TYK_PMP_PURGECHUNK
TYK_PMP_STORAGEEXPIRATIONTIME
```

#### Analytics storage configuration
First of all, you need to set the storage type to `redis` using `TYK_PMP_ANALYTICSSTORAGETYPE`.
After that, you can configure Redis using:
```
TYK_PMP_ANALYTICSSTORAGECONFIG_HOST
TYK_PMP_ANALYTICSSTORAGECONFIG_PORT
TYK_PMP_ANALYTICSSTORAGECONFIG_HOSTS
TYK_PMP_ANALYTICSSTORAGECONFIG_ADDRS
TYK_PMP_ANALYTICSSTORAGECONFIG_MASTERNAME
TYK_PMP_ANALYTICSSTORAGECONFIG_SENTINELPASSWORD
TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME
TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD
TYK_PMP_ANALYTICSSTORAGECONFIG_DATABASE
TYK_PMP_ANALYTICSSTORAGECONFIG_TIMEOUT
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXIDLE
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXACTIVE
TYK_PMP_ANALYTICSSTORAGECONFIG_ENABLECLUSTER
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISKEYPREFIX
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISUSESSL
TYK_PMP_ANALYTICSSTORAGECONFIG_REDISSSLINSECURESKIPVERIFY
```

#### Uptime configuration
If you want to disable the purging of the uptime data, you can set `TYK_PMP_DONTPURGEUPTIMEDATA` to true.
If you want to enable it, you can set the uptime storage with the following variables:
```
TYK_PMP_UPTIMEPUMPCONFIG_COLLECTIONNAME
TYK_PMP_UPTIMEPUMPCONFIG_MONGOURL
```

#### Health check configuration
To set the `health_check_endpoint_name` and `health_check_endpoint_port` you use:
```
TYK_PMP_HEALTHCHECKENDPOINTNAME
TYK_PMP_HEALTHCHECKENDPOINTPORT
``` 

### Pumps configuration
The default environment variable prefix for each pump follows this format: `TYK_PMP_PUMPS_{PUMP-NAME}_`, for example `TYK_PMP_PUMPS_KAFKA_`.

You can also set custom names for each pump specifying the pump type. For example, if you want a Kafka pump which is called `PROD` you need to create `TYK_PMP_PUMPS_PROD_TYPE=kafka` and configure it using the `TYK_PMP_PUMPS_PROD_` prefix.

This way, you can configure any pump using the environment variables naming convention and each pump configuration from the [tyk-pump README](https://github.com/TykTechnologies/tyk-pump#configuration). 

{{< note success >}}
**Important**  

An important point here is that you don't need to specify the `meta` variable for each pump configuration. For example, to set the `index_name` of an `elasticsearch` pump, you will need to set the `TYK_PMP_PUMPS_ELASTICSEARCH_INDEXNAME` environment variable.
{{< /note >}}

 
#### Examples

Imagine you want to configure the following pumps:
```{.json}
{
    ...
    "pumps": {
        "CSV": {
            "type": "csv",
            "meta": {
                "csv_dir": "default/"
            }
        },
        "CSVCUSTOM": {
            "type": "csv",
            "meta": {
                "csv_dir": "custom/"
            }
        },
        "PROM": {
            "type": "prometheus",
            "meta": {
                "listen_address": "localhost:9090",
                "path": "/metrics"
            }
        }
    }
}
```

Since the first pump has the default pump name, you just need to set the `csv_dir` variable using `TYK_PUMP_PUMPS_CSV_CSVDIR="default/"`.

To configure a `csvcustom` pump you need to set the pump type first and then add the `csv_dir` variable. For example `TYK_PUMP_PUMPS_CSVCUSTOM_TYPE=csv` and `TYK_PUMP_PUMPS_CSVCUSTOM_CSVDIR="custom/"`.

#### Prometheus Example

To configure a custom prometheus pump, use the following environment variables:
```
TYK_PUMP_PUMPS_PROM_TYPE=prometheus
TYK_PUMP_PUMPS_PROM_LISTENADDRESS="localhost:9090"
TYK_PUMP_PUMPS_PROM_PATH= "/metrics"
```

You have now configured all 3 pumps specified in your config file with environment variables.
