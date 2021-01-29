---
title: "CE on Ubuntu"
date: 2021-01-20
menu:
  main:
    parent: "Tyk Gateway CE"
weight: 4
url: "/tyk-oss/ce-ubuntu/"
---

## Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
*   You have Redis installed and running

```{.copyWrapper}
sudo apt-get install -y redis-server
```

## Installation

First import the public key as required by Ubuntu APT

```{.copyWrapper}
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

### Run Installation Scripts via our PackageCloud Repositories

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your Ubuntu version. We have packages for the following:
 * Xenial
 * Trusty
 * Precise

* Via Quick Installation Instructions. You can use: 
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-deb)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

### Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file.

{{< note success >}}
**Note**  

You need to replace `<hostname>` for `--redishost=<hostname>` with your own value to run this script.
{{< /note >}}


```{.copyWrapper}
sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=<hostname> --redisport=6379 --domain=""
```

What you've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=<hostname>`: The hostname for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, you don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```{.copyWrapper}
sudo service tyk-gateway start
```

## Next Steps Tutorials

Follow the Tutorials on the Community Edition tabs for the following:

1. [Add an API](/docs/getting-started/tutorials/create-api/)
2. [Create a Security Policy](/docs/getting-started/tutorials/create-security-policy/)
3. [Create an API Key](/docs/getting-started/tutorials/create-api-key/)