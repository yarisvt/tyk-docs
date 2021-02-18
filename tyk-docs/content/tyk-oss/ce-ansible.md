---
title: "CE with Ansible"
date: 2021-01-20
menu:
  main:
    parent: "Tyk Gateway CE"
weight: 3
url: "/tyk-oss/ce-ansible/"
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

3. Run initalization script to initialize environment

```bash
$ sh scripts/init.sh
```

4. Modify `hosts.yml` file to update ssh variables to your server(s). You can learn more about the hosts file [here](https://docs.ansible.com/ansible/latest/user_guide/intro_inventory.html)

5. Run ansible-playbook to install `tyk-ce`

```bash
$ ansible-playbook playbook.yml -t tyk-ce -t redis
```

You can choose to not install Redis by removing the `-t redis`. However Redis is a requirment and needs to be installed for the gateway to run.

## Supported Distributions
| Distribution | Version | Supported |
| --------- | :---------: | :---------: |
| Amazon Linux | 2 | ✅ |
| CentOS | 8 | ⚠️ |
| CentOS | 7 | ✅ |
| CentOS | 6 | ❌ |
| Debian | 10 | ✅ |
| Debian | 9 | ✅ |
| Debian | 8 | ❌ |
| RHEL | 8 | ⚠️ |
| RHEL | 7 | ✅ |
| RHEL | 6 | ❌ |
| Ubuntu | 20 | ✅ |
| Ubuntu | 18 | ✅ |
| Ubuntu | 16 | ✅ |
| Ubuntu | 14 | ❌ |

| Symbol | Description |
| :---------: | --------- |
| ✅ | Tested / Supported |
| ⚠️ | Tested / Not officially supported by Tyk |
| ❌️ | Untested / Not supported by tool |