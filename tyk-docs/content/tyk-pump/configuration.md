---
date: 2017-03-27T15:47:05+01:00
title: Tyk Pump Configuration
menu:
  main:
    parent: Tyk Pump
weight: 4
aliases:
  - /tyk-configuration-reference/tyk-pump-configuration/
  - /configure/tyk-pump-configuration/
---

# Tyk Pump Configuration

## Tyk Pump Base Configuration
You can configure Tyk Pump using JSON conf file or environment variables. The following is an example of the base config. You can add one or more Pump Backend configs to the base config.

### Using JSON / Conf File

Create a `pump.conf` file:

```.json
{
  "analytics_storage_type": "redis",
  "analytics_storage_config": {
    "type": "redis",
    "host": "localhost",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 0,
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false
  },
  "log_level":"info",
  "log_format":"text",
  "purge_delay": 1,
  "health_check_endpoint_name": "hello",
  "health_check_endpoint_port": 8083,
  "pumps": {
    "csv": {
      "type": "csv",
      "meta": {
        "csv_dir": "./"
      }
    },
	...
  },
  "dont_purge_uptime_data": true,
  "omit_detailed_recording": false,
  "max_record_size": 1000
}
```

### Using Environment Variables
```
TYK_PMP_OMITCONFIGFILE=true

TYK_PMP_ANALYTICSSTORAGETYPE=redis
TYK_PMP_ANALYTICSSTORAGECONFIG_TYPE=redis
TYK_PMP_ANALYTICSSTORAGECONFIG_ADDRS=tyk-redis:6379
TYK_PMP_ANALYTICSSTORAGECONFIG_USERNAME=
TYK_PMP_ANALYTICSSTORAGECONFIG_PASSWORD=
TYK_PMP_ANALYTICSSTORAGECONFIG_DATABASE=0
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXIDLE=100
TYK_PMP_ANALYTICSSTORAGECONFIG_MAXACTIVE=100
TYK_PMP_ANALYTICSSTORAGECONFIG_ENABLECLUSTER=false
TYK_PMP_PURGEDELAY=2

TYK_PMP_DONTPURGEUPTIMEDATA=true
```
#### Omitting the Configuration File

From Tyk Pump v1.5.1, you can configure an environment variable to omit the configuration file with the `TYK_PMP_OMITCONFIGFILE` variable. This is specially useful when using Docker, since by default, the Tyk Pump has a default configuration file with pre-loaded pumps. If you do not want to load the default configurations, set `TYK_PMP_OMITCONFIGFILE` to true.

### Base Configuration Fields Explained

#### Analytics Storage Configuration

This configures where Tyk Pump scrapes Tyk Gateway analytics from. Currently Tyk Pump only support `redis`.

```json
  "analytics_storage_config": {
    "type": "redis",
    "host": "localhost",
    "port": 6379,
    "hosts": null,
    "username": "",
    "password": "",
    "database": 0,
    "optimisation_max_idle": 100,
    "optimisation_max_active": 0,
    "enable_cluster": false,
    "redis_use_ssl": false,
    "redis_ssl_insecure_skip_verify": false
  },
```

`redis_use_ssl` - Setting this to true to use SSL when connecting to Redis

`redis_ssl_insecure_skip_verify` - Set this to true to tell Pump to ignore Redis' cert validation

#### Purge Configuration

The following fields configure how often Pump purge data from Redis and helps you to get optimal performance with Redis.

`purge_delay` - The number of seconds the Pump waits between checking for analytics data and purge it from Redis.

`purge_chunk` - The maximum number of records to pull from Redis at a time. If it is not set or 0, all the analytics records in Redis are pulled. If it is set, `storage_expiration_time` is used to reset the analytics record TTL.

`storage_expiration_time` - The number of seconds for the analytics records TTL. It only works if `purge_chunk` is set. Defaults to 60 seconds.

#### Logs

`log_level` - Set the logger details for tyk-pump. The possible values are: `info`,`debug`,`error` and `warn`. By default, the log level is `info`.

`log_format` - Set the logger format. The possible values are: `text` and `json`. By default, the log format is `text`.

#### Health Check

You can configure the health check endpoint and port for the Tyk Pump:

- `health_check_endpoint_name` - The default endpoint is "health"
- `health_check_endpoint_port` - The default port is 8083

This returns a HTTP 200 OK response if the Pump is running.

``` json
{"status": "ok"}
```

## Capping Analytics Data Storage

Tyk Gateways can generate a lot of analytics data. Be sure to read about [Capping Analytics Data Storage]({{< ref "tyk-stack/tyk-manager/analytics/capping-analytics-data-storage" >}})

## Configure Pump Backends

Add pump backend configurations in `pumps`.

```.json
{
  "pumps": {
    "my_pump_1": {              <-- Give a name for this Pump Backend
      "type": "prometheus",     <-- Type of Pump Backend
      "meta": {                 <-- Meta Configurations for this Pump Backend
        "csv_dir": "./"
      }
    }
	...
  },
}
```

See [Pump Backends]({{<ref "tyk-stack/tyk-pump/other-data-stores">}}) for the configuration details of each Pump Backend type.
