---
date: 2017-03-22T16:57:26Z
title: With Kubernetes
menu:
  main:
    parent: "Tyk On-Premises"
weight: 2
url: "/tyk-on-premises/with-kubernetes"
aliases:
  - /getting-started/installation/with-tyk-on-premises/with-kubernetes
---

There are two main ways to install Tyk on Kubernetes: Via our Helm chart, or manually.

---

## Tyk Helm Chart

This is the preferred (and easiest) way to install Tyk Pro on Kubernetes, it will install Tyk as an ingress to your K8s cluster, where you can then add new APIs to manage via Tyk Kubernetes Operator,  or as with a normal Pro Installation managed with the Dashboard Control Plane.

The full instructions on how to [install Tyk via the Helm chart are in the Github Respository](https://github.com/TykTechnologies/tyk-helm-chart)

## Tyk Kubernetes Operator and Ingress 

{{< note success >}}
**Note**  

The new Tyk Kubernetes Operator succeeds our Ingress controller and is going to be the preferred way to use Tyk with Kubernetes going forward. It is currently in BETA and we welcome users to try it out and feedback on the GitHub repository or via normal support channels for existing Tyk Customers.

{{< /note >}}

We provide a Kubernetes operator that enables Tyk to be used for managing Api Definitions (including k8s Ingress), security policies and other Tyk features. The operator code and get started guide can be found in our Github repository:

https://github.com/TykTechnologies/tyk-operator

## Installing Tyk on Kubernetes Manually

To install Tyk manually, please see the [guide to setting up Tyk on Kubernetes](https://github.com/TykTechnologies/tyk-kubernetes) on Github.



