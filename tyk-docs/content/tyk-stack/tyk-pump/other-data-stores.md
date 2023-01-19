---
date: 2017-03-24T16:28:03Z
title: Supported Backends
menu:
  main:
    parent: Tyk Pump
weight: 10 
aliases:
  - /analyse/other-data-stores/
  - /analytics-and-reporting/other-data-stores/
---

The Tyk Pump component takes all of the analytics in Tyk and moves the data from the Gateway into your Dashboard. It is possible to set it up to send the analytics data it finds to other data stores. Currently we support the following:

## Tyk Analytics Pumps
{{< grid >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/mongo.png">}}
MongoDB Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/mongo.png">}}
Mongo Aggregate Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/postgres.png">}}
SQL Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/postgres.png">}}
SQL Aggregate Pump
{{< /badge >}}}

{{< /grid >}}

## Other supported backends
{{< grid >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/prometheus.png">}}
Prometheus Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/moesif.png">}}
Moesif Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/elastic.png">}}
Elasticsearch Pump
{{< /badge >}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/kafka.png">}}
Kafka Pump
{{< /badge >}}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/kafka.png">}}
Kafka Pump
{{< /badge >}}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/splunk.png">}}
Splunk Pump
{{< /badge >}}}

{{< badge  href="tyk-oss/ce-docker/" image="/img/pump/pumps/timestream.png">}}
Timestream Pump
{{< /badge >}}}

{{< /grid >}}


- MongoDB or SQL (Used by the Tyk Dashboard)
- CSV
- Elasticsearch (2.0+)
- Graylog
- InfluxDB
- Moesif
- Splunk
- StatsD
- DogStatsD
- Hybrid (Tyk RPC)
- [Prometheus]({{< ref "/content/tyk-stack/tyk-pump/other-data-stores/monitor-apis-prometheus.md" >}})
- Logz.io
- Kafka
- Syslog (FluentD)

See the [Tyk Pump Configuration]({{< ref "tyk-pump" >}}) for more details.
