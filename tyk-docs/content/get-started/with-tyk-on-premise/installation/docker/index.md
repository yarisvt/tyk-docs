---
date: 2017-03-22T16:47:24Z
Title: With Docker
menu:
  main:
    parent: "Installation"
weight: 1
url: "/get-started/with-tyk-on-premise/installation/docker"
---

Tyk has three containers that are available to set up a Docker installation:

* [The Tyk Gateway container][1]
* [The Tyk Dashboard container][2]
* [The Tyk Pump container][3]

All three are required for a full deployment. Our Docker Quickstart will use Docker Compose to generate a single-host stack that makes use of Docker's overlay networking.

> **Warning!** Our Docker Quickstart setup involves some workarounds, and should be installed for demonstration purposes, not on a production machine.

[1]: https://hub.docker.com/r/tykio/tyk-gateway/
[2]: https://hub.docker.com/r/tykio/tyk-dashboard/
[3]: https://hub.docker.com/r/tykio/tyk-pump-docker-pub/