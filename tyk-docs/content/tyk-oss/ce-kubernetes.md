---
title: "CE on Kubernetes"
date: 2021-01-20
menu:
  main:
    parent: "Tyk Gateway CE"
weight: 2
url: "/tyk-oss/ce-kubernetes/"
---

We will cover the installation file using Kubernetes deployment files, but you can also use our Kubernetes [Helm Chart](https://github.com/TykTechnologies/tyk-helm-chart).

### Installation 

See our [GitHub repo](https://github.com/TykTechnologies/tyk-oss-k8s-deployment) in order to install Tyk on Kubernetes.  


### Tyk Operator
Don't forget to combine your Tyk Gateway with the [Tyk Operator](https://github.com/TykTechnologies/tyk-operator) in order to get Kubernetes native, GitOps designed workflows using custom CRDs.

## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API](/docs/getting-started/tutorials/create-api/)
2. [Create a Security Policy](/docs/getting-started/tutorials/create-security-policy/)
3. [Create an API Key](/docs/getting-started/tutorials/create-api-key/)

## Domains with the Tyk Gateway

The Tyk Gateway has full domain support built-in, so you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.