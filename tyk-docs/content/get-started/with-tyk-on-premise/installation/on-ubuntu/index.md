---
date: 2017-03-22T15:46:41Z
Title: On Ubuntu
menu:
  main:
    parent: "Installation"
weight: 0
url: "/get-started/with-tyk-on-premise/installation/on-ubuntu"
---

## <a name="ubuntu"></a> Install Tyk API Gateway on Ubuntu

Installing Tyk on Ubuntu is very straightforward, follow the guides and tutorials in this section to have Tyk up and running in no time.

## <a name="prerequisites"></a> Prerequisites

Before installing the Tyk components in the order below, you need to install firstly MongoDb, then Redis.

### Install MongoDb

First import the public key as required by Ubuntu APT

```{.copyWrapper}
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
```

Then create a MongoDb source list file

```{.copyWrapper}
    echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
```

Reload the package database

```{.copyWrapper}
    sudo apt-get update
```


Then run the install script.

```{.copyWrapper}
    sudo apt-get install -y mongodb-org
```

### Install Redis

```{.copyWrapper}
    sudo apt-get install -y redis-server
```


We then recommend installing Tyk in the following order:

* [Dashboard][2]
* [Pump][1]
* [Gateway][3]

[1]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/analytics-pump
[2]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/dashboard
[3]: /docs/get-started/with-tyk-on-premise/installation/on-ubuntu/gateway/