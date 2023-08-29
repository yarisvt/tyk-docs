---
title: "OpenTracing"
date: 2019-07-29T10:28:52+03:00
weight: 1
menu: 
  main:
    parent: "Advanced Configuration"
---

## Supported observability tools
- [Jaeger]({{< ref "/content/advanced-configuration/distributed-tracing/opentracing/jaeger.md" >}})
- [Zipkin]({{< ref "/content/advanced-configuration/distributed-tracing/opentracing/zipkin.md" >}})
- [New Relic]({{< ref "/content/advanced-configuration/distributed-tracing/opentracing/newrelic.md" >}})

## Enabling OpenTracing
To enable OpenTracing, add the following tracing configuration to your Gateway `tyk.conf` file.

```{.json}
{
  "tracing": {
    "enabled": true,
    "name": "${tracer_name}",
    "options": {}
  }
}
```

- `name` is the name of the supported tracer
- `enabled`: set this to true to enable tracing
- `options`: key/value pairs for configuring the enabled tracer. See the
 supported tracer documentation for more details.

Tyk will automatically propagate tracing headers to APIs  when tracing is enabled.
