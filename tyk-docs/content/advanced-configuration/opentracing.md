---
title: "Distributed Tracing"
date: 2019-07-29T10:28:52+03:00
weight: 5
menu: 
  main:
    parent: "Advanced Configuration"
---
Distributed tracing is a method of tracking application requests as they flow from frontend devices to backend services and databases. It is used to monitor and troubleshoot requests end-to-end. 

Tyk currently supports OpenTelemetry and OpenTracing for distributed tracing. Support for OpenTelemetry is available since Tyk 5.2+. If this is a valuable feature for you, please leave a comment on this [community forum post](https://community.tyk.io/t/faq-opentelemetry-distributed-tracing/5682).

## Supported observability tools
- [Jaeger]({{< ref "/content/advanced-configuration/distributed-tracing/jaeger.md" >}})
- [Zipkin]({{< ref "/content/advanced-configuration/distributed-tracing/zipkin.md" >}})
- [New Relic]({{< ref "/content/advanced-configuration/distributed-tracing/newrelic.md" >}})

## Enabling distributed tracing

### OpenTelemetry
Tyk now supports OpenTelemetry, a robust observability framework for cloud-native software. Enhance your API Gateway's monitoring capabilities with customizable traces and metrics.

Enable OpenTelemetry globally by editing your Tyk Gateway configuration file with the following setting:

#### Enabling OpenTelemetry in Two Steps
##### Step 1: Enable at Gateway Level
First, you need to enable OpenTelemetry in the Tyk Gateway. You can do this by editing the Tyk Gateway configuration file like so:

```json
{
"opentelemetry": {
  "enabled": true
  }
}
```

Alternatively, you can use the equivalent environment variable to enable OpenTelemetry.

##### Step 2: Enable at API Level
After enabling OpenTelemetry at the gateway level, activate it for the specific APIs you want to monitor. Edit the respective API definition to set `detailed_tracing` to `true`.

#### Customizing Tracing
##### Tyk-Specific Attributes and Tags
Tyk sets specific span attributes automatically:

- `tyk.api.name`: API name
- `tyk.api.orgid`: Organization ID
- `tyk.api.id`: API ID
- `tyk.api.path`: API listen path

When tagging is enabled in the API definition, tags are added as another span attribute, keyed as `tyk.api.tags`.

##### Common HTTP Span Attributes
Tyk follows the OpenTelemetry semantic conventions for HTTP spans. You can find detailed information on common attributes [here](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

Some of these common attributes include:

- `http.method`: HTTP request method.
- `http.scheme`: URL scheme.
- `http.status_code`: HTTP response status code.
- `http.url`: Full HTTP request URL.

For the full list and details, refer to the official [OpenTelemetry Semantic Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/http/http-spans.md#common-attributes).

#### Advanced OpenTelemetry Capabilities
##### Context Propagation and Sampling
Tyk supports context propagation and configurable sampling strategies ("AlwaysOn", "AlwaysOff", "TraceIDRatioBased").

#### Configuring Connection to OpenTelemetry Backend
Choose between HTTP and gRPC for the backend connection by configuring the `exporter` field to "http" or "grpc".

#### Further Configuration Details
For more in-depth information on the configuration options available, please refer to our [OpenTelemetry Configuration Details Page](https://tyk.io/docs/tyk-oss-gateway/configuration/#opentelemetry).

### OpenTracing
To enable distributed tracing, add the following tracing configuration to your Gateway `tyk.conf` file.

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
