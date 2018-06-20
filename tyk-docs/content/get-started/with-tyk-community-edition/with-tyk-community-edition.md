---
date: 2017-03-15T15:01:42Z
title: With Tyk Community Edition
menu: 
  main:
    parent: "Get started"
weight: 6
url: "/get-started/with-tyk-community-edition"
---

## <a name="what-is-tyk-community-edition"></a>What is Tyk Community Edition?


Tyk Community Edition is the open-source API Gateway that is developed by our community and supported by our community members and advocates (with some help from the Tyk Technologies team). The Tyk Community Edition is an On-Premises install that consists of:

* [The Tyk API Gateway](https://tyk.io/docs/concepts/tyk-components/gateway/): Tyk's API Gateway that manages your APIs.
* [The Tyk Pump](https://tyk.io/docs/concepts/tyk-components/pump/): Tyk's analytics data sink, used to send analytics data to platforms such as StatsD, ElasticSearch and InfluxDB.
* [The Tyk Identity Broker](https://tyk.io/docs/concepts/tyk-components/identity-broker/): Tyk's third-party IDP integration service.

>Note: The Tyk Dashboard is not available for this edition.

#### Pro Tip: Domains with Tyk Gateway

Tyk Gateway has full domain support built-in, you can:

*   Set Tyk to listen only on a specific domain for all API traffic.
*   Set an API to listen on a specific domain (e.g. api1.com, api2.com).
*   Split APIs over a domain using a path (e.g. api.com/api1, api.com/api2, moreapis.com/api1, moreapis.com/api2 etc).
*   If you set a hostname for the Gateway, then all non-domain-bound APIs will be on this hostname + the `listen_path`.

## <a name="prerequisites"></a>Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
*   You have MongoDB installed and running.
*   You have Redis installed and running

## <a name="install-on-ubuntu"></a>Installing on Ubuntu

### Install MongoDb 3.2

First import the public key as required by Ubuntu APT

```{.copyWrapper}
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

Then create a MongoDb source list file

**On Ubuntu Trusty 14.04**

```{.copyWrapper}
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

**On Ubuntu Xenial 16.04**

```{.copyWrapper}
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
```

Reload the package database

```{.copyWrapper}
sudo apt-get update
```

Then run the install script.

```{.copyWrapper}
sudo apt-get install -y mongodb-org
```

Finally, start the MongoDB service - then ensure all is running.

**On Ubuntu Trusty 14.04**

```
# sudo service mongod start
# sudo service mongod status
mongod start/running, process 1904
```

**On Ubuntu Xenial 16.04**

```
# sudo service mongod start
# sudo service mongod status
● mongod.service - High-performance, schema-free document-oriented database
   Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor preset: enabled)
   Active: active (running) since Fri 2018-04-27 17:47:45 UTC; 5s ago
     Docs: https://docs.mongodb.org/manual
 Main PID: 1751 (mongod)
    Tasks: 23
   Memory: 168.7M
      CPU: 1.416s
   CGroup: /system.slice/mongod.service
           └─1751 /usr/bin/mongod --config /etc/mongod.conf

Apr 27 17:47:45 ubuntu-s-1vcpu-2gb-lon1-01 systemd[1]: Started High-performance, schema-free document-o
```

### Install Redis

```{.copyWrapper}
sudo apt-get install -y redis-server
```



### Run Installation Scripts

#### Install the Tyk Pump First

From [https://packagecloud.io/tyk/tyk-pump](https://packagecloud.io/tyk/tyk-pump) you have the following options:

* Via the correct package for your Ubuntu version. We have packages for the following:
 * Xenial
 * Trusty
 * Precise

* Via Quick Installation Instructions. You can use: 
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-pump/install#manual-deb)
 * [Chef](https://packagecloud.io/tyk/tyk-pump/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-pump/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-pump/ci)

#### Install the Gateway

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

### <a name="configure-tyk-community-edition"></a>Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file. To get things started, run:
```{.copyWrapper}
    sudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=localhost --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=localhost`: Use the hostname `localhost` for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, we don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this commannd to start the Tyk Gateway:
```{.copyWrapper}
    sudo service tyk-gateway start
```

## <a name="installing-on-redhat-centos"></a>Installing on RedHat (RHEL) / Centos

### Prerequisites

*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
*   EPEL (Extra Packages for Enterprise Linux) is a free, community based repository project from Fedora which provides high quality add-on software packages for Linux distribution including RHEL, CentOS, and Scientific Linux. EPEL isn't a part of RHEL/CentOS but it is designed for major Linux distributions. In our case we need it for Redis DB. Install EPEL using the instructions [here](http://fedoraproject.org/wiki/EPEL#How_can_I_use_these_extra_packages.3F).
*   Install MongoDB
*   Install Redis using EPEL
*   Tyk requires Python 3.4. Install via the following command:

```{.copyWrapper}
sudo yum install python34
```

### Install MongoDB

Create a `/etc/yum.repos.d/mongodb-org-3.0.repo` file so that you can install MongoDB directly, using yum.
```{.copyWrapper}
[mongodb-org-3.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/3.0/x86_64/
gpgcheck=0
enabled=1
```

Then, to install both MongoDB and Redis.

```{.copyWrapper}
sudo yum install -y mongodb-org redis
```

*(you may be asked to accept the GPG key for our repos and when the package installs, hit yes to continue)*

### Start MongoDB and Redis

In many cases MongoDB or Redis might not be running, so let's start that:
```{.copyWrapper}
sudo service mongod start
sudo service redis start
```

### Run Installation Scripts

#### Install the Tyk Pump First

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-pump) you have the following options:

* Via the correct package for your RHEL version. We have packages for the following:
 * RHEL 7
 * RHEL 6
 
* Via Quick Installation Instructions. You can use:
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-pump/install#manual-rpm)
 * [Chef](https://packagecloud.io/tyk/tyk-pump/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-pump/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-pump/ci)


#### Install the Gateway

From [https://packagecloud.io/tyk/tyk-gateway](https://packagecloud.io/tyk/tyk-gateway) you have the following options:

* Via the correct package for your RHEL version. We have packages for the following:
 * RHEL 7
 * RHEL 6
 
* Via Quick Installation Instructions. You can use:
 * [Manual Instructions](https://packagecloud.io/tyk/tyk-gateway/install#manual-rpm)
 * [Chef](https://packagecloud.io/tyk/tyk-gateway/install#chef)
 * [Puppet](https://packagecloud.io/tyk/tyk-gateway/install#puppet)
 * [CI and Build Tools](https://packagecloud.io/tyk/tyk-gateway/ci)

### <a name="configure-tyk-community-edition"></a>Configuring The Gateway 

You can set up the core settings for the Tyk Gateway with a single setup script, however for more involved deployments, you will want to provide your own configuration file. To get things started, run:
```{.copyWrapper}
    ssudo /opt/tyk-gateway/install/setup.sh --listenport=8080 --redishost=localhost --redisport=6379 --domain=""
```

What we've done here is told the setup script that:

*   `--listenport=8080`: Listen on port `8080` for API traffic.
*   `--redishost=localhost`: Use the hostname `localhost` for Redis.
*   `--redisport=6379`: Use port `6379` for Redis.
*   `--domain=""`: Do not filter domains for the Gateway, see the note on domains below for more about this.

In this example, we don't want Tyk to listen on a single domain. It is recommended to leave the Tyk Gateway domain unbounded for flexibility and ease of deployment.

### Starting Tyk

The Tyk Gateway can be started now that it is configured. Use this command to start the Tyk Gateway:
```{.copyWrapper}
sudo service tyk-gateway start
```