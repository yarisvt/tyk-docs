---
date: 2017-03-23T13:19:38Z
title: Tyk Identity Broker
menu:
  main:
    parent: "Tyk Components"
weight: 6 
---

## What is the Tyk Identity Broker (TIB)?

The Tyk Identity Broker (TIB) is a microservice portal that provides a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub), legacy Basic Authentication providers, to your Tyk installation.

TIB can bridge to the Tyk API Gateway, Tyk Portal or even Tyk Dashboard, and makes it easy to integrate custom IDMs to your system in a pluggable way.

### Installing TIB

#### Via Packages

As of v0.4.0, TIB is now available via packages from [https://packagecloud.io/tyk/tyk-identity-broker](https://packagecloud.io/tyk/tyk-identity-broker)

Follow the instructions on this page to install on your environment.

#### Via Docker

TIB is also available as a Docker container from h[ttps://hub.docker.com/r/tykio/tyk-identity-broker/](https://hub.docker.com/r/tykio/tyk-identity-broker/)


### Tyk Identity Broker Flow

The Tyk Identity Broker flow is quite complex, the initial authentication request must go via the broker, before being handled by the gateway:

![Tyk Identity Broker OAuth Flow][2]

### Example TIB implementation with GitHub and OAuth 2.0

<iframe width="870" height="480" src="https://www.youtube.com/embed/gqUaDM4aJTw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

[2]: /docs/img/diagrams/idbroker.png

