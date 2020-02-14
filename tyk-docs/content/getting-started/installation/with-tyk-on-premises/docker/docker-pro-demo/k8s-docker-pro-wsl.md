---
title: Kubernetes Docker Pro Demo on Windows Linux Subsystem
menu:
  main:
    parent: "With Docker"
weight: 3
---

> **NOTE**: Installing Tyk on Kubernetes requires a multi-node Tyk licence. If you are evaluating Tyk on Kubernetes, [contact us](https://tyk.io/about/contact/) to obtain an temporary licence.

> **Warning!** This demo is **NOT** designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [On-Premises](https://tyk.io/api-gateway/on-premise/) solution, which includes our Gateway, Dashboard and analytics processing pipeline.

> This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB.
> This demo is great for proof of concept and demo purposes, but if you want to test performance, you need to move each component to a separate machine.

> **NOTE**: You use this at your own risk. Tyk is not supported on the Windows platform. However you can test it as a proof of concept using our Pro Demo Docker installation.

## Prerequisites

- MS Windows 10 Pro with [Windows Linux Subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10) and [Hyper-V](https://blogs.technet.microsoft.com/canitpro/2015/09/08/step-by-step-enabling-hyper-v-for-use-on-windows-10/) enabled
- [Tyk Helm Chart](https://github.com/TykTechnologies/tyk-helm-chart)
- [minikube](https://minikube.sigs.k8s.io/docs/start/windows/)
- [Kubectl](https://kubernetes.io/docs/reference/kubectl/overview/)
- [Docker Desktop for Windows](https://docs.docker.com/docker-for-windows/install/) running with a signed in [Docker ID](https://docs.docker.com/docker-id/)
- Git for Windows
- PowerShell running as administrator
- Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
- A free Tyk On-Premises [Developer licence](https://tyk.io/product/tyk-on-premises-free-edition/)
- Optional: Ubuntu on Windows

### Step One (Optional) - Delete any old minikube clusters

```{.copyWrapper}
minikube delete
```

### Step Two - Start the minikube cluster

```{.copyWrapper}
minikube start
```

### Step Three - View your running pods

```{.copyWrapper}
kubectl get pods --all-namespaces
```

### Step Four - Update Helm

```{.copyWrapper}
cd C:\Tools\helm_patched\
```

Then

```{.copyWrapper}
helm repo add stable https://kubernetes-charts.storage.googleapis.com
```

Then

```{.copyWrapper}
helm repo update
```

### Step Five - Create and enable your Tiller account

```{.copyWrapper}
kubectl -n kube-system create serviceaccount tiller
```

Then

```{.copyWrapper}
kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller
```

Then

```{.copyWrapper}
helm init --service-account=tiller
```

Then

```{.copyWrapper}
kubectl create namespace tyk-ingress
```

### Step Six - Install MongoDB

```{.copyWrapper}
helm install stable/mongodb --name tyk-mongo  --set "replicaSet.enabled=true" -n tyk-ingress
```

#### Sample Output

> **NOTE**: You get your MongoDB endpoint from the install output (example)

```
# MongoDB can be accessed via port 27017 on the following DNS name from within your cluster:

# tyk-mongo-mongodb.tyk-ingress.svc.cluster.local

#

# To get the root password run:

#

# export MONGODB_ROOT_PASSWORD=$(kubectl get secret --namespace tyk-ingress tyk-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}" | base64 --decode)

#

# To connect to your database run the following command:

#

# kubectl run --namespace tyk-ingress tyk-mongo-mongodb-client --rm --tty -i --restart='Never' --image bitnami/mongodb --command -- mongo admin --host tyk-mongo-mongodb --authenticationDatabase admin -u root -p $MONGODB_ROOT_PASSWORD

#

# To connect to your database from outside the cluster execute the following commands:

#

# kubectl port-forward --namespace tyk-ingress svc/tyk-mongo-mongodb 27017:27017 &

# mongo --host 127.0.0.1 --authenticationDatabase admin -p $MONGODB_ROOT_PASSWORD
```

### Step Seven - Install Redis

```{.copyWrapper}
helm install stable/redis --name tyk-redis --namespace tyk-ingress
```

> **NOTE**: You get your Redis endpoint from the install output (example)

#### Sample Output

```
# Redis can be accessed via port 6379 on the following DNS names from within your cluster:

#

# tyk-redis-master.tyk-ingress.svc.cluster.local for read/write operations

# tyk-redis-slave.tyk-ingress.svc.cluster.local for read-only operations

#

# To get your password run:

#

# export REDIS_PASSWORD=$(kubectl get secret --namespace tyk-ingress tyk-redis -o jsonpath="{.data.redis-password}" | base64 --decode)

#

# To connect to your Redis server:

#

# 1. Run a Redis pod that you can use as a client:

#

# kubectl run --namespace tyk-ingress tyk-redis-client --rm --tty -i --restart='Never'  --env REDIS_PASSWORD=$REDIS_PASSWORD --image docker.io/bitnami/redis:5.0.7-debian-9-r12 -- bash

#

# 2. Connect using the Redis CLI:

# redis-cli -h tyk-redis-master -a $REDIS_PASSWORD

# redis-cli -h tyk-redis-slave -a $REDIS_PASSWORD

#

# To connect to your database from outside the cluster execute the following commands:

#

# kubectl port-forward --namespace tyk-ingress svc/tyk-redis-master 6379:6379 &

# redis-cli -h 127.0.0.1 -p 6379 -a $REDIS_PASSWORD
```

### Step Eight - Amend your Tyk Pro settings

In your Tyk Pro install directory, amend your `values.yaml` file with your Tyk Licence info and MongoDB and Redis endpoint values.

### Step Nine - Get your Redis password and decode as base64

```{.copyWrapper}
kubectl get secret --namespace tyk-ingress tyk-redis -o jsonpath="{.data.redis-password}"
```

### Step Ten - Get your MongoDB password and decode as base64

```{.copyWrapper}
kubectl get secret --namespace tyk-ingress tyk-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}"
```

### Step Eleven - Install Tyk Pro

```{.copyWrapper}
cd C:\Tools\helm_patched\tyk-helm-chart-master\
```

Then

```{.copyWrapper}
helm install ./tyk-pro --values .\values.yaml --namespace tyk-ingress
```

### Step Twelve - Check that all your pods are running

```{.copyWrapper}
kubectl get pods --all-namespaces
```

### Step Thirteen - Get your IP Address and Port

```{.copyWrapper}
minikube ip
```

Then

```{.copyWrapper}
kubectl get --namespace tyk-ingress -o jsonpath="{.spec.ports[0].nodePort}" services dashboard-svc-bold-condor-tyk-pro
```

### Step Fourteen - Replace IP Address and Port

From a Bash shell replace the values with those from **Step Thirteen**.

```{.copyWrapper}
& cd /mnt/c/Tools/helm_patched/tyk-helm-chart-master/tyk-pro/scripts

& ./bootstrap_k8s.sh 192.168.180.72:32037 12345 tyk-ingress
```
