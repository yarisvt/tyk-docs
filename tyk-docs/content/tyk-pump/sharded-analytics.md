---
date: 2017-03-24T15:49:11Z
title: Sharding analytics
weight: 2
menu:
  main:
    parent: "Tyk Stack"
---
## Sharding analytics to different Pump Backends

In a multi-organisation deployment, each organisation, team, or environment might have their preferred analytics tooling. This capability allows the Tyk Pump to send analytics for different organisations or various APIs to different destinations. 
E.g.  Org A can send their analytics to MongoDB + DataDog 
while Org B can send their analytics to DataDog + expose the Prometheus metrics endpoint.

# Configuring the sharded analytics

You can achieve the sharding by setting both an {{<fn>}}allowlist{{</fn>}}t and a {{<fn>}}blocklist{{</fn>}}, meaning that some data sinks can receive information for all orgs, whereas other data sinks will not receive certain organisation's analytics if it was block listed.

This feature makes use of the field called `filters`, which can be defined per pump. This is its structure:
```
"filters":{
  "api_ids":[],
  "org_ids":[],
  "skip_api_ids":[],
  "skip_org_ids":[]
     }
```
- `api_ids` and `org_ids` works as allow list (APIs and orgs where we want to send the analytic records).
- `skip_api_ids` and `skip_org_ids` works as block list (APIs and orgs where we want to filter out and not send their the analytic records). 

The priority is always a {{<fn>}}blocklist{{</fn>}} over a {{<fn>}}allowlist{{</fn>}}.

An example of configuration would be:
 ```
"csv": {
  "type": "csv",
  "filters": {
    "org_ids": ["org1","org2"]
  },
  "meta": {
    "csv_dir": "./bar"
  }
},
"elasticsearch": {
  "type": "elasticsearch",
  "filters": {
    "skip_api_ids": ["api_id_1"],
    },
  "meta": {
    "index_name": "tyk_analytics",
    "elasticsearch_url": "https://elasticurl:9243",
    "enable_sniffing": false,
    "document_type": "tyk_analytics",
    "rolling_index": false,
    "extended_stats": false,
    "version": "6"
  }
}
```
With this configuration, all the analytics records related to `org1` or `org2` will go to the `csv` backend and everything but analytics records from `api_id_1` to `elasticsearch`.