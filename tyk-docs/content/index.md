---
date: 2017-03-09T11:20:34Z
Title: Documentation
weight: 1
menu: "main"
url: "/index.html"
---

The Tyk Open Source API Gateway 2.x is the next step in a more distributed version of Tyk, and introduces a host of new modules:

* WebSockets
* XML transforms
* Context variables
* OpenID Connect Support
* Tyk Pump: A data sink service that will move analytics data into any database that you choose, currently supported is CSV, MongoDB and ElasticSearch, InfluxDB, StatsD and Segment.io
Tyk Identity Broker: Easily integrate third party Identity Providers with Tyk, be that Social, OAuth, Basic Auth, legacy systems or LDAP

Overall, we’ve improved stability and added much-needed support for standards such as HMAC signatures, JSON web tokens and IP whitelisting, as well as slimming down Tyk to handle less of the database work and decoupling it from MongoDB entirely.

Tyk v2.2 only has a single dependency: Redis, and we’ve changed the way we handle analytics so that instead of binding them directly to the dashboard, Tyk Community Edition users can publish their analytics to any data source they need (or multiple thereof), with minimum of effort.