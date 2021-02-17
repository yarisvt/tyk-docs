---
date: 2017-03-22T15:46:41Z
Title: On Ubuntu
menu:
  main:
    parent: "Tyk On-Premises"
weight: 3
url: "/tyk-on-premises/on-ubuntu"
aliases:
  - /getting-started/installation/with-tyk-on-premises/on-ubuntu/

---

{{< tabs_start >}}
{{< tab_start "Ansible" >}}
## Requirements
1. [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html)

## Getting Started
1. clone the [tyk-ansible](https://github.com/TykTechnologies/tyk-ansible) repositry

```bash
$ git clone https://github.com/TykTechnologies/tyk-ansible
```

2. `cd` into the directory
```.bash
$ cd tyk-ansible
```

3. Run initalization script to initialize environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install the following:
- Redis
- MongoDB
- Tyk Dashboard
- Tyk Gateway
- Tyk Pump

```bash
$ ansible-playbook playbook.yml -t tyk-pro -t redis -t mongodb
```

You can choose to not install Redis or MongoDB by removing the `-t redis` or `-t mongodb` respectively.

{{< tab_end >}}

{{< tab_start "Shell" >}}
## Prerequisites

Before installing the Tyk components in the order below, you need to first install Redis and MongoDB.

### Default Ports

| Application             | Port           |
|-------------------------|----------------|
|MongoDB                  |      27017     |
|Redis                    |      6379      |
|**Tyk Dashboard**        |                |
|Developer Portal         |      3000      |
|Admin Dashboard          |      3000      |
|Admin Dashboard API      |      3000      |
|**Tyk Gateway**          |                |
|Management API           |      8080      |

## Getting Started

### Install MongoDB 4.0

You should follow the [online tutorial for installing MongoDb](https://docs.mongodb.com/v4.0/tutorial/install-mongodb-on-ubuntu/). We will be using version 4.0. As part of the Mongo installation you need to perform the following:

1. Import the public key
2. Create a list file
3. Reload the package database
4. Install the MongoDB packages
5. Start MongoDB
6. Check the `mongod` service is running

### Install Redis

```{.copyWrapper}
sudo apt-get install -y redis-server
```

### Install Tyk Dashboard
You can find the tutorial to install `tyk-dashboard` [here](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/dashboard/)

### Install Tyk Gateway
You can find the tutorial to install `tyk-gateway` [here](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/gateway/)

### Install Tyk Pump
You can find the tutorial to install `tyk-pump` [here](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/analytics-pump/)
{{< tab_end >}}
{{< tabs_end >}}

