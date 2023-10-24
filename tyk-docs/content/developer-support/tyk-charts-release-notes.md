# Tyk Charts 1.1.0

### Support Lifetime
Our minor releases are supported until our next minor comes out. 
##### Release Date 30 Oct 2023

#### Breaking Changes
- `tyk-mdcb-data-plane` chart is renamed to `tyk-data-plane`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-mdcb-data-plane`, please delete the release and reinstall using `tyk-data-plane`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- `tyk-enterprise-portal` chart is renamed to `tyk-dev-portal`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-enterprise-portal`, please delete the release and reinstall using `tyk-dev-portal`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- `tyk-single-dc` chart is renamed to `tyk-stack`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-single-dc`, please delete the release and reinstall using `tyk-stack`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- Renamed parameter `backend` to `storageType` in `tyk-dashboard`
#### Deprecation
- `tyk-mdcb-data-plane` is now marked as deprecated.
- `tyk-enterprise-portal` is now marked as deprecated.
- `tyk-single-dc` is now marked as deprecated.

#### Upgrade instructions

For renamed charts, please delete the release and reinstall using the new chart.
```
helm delete [RELEASE_NAME] tyk-helm/tyk-mdcb-data-plane
helm install [RELEASE_NAME] tyk-helm/tyk-data-plane
```

For other charts, you can use `helm upgrade` to upgrade your release.
```
helm upgrade [RELEASE_NAME] tyk-helm/tyk-oss
```

#### Release Highlights
This version upgrades Tyk Gateway and Tyk Dashboard to v5.2.0, Tyk Pump to 1.8.3 and Tyk Portal to 1.7.0.

##### Security Enhancements
This version introduces a few security enhancements. It adds configuration options to configure SSL in dashboard, and support of `insecureSkipVerify` option for all charts to bypass verification for self-signed certificates. For security best practices, we now support use of secret to pass sensitive fields including admin credentials, license keys, database connection string, and remote control plane connection details via secrets.

##### New Gateway parameters
This version enhances Gateway charts by introducing more parameters, like `containerPort`, `enalyticsEnabled`, `analyticsConfigType`, `hashkeyFunction` for Gateway. 

##### New Portal parameters
The latest tyk-dev-portal beta chart has full support of all storage type options: `fs`, `db`, and `s3`.

#### Compatibility Notes
This release is tested on Kubernetes 1.26.3, 1.25.2, 1.24.6, 1.23.12, 1.22.15, 1.21.14, 1.20.15, Tyk Gateway v5.2.0, Tyk Dashboard v5.2.0, Tyk Pump v1.8.3, and Tyk Portal v1.7.0.

[tyk-pump-1.1.0](#tyk-pump-1.1.0) | [tyk-gateway-1.1.0](#tyk-gateway-1.1.0) | [tyk-oss-1.1.0](#tyk-oss-1.1.0) | [tyk-data-plane-1.0.0](#tyk-data-plane-1.0.0) | [tyk-dashboard-1.0.0-beta6](#tyk-dashboard-1.0.0-beta6) | [tyk-bootstrap-1.0.0-beta6](#tyk-bootstrap-1.0.0-beta6) | [tyk-dev-portal-1.0.0-beta1](#tyk-dev-portal-1.0.0-beta1) | [tyk-stack-1.0.0-beta1](#tyk-stack-1.0.0-beta1)

---
## tyk-pump-1.1.0
#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which Mongo Driver to use.
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
##### Changed
- Updated Pump default image tag to v1.8.3
##### Fixed
- Fixed use the resources specified in values.yaml

## tyk-gateway-1.1.0
#### Changelog
##### Added
- Added `Horizontal Pod Autoscaler` specs for gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation, or custom metrics.
- Added `insecureSkipVerify` option for gateway under `gateway.tls` section.
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added `containerPort` parameter for gateway to allow for different values to be set for port and targetPort
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on pump installations.
- Added `hashKeyFunction` parameter for Gateway. Default to `murmur128`
##### Changed
- Updated Gateway default image tag to v5.2.0
- Removed setting of obsolete environment variable TYK_GW_OPTIMISATIONSUSEASYNCSESSIONWRITE

## tyk-oss-1.1.0
#### Changelog
##### Added
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`
- Added `Horizontal Pod Autoscaler` specs for gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation, or custom metrics.
- Added `insecureSkipVerify` option for gateway under `gateway.tls` section.
- Added support for `containerSecurityContext` configuration. This is required as K8s and OpenShift versions require some of these values to be set.- Added `containerPort` parameter for gateway to allow for different values to be set for port and targetPort
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on pump installations.
##### Changed
- Updated Gateway default image tag to v5.2.0
- Updated Pump default image tag to v1.8.3

## tyk-data-plane-1.0.0
#### Breaking Changes
- `tyk-mdcb-data-plane` chart is renamed to `tyk-data-plane`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-mdcb-data-plane`, please delete the release and reinstall using `tyk-data-plane`. Please refer to change log below for enhancements and fixes that are added to the new chart.
#### Deprecation
- `tyk-mdcb-data-plane` is now marked as deprecated.
#### Changelog
##### Added
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`
- Added `Horizontal Pod Autoscaler` specs for gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation, or custom metrics.
- Added `insecureSkipVerify` option for gateway under `gateway.tls` section.
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-data-plane/README.md)
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added `containerPort` parameter for gateway to allow for different values to be set for port and targetPort
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on pump installations.
##### Changed
- Changed default value of `analyticsConfigType` to empty, so that gateway will send analytics to Pump by default.
- Updated Gateway default image tag to v5.2.0
- Updated Pump default image tag to v1.8.3

## tyk-dashboard-1.0.0-beta6
#### Breaking Changes
- Renamed parameter `backend` to `storageType`
#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which Mongo Driver to use.
- Added support for SSL configurations in `dashboard.tls` section. User can reference the TLS certificate as secret.
- Added `insecureSkipVerify` option for dashboard under `dashboard.tls` section.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
##### Changed
- Changed default storageType to `postgres`
- Removed `components/tyk-dashboard/certs/` folder as it is not required.
- Updated Dashboard default image tag to v5.2.0
##### Fixed
- Fixed duplicate setting of `TYK_DB_ENABLEAGGREGATELOOKUPS` environment variabe.
- Fixed value of TYK_DB_TYKAPI_HOST environment variable
- Fixed gateway port name in dashboard deployment

## tyk-bootstrap-1.0.0-beta6
#### Changelog
##### Added
- Added a pre-hook to validate Dashboard license before bootstrapping starts
- Added support for `insecureSkipVerify` option for the `tyk-k8s-bootstrap`
- Added parameter `sslInsecureSkipVerify`. When set to `true`, it will skip validating the SSL certificates. Usually needed when using self-signed certs.
- Make tyk-bootstrap image repository information configurable
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets
- Support retrieving Dashboard License from secret `global.secrets.useSecretName` to protect confidential fields with Kubernetes secrets

## tyk-dev-portal-1.0.0-beta1
#### Breaking Changes
- `tyk-enterprise-portal` chart is renamed to `tyk-dev-portal`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-enterprise-portal`, please delete the release and reinstall using `tyk-dev-portal`. Please refer to change log below for enhancements and fixes that are added to the new chart.
#### Deprecated
- `tyk-enterprise-portal` is now marked as deprecated.
#### Changelog
##### Added
- Added parameter `kind` for portal. User can choose to deploy Tyk developer portal as StatefulSet or Deployment. Default as StatefulSet.
- Added support for `fs` portal storage type. User can mount existing PVC to Tyk developer portal.
- Added support for `extraVolume` and `extraVolumeMount`.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets
- Added support for setting Portal licence and storage connection string via `global.secrets.useSecretName`
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
- Added support for Portal storage type `db` in `storage.type`.
##### Changed
##### Fixed
- Updated Portal default image tag to v1.7.0
- Fixed environment variable setting for s3 storage

## tyk-stack-1.0.0-beta1
#### Breaking Changes
- `tyk-single-dc` chart is renamed to `tyk-stack`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-single-dc`, please delete the release and reinstall using `tyk-stack`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- Renamed parameter `backend` to `storageType`
#### Deprecated
- `tyk-single-dc` is now marked as deprecated.

#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which Mongo Driver to use.
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`
- Added `Horizontal Pod Autoscaler` specs for gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation, or custom metrics.
- Added parameter `kind` for portal. User can choose to deploy Tyk developer portal as StatefulSet or Deployment. Default as StatefulSet.
- Added support for `fs` portal storage type. User can mount existing PVC to Tyk developer portal.
- Added `insecureSkipVerify` option for gateway under `gateway.tls` section.
- Added `insecureSkipVerify` option for dashboard under `dashboard.tls` section.
- Added support for SSL configurations in `dashboard.tls` section. User can reference the TLS certificate as secret.
- Make tyk-bootstrap image repository information configurable
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md)
- Added support for setting Portal licence and storage connection string via `global.secrets.useSecretName`. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md)
- Added `global.remoteControlPlane.useSecretName` parameter to allow users to pass control plane connection details via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md)
- Added support for `containerSecurityContext` configuration. This is required as k8s and openshift versions require some of these values to be set.
- Added `containerPort` parameter for gateway to allow for different values to be set for port and targetPort
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository
- Added support for Portal storage type `db` in `storage.type`.
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on pump installations.
##### Changed
- Changed default storageType to `postgres`
- Changed default pump backend to `prometheus` and `global.StorageType`
- Updated Gateway default image tag to v5.2.0
- Updated Pump default image tag to v1.8.3
- Updated Dashboard default image tag to v5.2.0
- Updated Portal default image tag to v1.7.0
##### Fixed
- Fixed default value of `storage.s3.endpoint` and `storage.s3.bucket`
- Fixed value of TYK_DB_HOSTCONFIG_GATEWAYHOSTNAME environment variable
