---
title: "Community Edition on Docker"
date: 2021-01-20
menu:
  main:
    parent: "Tyk Open Source"
weight: 1
url: "/tyk-oss/ce-docker/"

---

First, Let's create a network and deploy Redis:

```bash
$ docker network create tyk
ab1084d034c7e95735e10de804fc54aa940c031d2c4bb91d984675e5de2755e7
```

```
$ docker pull redis:4.0-alpine
4.0-alpine: Pulling from library/redis
....
docker.io/library/redis:4.0-alpine

$ docker run -itd --rm --name redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
ea54db4da4b228b7868449882062a962f75a7b2d43cdb0ac5205fb4ccdbcde23
```

Now we can deploy the Gateway
```bash
$ docker pull tykio/tyk-gateway:latest

$ TYK_GW_SECRET=foo

$ docker run -d \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  tykio/tyk-gateway:latest
```