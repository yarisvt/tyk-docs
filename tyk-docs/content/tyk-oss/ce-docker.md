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
2. Without Docker Compose

## Docker Compose

First, we clone the docker-compose repository

```bash
$ git clone https://github.com/TykTechnologies/tyk-gateway-docker
Cloning into 'tyk-gw-docker-dev-env'...
```

And cd into the directory
```bash
$ cd tyk-gateway-docker
```

And then we run Tyk Gateway and Redis.  We can pass `-d` flag to run the processes in the background.
```bash
$ docker-compose up
```

## Docker Standalone

We can run Tyk and Redis with only Docker as well.

First, Let's create a network and deploy Redis:

```.bash
$ docker network create tyk
ab1084d034c7e95735e10de804fc54aa940c031d2c4bb91d984675e5de2755e7
```

Then we deploy Redis into the network, with the `6379` port open
```.bash
$ docker run -itd --rm --name redis --network tyk -p 127.0.0.1:6379:6379 redis:4.0-alpine
ea54db4da4b228b7868449882062a962f75a7b2d43cdb0ac5205fb4ccdbcde23
```
# Configuring the Gateway

Now that you have the Gateway locally, you will need to grab a configuration file. 

```.bash
$ wget https://raw.githubusercontent.com/TykTechnologies/tyk-gateway-docker/master/tyk.standalone.conf
...
2021-01-28 13:05:22 (6.81 MB/s) - ‘tyk.standalone.conf’ saved [1563/1563]
```

Now we can run the Gateway, mounting the conf file into the container:
```.bash
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  tykio/tyk-gateway:latest
```

We're done! Tyk Gateway is configured and ready to use.

```.bash
$ curl localhost:8080/hello
{"status":"pass","version":"v3.0.3","description":"Tyk GW"}
```

## Sample APIs

You may use example api definitions from [https://github.com/TykTechnologies/tyk/tree/master/apps](https://github.com/TykTechnologies/tyk/tree/master/apps). Store your API configurations inside your local `./apps` directory.

For example, in the above command we hosted our local apps directory into the gateway's apps directory:
```
docker run ... 
    -v $(pwd)/apps:/opt/tyk-gateway/apps
```

We need to place an API definition inside our apps directory so that it's mounted into the Gateway's apps directory.

Then, we reload (or restart) the Gateway

```
$ curl localhost:8080/tyk/reload -H "x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7"
{"status":"ok","message":""}
```

Our Gateway container logs show the reload complete as well:

```
$ docker logs tyk_gateway

...
time="Jan 28 18:11:45" level=info msg="reload: complete" prefix=main
```

**You can find more examples of creatiung Tyk APIs, Policies, keys, and more, by [clicking this link!](/docs/getting-started/tutorials/create-api/)**