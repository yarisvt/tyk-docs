---
date: 2017-03-22T16:57:26Z
title: Kubernetes Quickstart
menu:
  main:
    parent: "With Docker"
weight: 1
url: "/get-started/with-tyk-on-premise/installation/docker/with-kubernetes"
---

## Prerequisites

### Helm / Tiller

If you are deploying dependency databases or Tyk components via Helm Charts, you will need to ensure that Helm is
installed on your host / bastion machine, and Tiller service account has been created.

Install Tiller (Quickstart)

```
kubectl -n kube-system create serviceaccount tiller
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account=tiller
```

Uninstall Tiller

```
kubectl -n kube-system delete deployment tiller-deploy
kubectl delete clusterrolebinding tiller
kubectl -n kube-system delete serviceaccount tiller
```

### Redis

Redis needs to be installed inside the Kubernetes cluster, or reachable from inside Kubernetes. To get started quickly, you may use 
the following Helm Chart

```
helm repo add tc http://trusted-charts.stackpoint.io
helm repo update
helm install tc/redis --name redis --namespace=redis --set usePassword=false 
```

#### GKE allow connection to MemoryStore

```
git clone https://github.com/bowei/k8s-custom-iptables.git
cd k8s-custom-iptables/
TARGETS="IP_RANGE_OF_MEMORYSTORE_REDIS" ./install.sh
```

### MongoDB

If you are deploying a Pro or Enterprise version of Tyk (With Dashboard and or MDCB component), you will need to have
a MongoDB installation installed within the Kubernetes cluster, or reachable from inside Kubernetes. To get started quickly, you may 
use the following Helm Chart.

```
helm repo add tc http://trusted-charts.stackpoint.io
helm repo update
helm install tc/mongodb-replicaset --name mongodb --namespace=mongodb 
```

---

## Installing Kubernetes

Please see the [guide to setting up Tyk on Kubernetes](https://github.com/TykTechnologies/tyk-kubernetes) on Github.

## Tyk Helm Chart

https://github.com/TykTechnologies/tyk-helm-chart

## Tyk Kubernetes Ingress Controller

https://github.com/TykTechnologies/tyk-helm-chart#using-the-ingress-controller

## Tyk as a Service Mesh

https://github.com/TykTechnologies/tyk-helm-chart#using-the-injector

