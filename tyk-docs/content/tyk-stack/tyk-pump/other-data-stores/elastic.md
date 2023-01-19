---
title: "Elastic Pump"
date: 2023-01-19
tags: ["Tyk Pump", "Elastic Pump", "Elasticsearch"]
description: "Elasticsearch Pump"
menu:
  main:
    parent: "Supported Backends" # Child of APIM -> OSS
weight: 2

---

## Introduction

Elasticsearch pump is an available Pump in the Tyk Pump that allows you to send analytics data to an Elasticsearch cluster for storage and later analysis. The data sent to Elasticsearch can include information about API requests, such as the request and response headers, URL, and response code, as well as information about the user's identity and location. With Elasticsearch pump, you can gain valuable insights into how your APIs are being used, identify patterns and trends, and make data-driven decisions about how to optimize your API performance.

## Configuration options

| Property         | Description                                                                                                                                   | Default value       |
|----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|------------------------|
| index_name           | The name of the index that all the analytics data will be placed in.                                                                            | "tyk_analytics"        |
| elasticsearch_url    | If sniffing is disabled, the URL that all data will be sent to.                                                                                 | "http://localhost:9200"|
| enable_sniffing      | If sniffing is enabled, the "elasticsearch_url" will be used to make a request to get a list of all the nodes in the cluster, the returned addresses will then be used. | false                   |
| document_type        | The type of the document that is created in ES.                                                                                                | "tyk_analytics"        |
| rolling_index        | Appends the date to the end of the index name, so each days data is split into a different index name. E.g. tyk_analytics-2016.02.28            |  false                   |
| extended_stats       | If set to true will include the following additional fields: Raw Request, Raw Response and User Agent.                                           |      false                 |
| version              | Specifies the ES version. Use "3" for ES 3.X, "5" for ES 5.X, "6" for ES 6.X, "7" for ES 7.X .                                                 | "3"                      |
| disable_bulk         | Disable batch writing.                                                                                                                           | false                    |
| bulk_config.workers  | Number of workers.                                                                                                                               | 1                        |
| bulk_config.flush_interval | Specifies the time in seconds to flush the data and send it to ES.  |       -1                    |
| bulk_config.bulk_actions | Specifies the number of requests needed to flush the data and send it to ES. If it is needed, can be disabled with -1. |1000 |
| bulk_config.bulk_size| Specifies the size (in bytes) needed to flush the data and send it to ES. If it is needed, can be disabled with -1. | 5MB |

## Configuration Examples

{{< tabs_start >}}
{{< tab_start "Configuration file" >}}
```json
{
"pumps:{
    "elasticsearch": {
        "type": "elasticsearch",
        "meta": {
            "index_name": "tyk_analytics",
            "elasticsearch_url": "http://localhost:9200",
            "enable_sniffing": false,
            "document_type": "tyk_analytics",
            "rolling_index": false,
            "extended_stats": false,
            "version": "5",
            "bulk_config":{
                "workers":2,
                "flush_interval":60
            }
        }
    }
}
```
{{< tab_end >}}
{{< tab_start "Environment variables" >}}
```
TYK_PMP_PUMPS_ELASTICSEARCH_TYPE=elasticsearch
TYK_PMP_PUMPS_ELASTICSEARCH_META_INDEXNAME=tyk_analytics
TYK_PMP_PUMPS_ELASTICSEARCH_META_ELASTICSEARCHURL=http://localhost:9200
TYK_PMP_PUMPS_ELASTICSEARCH_META_ENABLESNIFFING=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_DOCUMENTTYPE=tyk_analytics
TYK_PMP_PUMPS_ELASTICSEARCH_META_ROLLINGINDEX=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_EXTENDEDSTATISTICS=false
TYK_PMP_PUMPS_ELASTICSEARCH_META_VERSION=5
TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_WORKERS=2
TYK_PMP_PUMPS_ELASTICSEARCH_META_BULKCONFIG_FLUSHINTERVAL=60
```
{{< tab_end >}}
{{< tabs_end >}}