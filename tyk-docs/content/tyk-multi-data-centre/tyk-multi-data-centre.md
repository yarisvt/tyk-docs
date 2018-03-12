---
date: 2017-03-24T16:39:31Z
title: Tyk Multi Data Centre
weight: 95
menu: "main"
url: "/tyk-multi-data-centre"
---

## <a name="introduction"></a>Introduction
Tyk has On-Premises installation functionality to allow you to control geographically dispersed Tyk installations from a "Master Data Centre" installation.

## <a name="use-case"></a>Use Case 

You are company ABC with the following Data Centre Locations:

* Chicago
* New York
* San Francisco

You want to have your Master Data Centre installation based in Chicago, with further Tyk Gateway installations in New York and San Francisco.

To do this requires the use of our Tyk **Multi Data Centre Bridge (MDCB)**. MDCB is a separately licensed product that allows you to set up Tyk in the above manner.

## <a name="benefits"></a>Benefits of Using MDBC

### Better Uptime if Master Failover

1. Gateways "stash" an encrypted version of their API and Policy configuration in the local redis
2. Gateways that are coming online during a scaling event can detect master MDCB downtime and will use the "last good" configuration found in Redis
3. Since running gateways have already been caching tokens that are in the active traffic flow from MDCB up until the downtime event, all gateways can service existing traffic, only new tokens will be rejected (and this can be mitigated by injecting those directly into the gateways using the local slaved gateway API)
4. Once master is restored, the gateways will all hot-reload to fetch new configurations and resume normal operations
5. Gateways will only record a buffered window of analytics so as not to overwhelm redis or flood MDCB when it comes back online

### Latency Reduction

Because the gateways cache keys and all operations locally, all operations can be geographically localised. This means that traffic to and from one location will all have rate limiting and checks applied within the same DC and round trip time is massively reduced.
Also, the lookup to MDCB is via a resilient compressed RPC channel that is designed to handle ongoing and unreliable connectivity, it is also encrypted, and so safer to use over the open internet or inter-DC links.

### Organisational Benefits

MDCB-slaved gateways are tied to a single organisation in the dashboard. This means that you can set up different teams as organisations in the dashboard, and each team can run it's own set of gateways that are logically isolated.
This can be achieved with a dashboard-only setup, but requires gateway sharding (tagging) and behavioural policy on the user's side to ensure that all APIs are tagged correctly, otherwise they do not load.
With an MDCB setup you get the ability to do both - segment out teams with their own gateway clusters, and also sub-segment those gateways with tagging.

## <a name="more-mdsb-info"></a>More Information on MDCB

### How MDCB Works

See [here][1] for an overview of MDCB

### MDCB Architecture
See [here][2] for a diagram of the MDCB Architecture and how the Master and Local Data Centres work together.

### How to Setup MDCB

See [here][3] for details of how to configure MDCB with the `tyk_sink.conf` file.

[1]: /docs/tyk-multi-data-centre/multi-data-centre-bridge/#how-tyk-mdcb-works
[2]: /docs/tyk-multi-data-centre/multi-data-centre-bridge/#logical-architecture
[3]: /docs/tyk-multi-data-centre/multi-data-center-bridge/mdcb-setup/


