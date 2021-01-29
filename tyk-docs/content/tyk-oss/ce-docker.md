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

First, you clone the docker-compose repository

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

You can run Tyk and Redis just using Docker as well.

First, Let's create a network and deploy Redis:

```.bash
$ docker network create tyk
ab1084d034c7e95735e10de804fc54aa940c031d2c4bb91d984675e5de2755e7
```

Then you deploy Redis into the network, with the `6379` port open
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

Now you can run the Gateway, mounting the conf file into the container:
```.bash
$ docker run \
  --name tyk_gateway \
  --network tyk \
  -p 8080:8080 \
  -v $(pwd)/tyk.standalone.conf:/opt/tyk-gateway/tyk.conf \
  -v $(pwd)/apps:/opt/tyk-gateway/apps \
  tykio/tyk-gateway:latest
```

You're done! Your Tyk Gateway is configured and ready to use.

```.bash
$ curl localhost:8080/hello
{"status":"pass","version":"v3.0.3","description":"Tyk GW"}
```

## Sample APIs

You may use example api definitions from [https://github.com/TykTechnologies/tyk/tree/master/apps](https://github.com/TykTechnologies/tyk/tree/master/apps). Store your API configurations inside your local `./apps` directory.

For example, in the above command you hosted your local apps directory into the gateway's apps directory:
```
docker run ... 
    -v $(pwd)/apps:/opt/tyk-gateway/apps
```

You need to place an API definition inside your apps directory so that it's mounted into the Gateway's apps directory.

Then, you reload (or restart) the Gateway

```
$ curl localhost:8080/tyk/reload -H "x-tyk-authorization: 352d20ee67be67f6340b4c0605b044b7"
{"status":"ok","message":""}
```

The Gateway container logs show the reload as complete as well:

```
$ docker logs tyk_gateway

...
time="Jan 28 18:11:45" level=info msg="reload: complete" prefix=main
```

## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API](/docs/getting-started/tutorials/create-api/)
2. [Create a Security Policy](/docs/getting-started/tutorials/create-security-policy/)
3. [Create an API Key](/docs/getting-started/tutorials/create-api-key/)

## Domains with the Tyk Gateway

The Tyk Gateway has full domain support built-in, so you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.