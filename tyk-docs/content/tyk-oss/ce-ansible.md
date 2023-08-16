---
title: "Ansible"
date: 2021-01-20
tags: ["Tyk Gateway", "Open Source", "Installation", "Ansible"]
description: "How to install the open source Tyk Gateway using Ansible"
menu:
  main:
    parent: "Open Source Installation" # Child of APIM -> OSS
weight: 3
---
{{< note >}}
**Requirements**

*   [Ansible](https://docs.ansible.com/ansible/latest/installation_guide/intro_installation.html) is required to run the following commands. Instructions on how install Tyk CE with shell is in the <b>Shell</b> tab.
*   Ensure port `8080` is open: this is used in this guide for Gateway traffic (the API traffic to be proxied).
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

3. Run initialisation script to initialise environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-ce`

```bash
$ ansible-playbook playbook.yaml -t tyk-ce -t redis
```

You can choose to not install Redis by removing the `-t redis`. However Redis is a requirment and needs to be installed for the gateway to run.

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | {{< tick >}} |
| CentOS | 8 | {{< tick >}} |
| CentOS | 7 | {{< tick >}} |
| Debian | 10 | {{< tick >}} |
| Debian | 9 | {{< tick >}} |
| RHEL | 8 | {{< tick >}} |
| RHEL | 7 | {{< tick >}} |
| Ubuntu | 21 | {{< tick >}} |
| Ubuntu | 20 | {{< tick >}} |
| Ubuntu | 18 | {{< tick >}} |
| Ubuntu | 16 | {{< tick >}} |

## Variables
- `vars/tyk.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| secrets.APISecret | `352d20ee67be67f6340b4c0605b044b7` | API secret |
| secrets.AdminSecret | `12345` | Admin secret |
| redis.host |  | Redis server host if different than the hosts url |
| redis.port | `6379` | Redis server listening port |
| redis.pass |  | Redis server password |
| redis.enableCluster | `false` | Enable if redis is running in cluster mode |
| redis.storage.database | `0` | Redis server database |
| redis.tls | `false` | Enable if redis connection is secured with SSL |
| gateway.service.host | | Gateway server host if different than the hosts url |
| gateway.service.port | `8080` | Gateway server listening port |
| gateway.service.proto | `http` | Gateway server protocol |
| gateway.service.tls | `false` | Set to `true` to enable SSL connections |
| gateway.sharding.enabled | `false` | Set to `true` to enable filtering (sharding) of APIs |
| gateway.sharding.tags | | The tags to use when filtering (sharding) Tyk Gateway nodes. Tags are processed as OR operations. If you include a non-filter tag (e.g. an identifier such as `node-id-1`, this will become available to your Dashboard analytics) |

- `vars/redis.yaml`

| Variable | Default | Comments |
| --------- | :---------: | --------- |
| redis_bind_interface | `0.0.0.0` | Binding address of Redis |

Read more about Redis configuration [here](https://github.com/geerlingguy/ansible-role-redis).
