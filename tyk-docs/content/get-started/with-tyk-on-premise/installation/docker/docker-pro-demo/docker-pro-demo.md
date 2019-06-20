---
date: 2017-03-22T16:54:02Z
title: Docker Pro Demo
menu:
  main:
    parent: "With Docker"
weight: 1

---

## Get Started with Docker & Tyk API Gateway

> **Warning!** This demo is **NOT** designed for production use or performance testing. The Tyk Pro Docker Demo is our full, [On-Premises](https://tyk.io/api-gateway/on-premise/) solution, which includes our Gateway, Dashboard and analytics processing pipeline.
This demo will run Tyk On-Premises on your machine, which contains 5 containers: Tyk Gateway, Tyk Dashboard, Tyk Pump, Redis and MongoDB.
This demo is great for proof of concept and demo purposes, but if you want to test performance, you need to move each component to a separate machine.

## Prerequisites

* Our Pro Demo Docker [GitHub repo](https://github.com/TykTechnologies/tyk-pro-docker-demo)
* A free Tyk On-Premises [Developer licence](https://tyk.io/product/tyk-on-premises-free-edition/)

### Step One - Clone the Repo

Clone the repo above to a location on your machine.

### Step Two - Edit your hosts file

You need to add the following to your hosts file:

```{copy.Wrapper}
127.0.0.1 www.tyk-portal-test.com
127.0.0.1 www.tyk-test.com
```

### Step Three - Add your Developer Licence

You should have received your free developer licence via email. Copy the licence key in the following location from your `/confs/tyk_analytics.conf` file:

```
"license_key": ""
```

### Step Four - Run the Docker Compose File

Run the following command from your installation folder:

```{copy.Wrapper}
docker-compose -f docker-compose.yml -f docker-local.yml up
```

This will will download and setup the five Docker containers. This may take some time and will display all output.

### Step Five - Test the Tyk Dashboard URL

Go to:

```{copy.Wrapper}
127.0.0.1:3000
```

You should get to the Tyk Dashboard login screen:

![Tyk Dashboard Login Screen][1]

### Step Six - Bootstrap the Tyk Installation

This will create the following:

* An Organisation
* A User
* A Password for the User
* A Catalogue for your Deveolper Portal
* A default Home page for your Developer Portal
* The URL for your Developer Portal


Run the following command from the installation directory:

```
chmod +x setup.sh 
./setup.sh
```


### Step Seven - Login to the Dashboard

You can now log in to the Tyk Dashboard from `127.0.0.1:3000`, using the username and password created by the setup script:





[1]: /docs/img/dashboard/system-management/dashboard_login.png