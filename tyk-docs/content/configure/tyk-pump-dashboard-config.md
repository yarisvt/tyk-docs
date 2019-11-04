---
date: 2017-03-27T15:47:05+01:00
title: Pump Dashboard Analytics Configuration
menu:
    main:
        parent: "Tyk Pump Configuration"
weight: 4 
---

Let's walk through setting up analytics in the Dashboard via Pump

There are 3 different pumps we want to look at:

1. mongo 
2. mongo-pump-selective
3. mongo-pump-aggregate

### mongo

This Pump simply saves all individual requests across every organization to a collection called `tyk_analytics`.  Each request will be stored as a single document.

The Dashboard will use this collection to show requests under `API Usage Data -> Log Browser` unless [use_sharded_analytics](/docs/configure/tyk-dashboard-configuration-options/) are set to true, in which case, `Log Browser` will be populated using the `mongo-pump-selective` pump below.

This collection [should be capped](/docs/configure/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents.

```{.json}
{
  ...
  "pumps": { 
    "mongo": {
      "type": "mongo",
      "meta": {
        "collection_name": "tyk_analytics",
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}"
      }
    }
}
```

### mongo-pump-aggregate
This pump stores data in a collection called `z_tyk_analyticz_aggregate_{ORG ID}`.  

There are minimal number of documents that get stored, don't need to worry about capping this.  The documents contain aggregate info across an individual API, such as total requests, errors, and more.

This pump supplies the data for the following sub categories `API Usage Data`:

* Activity by API
* Activity by Key
* Errors

pump config
```{.json}
{
  ...
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```

### mongo-pump-selective

this pump stores data in collections called `z_tyk_analyticz_{ORG ID}`.

If the Dashboard configuration key `use_sharded_keys` equals `true`, then the Dashboard will use these collections to populate `Log Browser`.

This collection [should be capped](/docs/configure/tyk-pump-configuration/#capping-analytics-data) due to the number of individual documents.
```{.json}
{
  ...
  "pumps": {
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://username:password@{hostname:port},{hostname:port}/{db_name}",
        "use_mixed_collection": true
      }
    }
  }
}
```

## Example pump config

With the Dashboard config value `use_sharded_analytics` set to true, this will show analytics in your Dashboard

* Activity by API
* Activity by Key
* Errors
* Log Browser

```{.json}
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
    "optimisation_max_active": 100,
    "enable_cluster": false
  },
  "purge_delay": 2,
  "pumps": {
    "mongo-pump-aggregate": {
      "name": "mongo-pump-aggregate",
      "meta": {
        "mongo_url": "mongodb://localhost:27017/tyk_analytics"
      },
      "use_mixed_collection": false
    },
    "mongo-pump-selective": {
      "name": "mongo-pump-selective",
      "meta": {
        "mongo_url": "mongodb://localhost:27017/tyk_analytics"
      }
    }
  },
  "dont_purge_uptime_data": true
}
```