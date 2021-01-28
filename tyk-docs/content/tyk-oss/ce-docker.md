---
title: "CE on Docker"
date: 2021-01-20
menu:
  main:
    parent: "Tyk Gateway CE"
weight: 1
url: "/tyk-oss/ce-docker/"

---

We will show you two methods of installing our Community Edition Gateway on Docker:

1. With Docker Compose
2. With our official Docker Container

## Docker Compose

First, we clone the docker-compose repository

```bash
$ git clone https://github.com/sedkis/tyk-gw-docker-dev-env
Cloning into 'tyk-gw-docker-dev-env'...

$ cd tyk-gw-docker-dev-env 
```

And then we run Tyk Gateway and Redis.  We can pass `-d` flag to run the processes in the background.
```bash
$ docker-compose up
```

When we're done, we can remove Tyk and Redis, along with associated volumes, with `docker-compose`:
```bash
$ docker-compose down -v
```

## Docker Container

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
# Configuring the Gateway

Now that you have the Gateway locally, you will need to grab a configuration file. You may use `tyk.standalone.conf` from [https://github.com/TykTechnologies/tyk-gateway-docker](https://github.com/TykTechnologies/tyk-gateway-docker) as a base template using the appropriate version for your use-case.

See [Gateway Configuration Options](/docs/tyk-configuration-reference/tyk-gateway-configuration-options/) for more details on configuring your Gateway.

{{< note success >}}
**Note**  

You should set the Gateway secret in the TYK_GW_SECRET environment variable. If you do not, the entry point script will attempt to set `TYK_GW_SECRET` environment variable from the value of the secret in `tyk.conf`.

`TYK_GW_SECRET=foo`
{{< /note >}}

## Sample APIs

You may use example api definitions from [https://github.com/TykTechnologies/tyk/tree/master/apps](https://github.com/TykTechnologies/tyk/tree/master/apps). Store your API configurations inside your local `./apps` directory.

## Starting the Gateway

Run the following command:

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


