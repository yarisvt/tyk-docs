---
date: 2017-03-24T16:28:03Z
title: Supported Back Ends
menu:
  main:
    parent: Tyk Pump Analytics
weight: 10 
aliases:
  - /analytics-and-reporting/other-data-stores/
---

The Tyk Pump component takes all of the analytics in Tyk and moves the data from the Gateway into your Dashboard. It is possible to set it up to send the analytics data it finds to other data stores. Currently we support the following:

- Elasticsearch (2.0+)
- Graylog
- InfluxDB
- Moesif
- Splunk
- StatsD
- DogStatsD
- Hybrid (Tyk RPC)
- Prometheus
- Logz.io

See the [Tyk Pump Configuration](/docs/tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/) for more details.