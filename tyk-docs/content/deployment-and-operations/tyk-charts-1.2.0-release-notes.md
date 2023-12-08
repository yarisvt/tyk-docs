Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

### Support Lifetime
Our minor releases are supported until our next minor comes out. 
##### Release Date 7 Dec 2023

#### Breaking Changes
- Updated the default service type of Gateway, Dashboard, Developer Portal, and Pump from *NodePort* to *ClusterIP* for better security. You can configure external access to a service with your desired method like changing service type to *NodePort*, *LoadBalancer* or configuring *Ingress*.
#### Deprecations
There are no deprecations in this release. 

#### Upgrade instructions

You can use `helm upgrade` to upgrade your release
```
helm upgrade [RELEASE_NAME] tyk-helm/tyk-oss
```

#### Release Highlights
This version upgrades Tyk Gateway and Tyk Dashboard to v5.2.3 and Tyk Portal to 1.8.1.

##### Stable release of Tyk Stack, Tyk Dashboard, Tyk Developer Portal and bootstrapping :tada:


##### New Gateway parameters
This version enhances Gateway charts by introducing configurations for OpenTelemetry. Their usage can be found in values.yaml:

```yaml
    # opentelemetry is used to configure opentelemetry for Tyk Gateway
    opentelemetry:
      # Used to enable/disable opentelemetry
      enabled: false
      # exporter is used to define the type of the exporter to sending data in OTLP protocol
      # Valid values are "grpc" or "http"
      exporter: grpc
      # endpoint defines OpenTelemetry collector endpoint to connect to.
      endpoint: localhost:4317
      # A map of headers that will be sent with HTTP requests to the collector.
      # It should be set to map of string to string
      headers: {}
      # Timeout for establishing a connection to the collector
      connectionTimeout: 1
      # Name of the resource that will be used to identify the resource.
      resourceName: tyk
      # Type of the span processor to use. Valid values are “simple” or “batch”.
      spanProcessorType: batch
      # Type of the context propagator to use. Valid values are "tracecontext" and "b3".
      contextPropagation: tracecontext
      # TLS configuration for the exporter.
      tls:
        # Flag that can be used to enable TLS
        enabled: false
        # Flag that can be used to skip TLS verification if TLS is enabled
        insecureSkipVerify: true
        # Maximum TLS version that is supported.
        maxVersion: 1.3
        # Minimum TLS version that is supported
        minVersion: 1.2
        # Path to the cert file
        certFileName: ""
        # Path to the key file
        keyFileName: ""
        # Path to CA file
        caFileName: ""
        # Existing secret that stores TLS and CA Certificate
        certificateSecretName: ""
        # Mount path on which certificate secret should be mounted
        secretMountPath: ""
      sampling:
        # Refers to the policy used by OpenTelemetry to determine whether a particular trace should be sampled or not.
        type: "AlwaysOn"
        # Parameter for the TraceIDRatioBased sampler type and represents the percentage of traces to be sampled.
        rate: 0.5
        # Rule that ensures that if we decide to record data for a particular operation, we’ll also record data for
        # all the subsequent work that operation causes
        parentBased: false
```

#### Compatibility Notes
This release is tested on Kubernetes 1.26.3, 1.25.2, 1.24.6, 1.23.12, 1.22.15, 1.21.14, 1.20.15, Tyk Gateway v5.2.3, Tyk Dashboard v5.2.3, Tyk Pump v1.8.3, and Tyk Portal v1.8.1.

[tyk-pump-1.2.0](#tyk-pump-1.2.0) | [tyk-gateway-1.2.0](#tyk-gateway-1.2.0) | [tyk-oss-1.2.0](#tyk-oss-1.2.0) | [tyk-data-plane-1.1.0](#tyk-data-plane-1.1.0) | [tyk-dashboard-1.0.0](#tyk-dashboard-1.0.0) | [tyk-bootstrap-1.0.0](#tyk-bootstrap-1.0.0) | [tyk-dev-portal-1.0.0](#tyk-dev-portal-1.0.0) | [tyk-stack-1.0.0](#tyk-stack-1.0.0)

---
## tyk-bootstrap-1.0.0
#### Changelog
##### Added
- Added a field `global.components.bootstrap` to enable or disable bootstrapping.
- Added `extraEnvs` to support setting environment variables for jobs.
##### Changed
- Bootstrapping Job does not fail if there is existing ORG found in dashboard storage. If the database has been bootstrapped already, the job will proceed with creating secret with Operator and Developer Portal.
- Renamed environment variable names to be consistent with `envconfig` naming convention. The list of supported environment variables are documented at [tyk-k8s-bootstrap](https://github.com/TykTechnologies/tyk-k8s-bootstrap).
- Remove .cluster.local from service URL to allow for named cluster support.
##### Removed
- Removed annotation `[sidecar.istio.io/inject:](http://sidecar.istio.io/inject:) “false”` from *postInstall* and *preDelete* jobs. If Tyk is deployed inside *Istio service mesh*, you can configure the required annotation for all jobs using values.yaml file.
- Removed unused fields from tyk-bootstrap chart values.yaml: `global.servicePorts` and `global.components`, `global.tls.gateway`.

## tyk-dashboard-1.0.0
#### Changelog
##### Added
- Added Ingress configuration for dashboard and classic portal.
- In `tyk-dashboard`, a new field (`dashboard.tykApiHost`) allows configuring a custom service name for Tyk Gateway.
##### Fixed
- Fixed gateway connection string at environment variable TYK_DB_TYKAPI_HOST and TYK_DB_TYKAPI_PORT.
- Aligned the value of `dashboard.overrideHostname` with `gwHostName` yaml anchor.
- Fixed setting TYK_DB_ENABLEAGGREGATELOOKUPS via `dashboard.enableAggregateLookups`.
- Fixed the issue that Dashboard version <= 5.0.2 failed to start because of missing configuration file (tyk_analytics.conf). In order to fix that, if the dashboard version is <= v5.0.2, it runs init-container to create empty tyk_analytics.conf file.
##### Changed
* Updated Dashboard default image tag to v5.2.3.
* Updated default value for PostgreSQL sslmode (`global.postgres.sslmode`) from empty to `disable`.
- Updated default service type of Dashboard service from NodePort to ClusterIP.
- Removed `.cluster.local` from service URL to allow for named cluster support.
##### Removed
- Removed annotation `traffic.sidecar.istio.io/excludeInboundPorts` and `traffic.sidecar.istio.io/includeInboundPorts`. If Tyk is deployed inside *Istio service mesh*, you can configure the required annotation using values.yaml file.
- Removed support for `dashboard.enableIstioIngress` field in values.yaml.

## tyk-data-plane-1.1.0
#### Breaking Changes
- Updated the default service type of Gateway and Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to a service with your desired method like changing service type to *NodePort*, *LoadBalancer*, or configuring *Ingress*.
#### Changelog
##### Added  
- Added OpenTelemetry support under `tyk-gateway.gateway.opentelemetry`.
##### Updated
- Updated Gateway default image tag to v5.2.3.
- Updated the default service type of Gateway and Pump service from *NodePort* to *ClusterIP*. You can configure external access to a service with your desired method like changing service type to NodePort, LoadBalancer, or configuring Ingress.
- Removed `.cluster.local` from service URL to allow for named cluster support.

## tyk-dev-portal-1.0.0

#### Changelog
##### Updated
- Updated Developer Portal default image tag to v1.8.1.
- Updated the default service type of Gateway and Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to a service with your desired method like changing service type to *NodePort*, *LoadBalancer*, or configuring *Ingress*.
* Updated default storage type in values.yaml from `fs` to `db`. The new default option does not require additional configuration to work.
* Updated liveliness probe from `/` to `/live` and readiness probe from `/` to `/ready`.
- Moved the database related variables in the values.yaml outside the section related to the storage of the assets inside enterprise portal. This reduces confusion, facilitating database configuration.
- Updated setting Dashboard URL in Portal using service discovery.
* User can provide developer portal configurations via secret `useSecretName` instead of `global.secrets.useSecretName`. This is to make it easier to manage portal and dashboard configuration separately.
##### Removed
- Removed field `global.bootstrap.devPortal`. You can now set both `global.components.bootstrap` and `tyk-bootstrap.bootstrap.devPortal` to true to enable portal bootstrapping.


## tyk-gateway-1.2.0
#### Breaking Changes
- Updated the default service type of Gateway service from NodePort to ClusterIP. You can configure external access to service with your desired method like changing service type to NodePort, LoadBalancer, or configuring Ingress.
#### Changelog
##### Added
- Added OpenTelemetry support under `gateway.opentelemetry`.
- In `tyk-gateway`, new fields (`dashboardConnectionString` and `policyConnectionString`) are introduced to set connection strings for Dashboard App Config and Policies when using Tyk Dashboard as a source.
##### Changed
- Updated Gateway default image tag to v5.2.3.
- Set environment variables TYK_GW_DBAPPCONFOPTIONS_CONNECTIONSTRING and TYK_GW_POLICIES_POLICYCONNECTIONSTRING to dashboard connection string only if `gateway.useDashboardAppConfig.enabled` is set to true.
- Set TYK_GW_POLICIES_POLICYSOURCE to “service” if `gateway.useDashboardAppConfig.enabled` is set to true.
- Updated the default service type of Gateway and Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to a service with your desired method like changing service type to NodePort, LoadBalancer, or configuring Ingress.
- Remove .cluster.local from service URL to allow for named cluster support.
##### Fixed
- Fixed the issue that gateway container port needs to be the same as service port for gateway to work. This change configures Gateway pod listens on port `.gateway.containerPort` instead of `global.servicePorts.gateway`.
##### Removed
- Removed `global.components.dashboard` flag as it was misleading. Adapted gateway to use a gateway-specific flag `gateway.useDashboardAppConfig`. Set `gateway.useDashboardAppConfig` to true if gateway should connect to Dashboard for [app configurations]([https://tyk.io/docs/tyk-oss-gateway/configuration/#use_db_app_configs](https://tyk.io/docs/tyk-oss-gateway/configuration/#use_db_app_configs)).

## tyk-oss-1.2.0
#### Breaking Changes
- Updated the default service type of Gateway and Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to service with your desired method like changing service type to *NodePort*, *LoadBalancer*, or configuring *Ingress*.
#### Changelog
##### Added
- Added OpenTelemetry support under `tyk-gateway.gateway.opentelemetry`.
##### Changed
- Updated Gateway default image tag to v5.2.3.
- Updated the Default service type of Gateway and Pump service from NodePort to ClusterIP. You can configure external access to service with your desired method like changing service type to NodePort, LoadBalancer, or configuring Ingress.
- Remove .cluster.local from service URL to allow for named cluster support.

## tyk-pump-1.2.0
#### Breaking Changes
- Updated the default service type of Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to service with your desired method like changing service type to *NodePort*, *LoadBalancer*, or configuring *Ingress*.
#### Changelog
##### Updated
- Updated the default service type of Pump service from *NodePort* to *ClusterIP* for better security. You can configure external access to service with your desired method like changing service type to *NodePort*, *LoadBalancer*, or configuring *Ingress*.
- Remove .cluster.local from service URL to allow for named cluster support.
##### Fixed  
- Fixed the problem that Hybrid Pump was not setup correctly if remoteControlPlane connection details was set through secret. Setting up hybrid pump using Kubernetes secret values if `global.remoteControlPlane.useSecretName` is set.

## tyk-stack-1.0.0
#### Changelog
##### Added
- Added OpenTelemetry support under `tyk-gateway.gateway.opentelemetry`.  
- Added Ingress configuration for dashboard and classic portal.
- Added `extraEnvs` to support setting environment variables for bootstrapping jobs.
- Added a field `global.components.bootstrap` to enable or disable bootstrapping.
- Added new fields (`dashboardConnectionString` and `policyConnectionString`) in `tyk-gateway`, that are introduced to set connection strings for Dashboard App Config and Policies when using Tyk Dashboard as a source.
- Added In `tyk-dashboard`, a new field (`tykApiHost`) to allow configuring a custom service name for Tyk Gateway.
##### Updated
- Updated default storage type in values.yaml from `fs` to `db`. The new default option does not require additional configuration to work.
- Updated values.yaml structure so that database related variables are outside the section related to the storage of the assets inside enterprise portal.
- Updated secret metadata name to be dynamic so that it is possible to install multiple releases in the same namespace.
- Updated Gateway default image tag to v5.2.3.
- Updated Dashboard default image tag to v5.2.3.
- Updated developer portal configurations can be provided via secret `tyk-dev-portal.useSecretName` instead of `global.secrets.useSecretName`. This is to make it easier to manage portal and dashboard configuration separately.
- Updated Developer Portal default image tag to v1.8.1.
* Updated: default value for postgresql sslmode changed from empty to `disable`.
- Updated: set Default service type of Dashboard, Developer Portal, Gateway, and Pump service from NodePort to ClusterIP. You can configure external access to service with your desired method like changing service type to NodePort, LoadBalancer, or configuring Ingress.
- Remove .cluster.local from service URL to allow for named cluster support.  
##### Removed
- Removed duplicate setting of TYK_GW_SECRET in tyk-stack values.yaml. The value is set in tyk-gateway component already.
- Removed duplicate setting of TYK_DB_HOSTCONFIG_GATEWAYHOSTNAME in tyk-stack values.yaml. The value is set at `tyk-dashboard.dashboard.hostConfig.overrideHostname`.
- Removed field `global.bootstrap.devPortal`. You can now set both `global.components.bootstrap` and `tyk-bootstrap.bootstrap.devPortal` to true to enable portal bootstrapping.
- Removed support for `tyk-dashboard.dashboard.enableIstioIngress` field in values.yaml. Users can just set up all required annotations that works with their service mesh in values.yaml.
- Removed `global.components.dashboard` flag as it was misleading. Adapted gateway to use a gateway-specific flag `tyk-gateway.gateway.useDashboardAppConfig`. Set `tyk-gateway.gateway.useDashboardAppConfig` to true if gateway should connect to Dashboard for [app configurations](https://tyk.io/docs/tyk-oss-gateway/configuration/#use_db_app_configs).
