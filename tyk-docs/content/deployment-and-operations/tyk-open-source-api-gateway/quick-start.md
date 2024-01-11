---
title: "Quick Start"
date: 2023-07-25
weight: 1
tags: ["Deployment and Operations", "Open Source", "API Gateway", "Tyk OSS"]
description: "Quick start guide for the Tyk Open Source API Gateway"
---

We’ll install Tyk and test it's live in less than 2 minutes.

We recommend [Tyk Gateway docker compose](https://github.com/TykTechnologies/tyk-gateway-docker) as the quickest way to get started. Later, you can move to one of our other supported distributions if you prefer.

**Step 1 - Clone the docker-compose repository**
```
git clone https://github.com/TykTechnologies/tyk-gateway-docker
```

**Step 2 - Change to the new directory**
```
cd tyk-gateway-docker
```

**Step 3 - Deploy Tyk Gateway and Redis**
```
docker-compose up
```

You can also run this in detached mode using the _-d_ flag:

```
docker-compose up -d
```

Congratulations, you’re done!!!

## Test Installation

Your Tyk Gateway is now configured and ready to use. Confirm this by checking against the ‘hello’ endpoint:

```curl
curl localhost:8080/hello
```

The output should be similar to that shown below:
```json
{"status": "pass", "version": "v5.1", "description": "Tyk GW"}
```

## Virtual Deployment
[Killercoda](https://killercoda.com/about) gives you instant access to a real Linux or Kubernetes command-line environment via your browser. 
You can try this [Killercoda Tyk scenario](https://killercoda.com/tyk-tutorials/scenario/Tyk-install-OSS-docker-compose) to walk through the installation of our Open Source Gateway using Docker Compose (the exact same flow shown above).

## Next Steps

Next, [add your first API to Tyk ]({{< ref "getting-started/create-api" >}}) and follow the *Open Source* instructions.
