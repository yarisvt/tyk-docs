---
date: 2017-03-24T15:49:11Z
title: Tyk Pump
weight: 2
menu:
  main:
    parent: "Tyk Stack"
aliases:
  - /concepts/tyk-components/pump/
  - /analytics-and-reporting
  - /getting-started/tyk-components/pump/
  - /tyk-configuration-reference/tyk-pump-configuration/tyk-pump-configuration/
---
# Tyk Pump

Tyk Pump is our [open source](https://github.com/TykTechnologies/tyk-pump) analytics purger that moves the API traffic analytics captured by Tyk gateways to any analytics backend or data store. It is also used to display your analytics data on Tyk Dashboard.

{{< note success >}}
**Note**  

Tyk Pump is not currently configurable in our Tyk Cloud solution.
{{< /note >}}

## Use Cases

### API Analytics on Dashboard

The Tyk Dashboard has a full set of analytics functions and graphs that you can use to segment and view your API traffic and activity. The Dashboard offers a great way for you to debug your APIs and quickly pin down where errors might be cropping up and for what clients.

See [Setup Dashboard Analytics]({{<ref "tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config">}}) to see how to configure Pump and Dashboard with either MongoDB or SQL as backend datastore.

### Monitoring the SLI and SLO of your API

TODO

### Audit Trail and Logs

TODO

## Tyk Pump Data Flow

Here's the architecture depending on your deployment model:

{{< tabs_start >}}
{{< tab_start "Enterprise" >}}

{{< img src="/img/diagrams/diagram_docs_pump-data-flow@2x.png" alt="Tyk Enterprise Pump Architecture" >}}

{{< tab_end >}}
{{< tab_start "Open Source" >}}

{{< img src="/img/diagrams/diagram_docs_pump-open-source@2x.png" alt="Tyk Open Source Pump Architecture" >}}

{{< tab_end >}}
{{< tabs_end >}}

## Scaling Tyk Pump and Configuring multiple backends

Tyk Pump is both extensible and flexible, meaning it is possible to configure Tyk Pump to send data to multiple different backends at the same time as depicted by Figure 1 below. Each Tyk Pump instance is configured with 2 Pump Backends (i) and (ii), which moves analytics data to MongoDB and Elasticsearch respectively. 

Tyk Pump is scalable, both horizontally and vertically, as indicated by instances "1", "2", and "n". Additionally, it is possible to apply filters that dictate WHAT analytics go WHERE, please see the docs on [sharded analytics configuration]({{< ref "tyk-pump/configuration.md#configuring-the-sharded-analytics" >}}). Scaling Tyk Pump will not cause duplicate data, please see the following table for the supported permutations of Tyk Pump scaling. 

| Supported | Summary |
| -- | -- |
| ✅ | Single Pump Instance, Single Backend |
| ✅ | Single Pump Instance, Multiple Backend(s) |
| ✅ | Multiple Pump Instances, Same Backend(s)|
| ❌ | Multiple Pump Instances, Different Backend(s) |

| {{< img src="/img/diagrams/diagram_docs_pump-configuration-multi-backend.png" alt="Configuration and Scaling of Tyk Pump" >}}  |
|--|
| Figure 1: An architecture diagram illustrating horizontal scaling of "n" instances of Tyk Pump each with two different backends. |

## List of supported backends

We list our [supported backends here]({{< ref "tyk-stack/tyk-pump/other-data-stores.md" >}}).


{{< grid >}}
    {{< badge href="tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config" image="/img/docker.png">}}
    Tyk Dashboard (with MongoDB/SQL)
    {{< /badge >}}
    {{< badge href="tyk-pump/hybrid" image="/img/docker.png">}}
    Tyk Dashboard (for Distributed gateways)
    {{< /badge >}}
    {{< badge href="tyk-pump/csv" image="/img/docker.png">}}
    CSV
    {{< /badge >}}
    {{< badge href="tyk-configuration-reference/tyk-pump-configuration/datadog" image="/img/docker.png">}}
    Datadog / DogStatsD
    {{< /badge >}}
    {{< badge href="tyk-pump/elasticsearch" image="/img/docker.png">}}
    Elasticsearch (2.0+)
    {{< /badge >}}
    {{< badge href="tyk-pump/graylog" image="/img/docker.png">}}
    Graylog
    {{< /badge >}}
    {{< badge href="tyk-pump/influxdb2" image="/img/docker.png">}}
    InfluxDB2
    {{< /badge >}}
    {{< badge href="tyk-pump/kafka" image="/img/docker.png">}}
    Kafka
    {{< /badge >}}
    {{< badge href="tyk-pump/logzio" image="/img/docker.png">}}
    Logz.io
    {{< /badge >}}
    {{< badge href="tyk-configuration-reference/tyk-pump-configuration/moesif" image="/img/docker.png">}}
    Moesif
    {{< /badge >}}
    {{< badge href="tyk-pump/other-data-stores/monitor-apis-prometheus" image="/img/docker.png">}}
    Prometheus
    {{< /badge >}}
    {{< badge href="tyk-pump/resurfaceio" image="/img/docker.png">}}
    Resurface.io
    {{< /badge >}}
    {{< badge href="tyk-configuration-reference/tyk-pump-configuration/splunk" image="/img/docker.png">}}
    Splunk
    {{< /badge >}}
    {{< badge href="tyk-pump/statsd" image="/img/docker.png">}}
    StatsD
    {{< /badge >}}
    {{< badge href="tyk-pump/syslog" image="/img/docker.png">}}
    Syslog (FluentD)
    {{< /badge >}}
    {{< badge href="tyk-pump/timestream" image="/img/docker.png">}}
    Timestream
    {{< /badge >}}
{{< /grid >}}

## Configuring your Tyk Pump

See [Tyk Pump Configuration]({{< ref "tyk-pump/configuration" >}}) for more details on setting up your Tyk Pump.
