---
title: "Tyk Open Source"
date: 2020-06-24
weight: 1
menu:
    main:
        parent: Tyk Solutions
url: "/tyk-solutions/open-source"
---

Tyk offers many open source products.  You can use as many or as few as you need to solve your API problems.

![OSS-Guide](/docs/img/diagrams/tyk-oss.png)


{{< include "oss-product-list-include" >}}

## Tyk Gateway

At the center of everything is the Tyk Gateway.

Tyk offers powerful, yet lightweight features that allow fine grained control over your API ecosystem.

* **RESTFul API** - Full programmatic access to the internals makes it easy to manage your API users, keys and Api Configuration from within your systems
* **Multiple access protocols** - Out of the box, Tyk supports Token-based, HMAC Signed, *Basic Auth and Keyless access methods
* **Rate Limiting** - Easily rate limit your API users, rate limiting is granular and can be applied on a per-key basis
* **Quotas** - Enforce usage quotas on users to manage capacity or charge for tiered access
* **Granular Access Control** - Grant api access on a version by version basis, grant keys access to multiple API's or just a single version
* **Key Expiry** - Control how long keys are valid for
* **API Versioning** - API Versions can be easily set and deprecated at a specific time and date
* **Blacklist/Whitelist/Ignored** endpoint access - Enforce strict security models on a version-by-version basis to your access points
* **Analytics logging** - Record detailed usage data on who is using your API's (raw data only)
* **Webhooks** - Trigger webhooks against events such as Quota Violations and Authentication failures
* **IP Whitelisting** - Block access to non-trusted IP addresses for more secure interactions
* **Zero downtime restarts** - Tyk configurations can be altered dynamically and the service restarted without affecting any active request

Tyk is written in Go, which makes it fast and easy to set up. Its only dependencies are a Mongo database (for analytics) and Redis, though it can be deployed without either (not recommended).

<!-- todo: Architecture Diagram: -->

## Get Started

To Get started, simply install the [Tyk Gateway](/docs/tyk-oss-gateway/install/), and then create your first API!