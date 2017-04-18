---
date: 2017-03-24T11:25:23Z
title: Service Discovery Examples
menu:
  main:
    parent: "Service Discovery"
weight: 0 
---

## <a name="mesosphere"></a> SD: Mesosphere Example

For integrating service discovery with Mesosphere, you can use the following configuration parameters:

```
	isNested = false
	isTargetList = true
	endpointReturnsList = false
	portSeperate = true
	dataPath = "host"
	parentPath = "tasks"
	portPath = "ports"
```

## <a name="eureka"></a> SD: Eureka Example

For integrating service discovery with Eureka, you can use the following configuration parameters (this assumes that the endpoint will return JSON and not XML, this is achieved by creating an API Definition that injects the header that requests the data type and using this API Definition as the endpoint):

```
	isNested = false
	isTargetList = true
	endpointReturnsList = false
	portSeperate = true
	dataPath = "hostName"
	parentPath = "application.instance"
	portPath = "port.$"
```

## <a name="etcd"></a> SD: Etcd Example

For integrating with etcd, you can use the following configurations:

```
	isNested = false
	isTargetList = false
	endpointReturnsList = false
	portSeperate = false
	dataPath = "node.value"
	parentPath = ""
	portPath = ""
```

## <a name="consul"></a> SD: Consul Example

For integrating service discovery with Consul, you can use the following configuration parameters:

```
	isNested = false
	isTargetList = true
	endpointReturnsList = true
	portSeperate = true
	dataPath = "Address"
	parentPath = ""
	portPath = "ServicePort"
```

