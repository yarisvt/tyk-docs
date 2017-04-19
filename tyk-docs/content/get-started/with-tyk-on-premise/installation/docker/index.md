---
date: 2017-03-22T16:47:24Z
Title: With Docker
menu:
  main:
    parent: "Installation"
weight: 0
url: "/get-started/with-tyk-on-premise/installation/docker"
---

Tyk has three containers that are available to set up a docker installation:

* [The Tyk Gateway container][1]
* [The Tyk Dashboard container][2]
* [The Tyk Pump container][3]

All three are required for a full deployment, our quick-start will use docker-compose to generate a single-host stack that makes use of docker's overlay networking.

[1]: https://hub.docker.com/r/tykio/tyk-gateway/
[2]: https://hub.docker.com/r/tykio/tyk-dashboard/
[3]: https://hub.docker.com/r/tykio/tyk-pump-docker-pub/