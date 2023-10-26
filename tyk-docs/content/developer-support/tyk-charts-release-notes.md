# Tyk Charts 1.1.0

Open Source ([Mozilla Public License](https://github.com/TykTechnologies/tyk/blob/master/LICENSE.md))

### Support Lifetime
Our minor releases are supported until our next minor comes out. 
##### Release Date 30 Oct 2023

#### Breaking Changes
- `tyk-mdcb-data-plane` chart is renamed to `tyk-data-plane`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-mdcb-data-plane`, please delete the release and reinstall using `tyk-data-plane`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- `tyk-enterprise-portal` chart is renamed to `tyk-dev-portal`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-enterprise-portal`, please delete the release and reinstall using `tyk-dev-portal`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- `tyk-single-dc` chart is renamed to `tyk-stack`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-single-dc`, please delete the release and reinstall using `tyk-stack`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- Renamed parameter `backend` to `storageType` in `tyk-dashboard`
#### Deprecations
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
This version upgrades Tyk Gateway and Tyk Dashboard to v5.2.1, Tyk Pump to 1.8.3 and Tyk Portal to 1.7.0.

##### Security Enhancements
This version introduces a few security enhancements. It adds configuration options to configure SSL in dashboard and support of `insecureSkipVerify` option for all charts to bypass verification for self-signed certificates. For security best practices, we now support [use of secret](https://github.com/TykTechnologies/tyk-charts/tree/main/tyk-stack#protect-confidential-fields-with-kubernetes-secrets) to pass sensitive fields including admin credentials, license keys, database connection string and remote control plane connection details via secrets.

##### New Gateway parameters
This version enhances Gateway charts by introducing more parameters, like `containerPort`, `analyticsEnabled`, `analyticsConfigType`, `hashkeyFunction` for Gateway. Their usage can be found in values.yaml:

```
  # The port which will be exposed on the container for tyk-gateway
  containerPort: 8080
```

```
  # analyticsEnabled property is used to enable/disable analytics.
  # If set to empty or nil, analytics will be enabled/disabled based on `global.components.pump`.
  analyticsEnabled: ""
```

```
  # used to decide whether to send the results back directly to Tyk without a hybrid pump
  # if you want to send analytics to control plane instead of pump, change analyticsConfigType to "rpc"
  analyticsConfigType: ""
```

```
  # hashKeyFunction property is used to specify the Key hashing algorithm.
  # Possible values: murmur64, murmur128, sha256.
  hashKeyFunction: murmur128
```

##### New Portal parameters
The latest tyk-dev-portal beta chart has full support of all storage type options: `fs`, `db`, and `s3`.

#### Compatibility Notes
This release is tested on Kubernetes 1.26.3, 1.25.2, 1.24.6, 1.23.12, 1.22.15, 1.21.14, 1.20.15, Tyk Gateway v5.2.1, Tyk Dashboard v5.2.1, Tyk Pump v1.8.3, and Tyk Portal v1.7.0.

[tyk-pump-1.1.0](#tyk-pump-1.1.0) | [tyk-gateway-1.1.0](#tyk-gateway-1.1.0) | [tyk-oss-1.1.0](#tyk-oss-1.1.0) | [tyk-data-plane-1.0.0](#tyk-data-plane-1.0.0) | [tyk-dashboard-1.0.0-beta6](#tyk-dashboard-1.0.0-beta6) | [tyk-bootstrap-1.0.0-beta6](#tyk-bootstrap-1.0.0-beta6) | [tyk-dev-portal-1.0.0-beta1](#tyk-dev-portal-1.0.0-beta1) | [tyk-stack-1.0.0-beta1](#tyk-stack-1.0.0-beta1)

---
## tyk-pump-1.1.0
#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which [Mongo Driver](https://tyk.io/docs/tyk-dashboard/configuration/#mongo_driver) to use.
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres Pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`.
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets.
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
##### Changed
- Updated Pump default image tag to v1.8.3.
##### Fixed
- Fixed typo in Pump deployment template to pick up the correct field `pump.resources` specified in values.yaml.

## tyk-gateway-1.1.0
#### Changelog
##### Added
- Added `Horizontal Pod Autoscaler` specs for Gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation or custom metrics.
- Added `insecureSkipVerify` option for Gateway under `gateway.tls` section to bypass verification for self-signed certificates.
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets.
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added `containerPort` parameter for Gateway to allow for different values to be set for port and targetPort.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on Pump installations.
- Added `hashKeyFunction` parameter for Gateway. Default to `murmur128`.
##### Changed
- Updated Gateway default image tag to v5.2.1.
- Removed setting of obsolete environment variable TYK_GW_OPTIMISATIONSUSEASYNCSESSIONWRITE.

## tyk-oss-1.1.0
#### Changelog
##### Added
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres Pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`.
- Added `Horizontal Pod Autoscaler` specs for Gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation or custom metrics.
- Added `insecureSkipVerify` option for Gateway under `gateway.tls` section to bypass verification for self-signed certificates.
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added `containerPort` parameter for Gateway to allow for different values to be set for port and targetPort.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on Pump installations.
##### Changed
- Updated Gateway default image tag to v5.2.1.
- Updated Pump default image tag to v1.8.3.

## tyk-data-plane-1.0.0
#### Breaking Changes
- `tyk-mdcb-data-plane` chart is renamed to `tyk-data-plane`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-mdcb-data-plane`, please delete the release and reinstall using `tyk-data-plane`. Please refer to change log below for enhancements and fixes that are added to the new chart.
#### Deprecations
- `tyk-mdcb-data-plane` is now marked as deprecated.
#### Changelog
##### Added
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres Pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`.
- Added `Horizontal Pod Autoscaler` specs for Gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation or custom metrics.
- Added `insecureSkipVerify` option for Gateway under `gateway.tls` section to bypass verification for self-signed certificates.
- Added `global.remoteControlPlane.useSecretName` parameter to allows user to pass control plane connection details via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-data-plane/README.md).
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added `containerPort` parameter for Gateway to allow for different values to be set for port and targetPort.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on Pump installations.
##### Changed
- Changed default value of `analyticsConfigType` to empty, so that Gateway will send analytics to Pump by default.
- Updated Gateway default image tag to v5.2.1.
- Updated Pump default image tag to v1.8.3.

## tyk-dashboard-1.0.0-beta6
#### Breaking Changes
- Renamed parameter `backend` to `storageType`.
#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which [Mongo Driver](https://tyk.io/docs/tyk-dashboard/configuration/#mongo_driver) to use.
- Added support for SSL configurations in `dashboard.tls` section. User can reference the TLS certificate as secret.
- Added `insecureSkipVerify` option for dashboard under `dashboard.tls` section to bypass verification for self-signed certificates.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets.
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
##### Changed
- Changed default storageType to `postgres`.
- Removed `components/tyk-dashboard/certs/` folder as it is not required.
- Updated Dashboard default image tag to v5.2.1.
##### Fixed
- Fixed duplicate setting of `TYK_DB_ENABLEAGGREGATELOOKUPS` environment variable in template so that WARNING message will not be shown during helm install or upgrade.
- Fixed value of TYK_DB_TYKAPI_HOST environment variable for displaying API URL correctly on dashboard.

## tyk-bootstrap-1.0.0-beta6
#### Changelog
##### Added
- Added a pre-hook to validate Dashboard license before bootstrapping starts.
- Added parameter `sslInsecureSkipVerify`. When set to `true`, it will skip validating the SSL certificates. Usually needed when using self-signed certs.
- Make tyk-bootstrap image repository information configurable via `image.repository` and `image.tag`.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets.
- Support retrieving Dashboard License from secret `global.secrets.useSecretName` to protect confidential fields with Kubernetes secrets.

## tyk-dev-portal-1.0.0-beta1
#### Breaking Changes
- `tyk-enterprise-portal` chart is renamed to `tyk-dev-portal`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-enterprise-portal`, please delete the release and reinstall using `tyk-dev-portal`. Please refer to change log below for enhancements and fixes that are added to the new chart.
#### Deprecations
- `tyk-enterprise-portal` is now marked as deprecated.
#### Changelog
##### Added
- Added parameter `kind` for portal. User can choose to deploy Tyk Developer Portal as [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) or [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/). Default as StatefulSet.
- Added support for `fs` portal storage type. User can mount existing PVC to Tyk Developer Portal.
- Added support for `extraVolume` and `extraVolumeMount`. It can be used to configure volume for `fs` portal storage.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets. See [Protect Confidential Fields with Kubernetes Secrets](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-single-dc/README.md#protect-confidential-fields-with-kubernetes-secrets) for what can be included in the secret.
- Added support for setting Portal licence and storage connection string via `global.secrets.useSecretName`. See [Protect Confidential Fields with Kubernetes Secrets](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-single-dc/README.md#protect-confidential-fields-with-kubernetes-secrets) for what can be included in the secret.
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
- Added support for Portal storage type `db` in `storage.type`. See [Enterprise Portal Storage Type](https://tyk.io/docs/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration/#storage-settings) for details of the different storage types we support.
##### Changed
##### Fixed
- Updated Portal default image tag to v1.7.0.
- Fixed environment variable setting for PORTAL_THEMING_PATH when using s3 as storage. The leading dot in original value "./themes" is removed so that s3 can correctly initialise the themes directory.

## tyk-stack-1.0.0-beta1
#### Breaking Changes
- `tyk-single-dc` chart is renamed to `tyk-stack`. This change is part of the terminology alignment initiatives where Tyk is standardising how we refer to the components. If you have previously used `tyk-single-dc`, please delete the release and reinstall using `tyk-stack`. Please refer to change log below for enhancements and fixes that are added to the new chart.
- Renamed parameter `backend` to `storageType`.
#### Deprecations
- `tyk-single-dc` is now marked as deprecated.

#### Changelog
##### Added
- Added parameter `.global.mongo.driver` to configure which [Mongo Driver](https://tyk.io/docs/tyk-dashboard/configuration/#mongo_driver) to use.
- Added new options to `pump.backend` parameter. Users can enable specific Mongo & Postgres Pumps: `mongo-aggregate`, `mongo-selective`, `postgres-aggregate`, `postgres-pump`.
- Added `Horizontal Pod Autoscaler` specs for Gateway deployments, allowing users to easily enable automatic scaling by CPU utilisation, memory utilisation, or custom metrics.
- Added parameter `kind` for portal. User can choose to deploy Tyk Developer Portal as [StatefulSet](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/) or [Deployment](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/). Default as StatefulSet.
- Added support for `fs` portal storage type. User can mount existing PVC to Tyk Developer Portal.
- Added `insecureSkipVerify` option for Gateway under `gateway.tls` section to bypass verification for self-signed certificates.
- Added `insecureSkipVerify` option for dashboard under `dashboard.tls` section to bypass verification for self-signed certificates.
- Added support for SSL configurations in `dashboard.tls` section. User can reference the TLS certificate as secret.
- Make tyk-bootstrap image repository information configurable.
- Added `global.adminUser.useSecretName` parameter to allows user to pass Admin Credentials via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md).
- Added support for setting Portal licence and storage connection string via `global.secrets.useSecretName`. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md).
- Added `global.remoteControlPlane.useSecretName` parameter to allow users to pass control plane connection details via Kubernetes secrets. For detail uses of secrets, see [README](https://github.com/TykTechnologies/tyk-charts/blob/main/tyk-stack/README.md).
- Added support for `containerSecurityContext` configuration. This is required as [K8s](https://kubernetes.io/docs/tasks/configure-pod-container/security-context/) and [OpenShift](https://access.redhat.com/documentation/en-us/openshift_container_platform/4.12/html/authentication_and_authorization/managing-pod-security-policies) versions require the security context for container to be set.
- Added `containerPort` parameter for Gateway to allow for different values to be set for port and targetPort.
- Added support for `imagePullSecret` so user can pull an image from a private container image registry or repository.
- Added support for Portal storage type `db` in `storage.type`. See [Enterprise Portal Storage Type](https://tyk.io/docs/tyk-stack/tyk-developer-portal/enterprise-developer-portal/install-tyk-enterprise-portal/configuration/#storage-settings) for details of the different storage types we support.
- Added parameter `analyticsEnabled` to enable or disable analytics in Gateway. It is set to "" by default which means it will be enabled or disabled based on Pump installations.
##### Changed
- Changed default storageType to `postgres`. See [Database Options](https://tyk.io/docs/tyk-dashboard/database-options/) for the storage types we support.
- Changed default Pump backend to `prometheus` and `global.StorageType`. By default, this gives you Prometheus metrics and [Dashboard analytics](https://tyk.io/docs/tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config/).
- Updated Gateway default image tag to v5.2.1.
- Updated Pump default image tag to v1.8.3.
- Updated Dashboard default image tag to v5.2.1.
- Updated Portal default image tag to v1.7.0.
