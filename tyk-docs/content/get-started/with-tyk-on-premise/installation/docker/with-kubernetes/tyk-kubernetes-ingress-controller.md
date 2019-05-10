---
title: Tyk Kubernetes Ingress and Service Mesh Controller 
menu:
  main:
    parent: "With Docker"
weight: 2
---



Tyk has a dedicated Kubernetes controller that enables you to use Tyk in two ways:

1. As a traditional ingress controller (yes, even supporting TLS certificates) to manage your north-south traffic
2. As a service mesh controller to manage your east-west traffic between services

In this article we will cover:

1. How the controller works and how to use it for ingress
2. How to install Tyk as an Ingress controller if you are using our community edition
3. How to install Tyk as an Ingress controller for our Tyk Pro edition
4. How to install Tyk as a Service Mesh controller for our Tyk Pro edition
5. How to use the service mesh features of the controller

## Installation: Prep

```
# Fetch the repository
git clone https://github.com/TykTechnologies/tyk-helm-chart.git
cd tyk-helm-chart

# Install redis and mongoDB (not strictly required for CE, but we do pump analytics there in both installations)
helm repo add tc http://trusted-charts.stackpoint.io
helm repo update
helm install tc/redis --name redis --namespace=redis --set usePassword=false
helm install tc/mongodb-replicaset --name mongodb --namespace=mongodb 
```

## Installation: Community Edition

To install, *first modify the `values_community_edition.yaml` file to add Redis and MongoDB details*, the defaults will work if you installed Redis and MongoDB as described in the Prep section.

Then run the chart:

	helm install -f ./values_community_edition.yaml ./tyk-headless

> *Important Note regarding TLS:* This helm chart assumes TLS is being used by default, so the gateways will listen on port 443 and load up a dummy certificate. You can set your own default certificate by replacing the files in the certs/ folder.

### Overview of the Community Edition Configuration

The way the Community Edition is installed as an ingress controller is by running the Gateways in CE mode (no Dashboard configuration), and adding the Tyk K8s controller as a side-car to these pods. When an update is detected in the K8s API, all the controllers will convert the ingress spec into an API definition and push it into the Gateway via the Gateway REST API. 

This API is *not exposed* outside of the pod, the only way to interact with the gateway REST API is to use the `kubectl port-forward` feature. See [Accessing the Tyk Gateway API](#Accessing the Tyk Gateway API) for an example

The Gateway will still use a TLS certificate, however this will be unsigned. To use a signed certificate you will need to supply one as per the note above.

If you haven't used Tyk before, when you generate API tokens or other credentials using the Tyk Gateway REST API, you can do this against any of the pods, since this data is stored and centralised in Redis.

## Installation: Pro Edition

To install, *first modify the `values.yaml` file to add Redis and MongoDB details, and add your license*. You can generate a single-node dev license on our website (warning, this will not work well with a Kubernetes cluster since only one of the Gateways will be able to register itself):

	helm install -f ./values.yaml ./tyk-pro

The installation will bring up some detailed notes, the notes enable the installation of the actual Tyk K8s controller. We'll walk through these commands below.

> **NOTE**: These are samples - cutting and pasting these will not work

```
export NODE_PORT=$(kubectl get --namespace {{ silly-cannibal }} -o jsonpath="{.spec.ports[0].nodePort}" services dashboard-svc-silly-cannibal)
export NODE_IP=$(kubectl get nodes --selector=kubernetes.io/role!=master -o jsonpath='{.items[0].status.addresses[?(@.type=="ExternalIP")].address}')
export DASH_URL=http://$NODE_IP:$NODE_PORT
```

These commands will fetch the service IP and address of the Tyk Dashboard. We will use this to set up the Tyk K8s controller with the following commands:

### Setting up the Tyk Kubernetes Controller

The following commands set up the Tyk K8s controller.

#### Bootstrap the Dashboard

```
./tyk-pro/scripts/bootstrap_k8s.sh $NODE_IP:$NODE_PORT {{ .Values.secrets.AdminSecret }} {{ .Values.nameSpace }}
```

This command will "bootstrap" the Dashboard, since you do not have an initial username, password or organisation. The command will output all you need, so make sure you retain this information!

This command will also generate a secret which the controller needs in order to install and run properly. We move it using the next command:

```
mv ./tyk-pro/scripts/secrets.yaml ./tyk-k8s/templates
```

#### Generate a Certificate for the Sidecar Injector (optional)

This command is only required if you are using the service mesh capability and the sidecar injector. If you are using this, then you need to generate a certificate for the mutating webhook that enables the sidecar injector to work:

```
./tyk-k8s/webhook/create-signed-cert.sh -n {{ .Values.nameSpace }}
cat ./tyk-k8s/webhook/mutatingwebhook.yaml | ./tyk-k8s/webhook/webhook-patch-ca-bundle.sh > ./tyk-k8s/webhook/mutatingwebhook-ca-bundle.yaml
```

#### Install the Controller

```
helm install -f ./values.yaml ./tyk-k8s
```

### Installation: Service Mesh

If you want to manage both north-south and east-west traffic, then you will need to perform this command:

```
kubectl create -f ./tyk-k8s/webhook/mutatingwebhook-ca-bundle.yaml
```

This installs the mutating webhook, i.e. it will tell your cluster to pass all deployments to the controller for parsing. If a deployment is detected that should be managed, then the controller will modify the deployment to inject the sidecar and orchestrate the route creation for Tyk to be the intermediary between your services.

## How the Controller Works

The Tyk Kubernetes Controller is a separate process that runs inside your Kubernetes cluster and interfaces with the Kubernetes API. It is not part of the Gateway, or the Tyk Dashboard if you are a Tyk Pro user.

The controller has two key components:
1. An ingress manager
2. A service mesh webhook listener

When Tyk is first installed via the Helm Chart, it will install itself as a DaemonSet and acquire a random node-port for its service. The service is exposed as an External Load Balancer, which will trigger your cloud environment to provision one and add the exposed Tyk Gateways to it's backend list.

This means that the Gateways are now exposed to the outside of your cluster through a load balancer provisioned by your cloud environment.

These external-facing Gateways are tagged, or "sharded" in Tyk terminology. This means that they will only ever load API Definitions for services that have been defined and tagged with the same tag name. The tag-name for the ingress Gateways are (unimaginatively) tagged as "ingress". This is worth remembering if you ever create a service route manually using the Tyk Gateway API or the Tyk Dashboard API Designer.

At this point, the controller cannot act as a service mesh controller. To get this to work you need to add the mutating webhook definition that allows these events to be processed by the controller.

### The Ingress Controller

The manager listens for events from the Kubernetes service API for the creation or deletion of ingress specs. When an ingress spec is detected, the controller will check whether it is responsible for handling it, and if it is, processes the hostnames, paths and TLS certificate entries.

For hostnames and paths, it will generate individual API Definitions (the internal structure used by the Gateway to hold all information related to managing a service) for each unique path. These API Definitions are then pushed into the Tyk APIs to be managed. These API Definitions are also automatically tagged with the "ingress" tag so they are guaranteed to be loaded.

We say "Tyk APIs" because - depending on your deployment (Pro or CE) - it will use either the Dashboard or the Gateway API, which are subtly different. This should all be transparent to you as the end user, but under the hood, Tyk tries to be clever about how to interact with the Gateway.

For each certificate it finds, it will pull this from the K8s secure store and push it into the Tyk certificate store. This is also encrypted, and is shared between all Gateways.

When a pod  or ingress is deleted, the ingress manager will detect this deletion event and subsequently try to remove the route from the ingress gateways.

#### What can you do with the Ingress Controller?

The ingress controller enables you to work with standard Kubernetes ingress specifications, and utilise annotations and templates to define options around how your services are exposed. Nearly all settings exposed in the Tyk API Definition can be set via an annotation. However, for repeatability and more structured configuration management we recommend the use of templates

##### Enabling Ingress to use Tyk as the Ingress Controller

To enable the ingress option is very straight forward and the uses the standard way to enable any kind of custom ingress. You classify it using the `kubernetes.io/ingress.class` annotation and setting it to `tyk`, like below:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: cafe-ingress
  annotations:
    kubernetes.io/ingress.class: tyk
spec:
  rules:
  - host: cafe.example.com
    http:
      paths:
      - path: /tea
        backend:
          serviceName: tea-svc
          servicePort: 80
```

If we then push this ingress definition to Kubernetes, you will find a new service in your Tyk Pro API Dashboard, or in the API list if you are using the Tyk Community Edition API.

#### Transport Layer Security (TLS)

Both the Community Edition and Pro edition fully support certificates defined via ingresses. If the controller detects a TLS certificate for a specific host, it will request it from the Kubernetes API and push it to Tyk's encrypted certificate store. You will be able to view the metadata for these certificates in the Certificate Manager of the Tyk Dashboard and manipulate them with the relevant Tyk APIs.

#### Accessing the Tyk Gateway API

To get access to the Gateway itself the best thing to do is to use a port-forward on your client machine, as it isn't available outside of the cluster:

```
# First port-forward into one of the gateway pods
kubectl port-forward pod/gateway-tyk-headless-HASH 9696 --namespace tyk
Forwarding from 127.0.0.1:9696 -> 9696
Forwarding from [::1]:9696 -> 9696
```

Then query the Tyk Gateway API In a different terminal:

```
# List the APIs in your gateways:
http --verify=no get https://localhost:9696/tyk/apis x-tyk-authorization:$KEY | jq '.[] .name'

# You should see something like this:
"cafe-ingress:tea-svc #ingress"
"Tyk Test API"
```

Pro edition users can visit their Dashboard API List page to see the same listings there or interact with the Dashboard API directly. This does not require a port forward unless the API port has been changed.

#### Modifying how your Services Behave

The ingress controller will build services against a Tyk API Definition that is defined as "open" by default. This won't be what you want most of the time, and there are three ways to modify how the API will behave: 

1. Using annotations
2. Using a template 
3. A combination of annotations and a template

##### Annotations

In order to make full use of the annotations, it's important to familiarise yourself with how Tyk API Definitions are structured. There are *many* options you can set in order to get different behaviour, and the annotations that are supplied by the ingress controller provide a way to set values directly in the generated JSON of the Tyk API Definition. We recommend using annotations for maybe one or two settings only. If you find yourself using them for more it may be worth making use of templates.

The annotations that are provided are basically setters, and are set to specific types (such as string, bool, int etc.), below is a list of the annotations, their purpose, and an example:

**Annotation**

`bool.service.tyk.io/{path}`

**Purpose**

Set a value to `"true"` or `"false"`

**Example**

`bool.service.tyk.io/use-keyless": "false"`

**Annotation**

`string.service.tyk.io/{path}`

**Purpose**

Set a value that is a string literal, e.g. "name"

**Example**

`string.service.tyk.io/proxy.target-url": "http://foo.bar/bazington"`

**Annotation**

`num.service.tyk.io/{path}`

**Purpose**

Set a value that is a number (assumes an int)

**Example**

`num.service.tyk.io/cache_options.cache-timeout": "20"`

**Annotation**

`object.service.tyk.io/{path}`

**Purpose**

Set a whole JSON object

**Example**

`object.service.tyk.io/version_data.versions.Default.extended-paths": '{"hard_timeouts":[{"path":"{all}","method":"GET","timeout":60,"fromDashboard":true}]}'`



#### Fully Worked Example:

We can use the above examples all together to switch a service from being open to being protected by an API key. It also sets the cache timeout to 20 seconds and overrides the upstream target URL to be outside of the cluster:

```
apiVersion: extensions/v1beta1
	kind: Ingress
	metadata:
	  name: cafe-ingress
	  annotations:
	    kubernetes.io/ingress.class: tyk
	    bool.service.tyk.io/use-keyless": "false",
		string.service.tyk.io/proxy.target-url": "http://foo.bar/bazington",
		num.service.tyk.io/cache_options.cache-timeout": "20",
		object.service.tyk.io/version_data.versions.Default.extended-paths": '{"hard_timeouts":[{"path":"{all}","method":"GET","timeout":60,"fromDashboard":true}]}',
	spec:
	  rules:
	  - host: cafe.example.com
	    http:
	      paths:
	      - path: /tea
	        backend:
	          serviceName: tea-svc
	          servicePort: 80
	      - path: /coffee
	        backend:
	          serviceName: coffee-svc
	          servicePort: 80
```

As you can see though, this mechanism could be prone to human error, and you would need to pull the logs from the tyk-k8s pod in order to see any parser violations or issues with the API Definition that gets generated. For a more robust approach, especially in a larger service ecosystem, it's very likely you'll want to use the same authentication type across all of your ingresses (or you may use multiple types, so have one template for each).


##### Templates

Working with templates is very simple, however it does mean these template files need to be available to the controller. Adding them will require a redeployment of the tyk-k8s pod. First, you need to modify the config map for the Kubernetes controller:

```
# Opens vim with the configuration, you can edit this and save it to update the config map on the cluster

kubectl edit configmap tyk-k8s-conf --namespace tyk
```

Once it is open, you need to set a location for the templates:

```
	### configmap-tyk-k8s.yaml

	Tyk:
      url: "..."
      secret: "..."
      org_id: "..."

      # Add this line
      templates: "/etc/tyk-k8s-templates" 
```

Templates are added as config maps. To convert an API definition to a template, simply encapsulate it in template tags, like this:

```
{{ define "tokenAuth"}}
{
  "name": "{{.Name}}{{ range $i, $e := .GatewayTags }} #{{$e}}{{ end }}",
  ...
}
{{ end }}
```

Once you have created them, add the to the namespace as config maps:

```
kubectl create configmap token_auth.html --from-file=token_auth.html=token_auth.html --namespace tyk
```

The last thing to do is to make sure they are available to the Tyk controller, and to ensure it picks up the new configuration. To do this you'll need to edit the deployment. If you are using the Tyk Community Edition, you will need to redeploy with the helm chart (as all gateways need to be updated) by editing the `deployment-tyk-k8s.yaml` file like so:

```
	### --- there's other stuff up here

	spec:
	  {{ if .Values.rbac }}serviceAccountName: tyk-k8s {{ end }}
	  containers:
	  - name: tyk-k8s
	    image: "{{ .Values.tyk_k8s.image.repository }}:{{ .Values.tyk_k8s.image.tag }}"
	    imagePullPolicy: {{ .Values.tyk_k8s.image.pullPolicy }}
	    workingDir: "/opt/tyk-k8s"
	    command: ["/opt/tyk-k8s/tyk-k8s", "start"]
	    ports:
	    - containerPort: 443
	    volumeMounts:
	      - name: tyk-k8s-conf
	        mountPath: /etc/tyk-k8s
	      - name: webhook-certs
	        mountPath: /etc/tyk-k8s/certs

	      ### Custom templates:
	      - name: tyk-k8s-templates
	        mountPath: /etc/tyk-k8s-templates
	    resources:
	{{ toYaml .Values.resources | indent 12 }}
	  volumes:
	    - name: tyk-k8s-conf
	      configMap:
	        name: tyk-k8s-conf
	        items:
	          - key: tyk_k8s.yaml
	            path: tyk-k8s.yaml

	    ### Custom templates:        
	    - name: tyk-k8s-templates
	      configMap:
	        name: tyk-k8s-templates
	        items:
	          - key: template1.yaml # these should be real filenames
	            path: template1.yaml
```

The sections to edit are the `volumeMounts` section and the `volumes` section. Once you've saved and deployed that, the controller will make those templates available and you will be able to target them in your ingress definition using the template annotation:

```
	apiVersion: extensions/v1beta1
	kind: Ingress
	metadata:
	  name: cafe-ingress
	  annotations:
	    kubernetes.io/ingress.class: tyk
	    template.service.tyk.io/: tokenAuth
	spec:
	  rules:
	  - host: cafe.example.com
```
  
Notice that the value of the template annotation matches the name of the template that you set in the wrapper of the template file, not the file name!

#### Using Tyk for your Service Mesh

The service mesh capability is only supported by the Tyk Pro edition at the moment. We are working on making a version that works with the Community Edition (it is not a technical limitation, just an operational one). 

Getting Tyk to manage between-services traffic is very simple, all you need to do is tag your deployment with the appropriate annotation, like below:

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: sleep
spec:
  replicas: 1
  template:
    metadata:
      annotations:
        injector.tyk.io/inject: "true"
        injector.tyk.io/route: "/sleep"
      labels:
        app: sleep
    spec:
      containers:
      - name: sleep
        image: tutum/curl
        command: ["/bin/sleep","infinity"]
        imagePullPolicy: IfNotPresent
```

The two annotations are pretty straightforward:

| Annotation               | Purpose                                                                                                |
|--------------------------|--------------------------------------------------------------------------------------------------------|
| `injector.tyk.io/inject` | Set to `"true"` to have the injector manage this deployment                                            |
| `injector.tyk.io/route`  | Set the internal service name to use to access this service from other applications inside the cluster |

When you push this service into the cluster, it will automatically add the sidecar, configure it and add the relative ingress and egress routes to the Tyk routing table.

#### Services Generated by the Controller for Service Mesh

For each deployment, the controller will generate two API definitions:

1. The ingress API Definition for the service. This is loaded *only* by the proxy that is attached as a sidecar to the service
2. The egress API definition for the service. This is loaded by all Gateways in the mesh and makes the service usable from requesting services

Tyk will collect analytics information for each of these services and they will also be visible in the Tyk Dashboard if you wish to drill down or modify the behaviour of a service.

If you delete a deployment from the cluster, the controller will detect and remove the relevant routes from the Tyk Gateways so they are no longer available.

You can use all of the annotations for the ingress controller in the service mesh injected containers. To to add additional properties, or utilise templates you can simply annotate your deployments.

#### Mutual TLS

Mutual TLS is supported by Tyk, however the mesh does not auto-generate these certificates yet and they need to be added manually through the Dashboard. This functionality is coming soon.
