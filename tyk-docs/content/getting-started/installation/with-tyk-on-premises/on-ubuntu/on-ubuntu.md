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
<br />
{{< note >}}
**Requirements**

[Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk with shell is in the <b>Shell</b> tab.
{{< /note >}}

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

You can choose to not install Redis or MongoDB by removing the `-t redis` or `-t mongodb` respectively. However Redis and MongoDB are a requirment and need to be installed for the Tyk Pro to run.

{{< tab_end >}}
{{< tab_start "Shell" >}}
<br />
{{< note >}}
**Requirements**

Before installing the Tyk components in the order below, you need to first install Redis and MongoDB.
{{< /note >}}

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

```bash
sudo apt-get install -y redis-server
```

## Install Tyk API Gateway on Ubuntu

Installing Tyk on Ubuntu is very straightforward using our APT repositories, follow the guides and tutorials in this section to have Tyk up and running in no time.

The suggested order would be to install Tyk Dashboard, then Tyk Pump and then Tyk Gateway for a full stack.

- [Dashboard](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/dashboard/)
- [Pump](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/analytics-pump/)
- [Gateway](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/gateway/)
{{< tab_end >}}
{{< tabs_end >}}

## Database Support

### Tyk Gateway

By default the Tyk Gateway uses MongoDB. You can also use the following:

* [DocumentDB](https://aws.amazon.com/documentdb/)
* [Azure Cosmos DB](https://docs.microsoft.com/en-us/azure/cosmos-db/introduction)

{{< note success >}}
**Note**  

If you are using DocumentDB, [capped collections](/docs/analytics-and-reporting/capping-analytics-data-storage/) are not supported. See [here](https://docs.aws.amazon.com/documentdb/latest/developerguide/mongo-apis.html) for more details.
{{< /note >}}

### Tyk Dashboard

The Tyk Dashboard and Portal use Redis.

### Supported Verions of MongoDB and Redis

- MongoDB 3.x and 4.0.x
- Redis 2.8.x to 5.0.x

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

{{< note success >}}
**Note**  

For a production environment, we recommend that the Gateway, Dashboard and Pump are installed on separate machines. If installing multiple Gateways, you should install each on a separate machine. See [Planning for Production](/docs/planning-for-production/) For more details.
{{< /note >}}
