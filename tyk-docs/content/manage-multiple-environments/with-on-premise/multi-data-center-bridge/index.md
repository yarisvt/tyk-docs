---
date: 2017-03-24T12:01:05Z
title: Multi Data-Center Bridge
menu: 
  main:
    parent: "With On-Premise"
weight: 5
---

## <a name="introduction"></a>Multi-Data-Center Bridge: Introduction

Tyk Multi Data Center Bridge (MDCB, also known as Tyk Sink) acts as a broker between Tyk Gateway Instances that are isolated from one another and typically have their own Redis DB.

In order to manage physically separate Tyk Gateway clusters from a centralised location, Tyk MDCB needs to be used to provide a remote “back-end” for token and configuration queries.

### How Tyk MDCB Works

Tyk MDCB creates a bridge between a configuration source (MongoDB and a centralised Redis DB) and multiple Tyk Gateway instances, this bridge provides API Definitions, Policy definitions and Organization (Tenant) rate limits, as well as acting as a data sink for all analytics data gathered by slaved Tyk Gateways.

The communication between instances works through a compressed RPC TCP tunnel between the gateway and MDCB, it is incredibly fast and can handle 10,000’s of transactions per second.

## <a name="logical-architecture"></a>MDCB Logical Architecture

The Tyk MDCB logical architecture consists of:

1.  A master Tyk cluster, this can be active or inactive, what is important is that the master Tyk installation is not tagged or sharded or zoned in any way, it stores configurations for all valid APIs (this is to facilitate key creation).
2.  MDCB instances to handle the RPC connections.
3.  The Tyk Slave clusters, these consist of Tyk Nodes and an isolated Redis DB.

![Tyk Open Source API Gateway Multi-Data Center Deployment][1]

### The master nodes

Tyk instances connected to MDCB are slaved, and so actually only ever have a locally cached set of key and policy data, so in order to first get slave clusters set up, you must have a master. The master can be an existing Tyk Gateway setup, it does not need to be separately created, but bear in mind that the key store for this set up will hold a copy of ALL tokens across ALL zones.

The Master nodes need to consist of:

1.  A Dashboard instance
2.  A Master Tyk gateway instance(s) (will load and be aware of all configurations, it is important to ensure this is not public facing)
3.  A master Redis DB
4.  A MongoDB replica set for the dashboard and MDCB
5.  One or more MDCB instances, load balanced with port 9090 open for TCP connections

### The slave cluster(s)

The slave clusters are essentially local caches that run all validation and rate limiting operations locally instead of against a remote master that could cause latency.

When a request comes into a slaved node, the following set of actions occur:

1.  Request arrives
2.  Auth header and API identified
3.  Local cache is checked for token, if it doesn't exist, attempt to copy token from RPC master node (MDCB)
4.  If token is found in master, copy to local cache and use
5.  If it is found in the local cache, no remote call is made and rate limiting and validation happen on the local copy

(Note: Cached versions do not get synchronised back to the master, setting a short TTL is important to ensure a regular lifetime)

A slave cluster consists of the following configuration:

1.  Tyk gateway instance(s) specially configured as slaves
2.  A Redis DB

[1]: /img/diagrams/mdcbArchitecture.png