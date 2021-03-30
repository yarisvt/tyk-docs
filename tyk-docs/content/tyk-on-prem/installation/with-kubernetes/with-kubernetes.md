---
date: 2017-03-22T16:57:26Z
title: With Kubernetes
tags: ["Tyk Stack", "Self Managed", "Installation", "Kubernetes", "Helm Chart", "Tyk Operator"]
description: "How to install Tyk in a self-managed environment using Kubernetes"
menu:
  main:
    parent: "Installation"
weight: 2
url: "/tyk-on-premises/kubernetes"
aliases:
  - /getting-started/installation/with-tyk-on-premises/with-kubernetes
  - /tyk-on-premises/with-kubernetes
---

There are two main ways to install Tyk on Kubernetes: Via our Helm chart, or manually.

---

## Tyk Helm Chart

This is the preferred (and easiest) way to install Tyk Pro on Kubernetes. It will install Tyk as an ingress to your K8s cluster, where you can then add new APIs to manage via our Tyk Kubernetes Operator,  or as with a normal Tyk Pro Installation managed with a Dashboard Control Plane.

The full instructions on how to [install Tyk via the Helm chart are in our GitHub Respository](https://github.com/TykTechnologies/tyk-helm-chart)

## Tyk Kubernetes Operator and Ingress 

{{< note success >}}
**Note**  

The new Tyk Kubernetes Operator succeeds our Ingress controller and is going to be the preferred way to use Tyk with Kubernetes going forward. It is currently in BETA and we welcome users to try it out and feedback on the GitHub repository or via normal support channels for existing Tyk Customers.

{{< /note >}}

We provide a Kubernetes operator that enables Tyk to be used for managing Api Definitions (including K8s Ingress), security policies and other Tyk features. The operator code and get started guide can be found in our GitHub repository:

https://github.com/TykTechnologies/tyk-operator

## Installing Tyk on Kubernetes Manually

To install Tyk manually, please see the [guide to setting up Tyk on Kubernetes](https://github.com/TykTechnologies/tyk-kubernetes) on GitHub.