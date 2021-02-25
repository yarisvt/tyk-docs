---
date: 2021-01-20
title: "Tyk Gateway CE Install"
linkTitle: "Installation "
weight: 1
menu:
  main:
    parent: Tyk Gateway
url: "tyk-oss-gateway/install"
---

The backbone of all our products is our open source Gateway. You can install our Community Edition (Gateway only) on the following platforms:

{{< grid >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-docker/" image="/docs/img/docker.png">}}
Install our **Community Edition** Gateway with Docker. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-kubernetes/" image="/docs/img/k8s.png">}}
Install our **Community Edition** Gateway with K8s. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-ansible/" image="/docs/img/ansible.png">}}
Install our **Community Edition** Gateway with Ansible. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-redhat-rhel-centos/" image="/docs/img/redhat-logo2.png">}}
Install our **Community Edition** Gateway on RHEL / CentOS. 
{{< /badge >}}

{{< badge read="10 mins" href="/docs/tyk-oss/ce-debian-ubuntu/" image="/docs/img/debian-nd-753.png">}}
Install our **Community Edition** Gateway on Debian / Ubuntu. 
{{< /badge >}}

{{< badge read="10 mins" href="https://github.com/TykTechnologies/tyk" image="/docs/img/GitHub-Mark-64px.png">}}
Visit our **Community Edition** Gateway GitHub Repo. 
{{< /badge >}}

{{< /grid >}}


## Architecture

The Tyk Gateway can run completely independently, requiring only a Redis database to be effective, and can scale horizontally:

![Tyk Open Source Deployment](/docs/img/diagrams/gateway3.png)

Combine with the other [Tyk OSS products](/docs/tyk-stack) For even more power!