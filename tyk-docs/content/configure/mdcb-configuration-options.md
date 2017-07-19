---
date: 2017-03-27T15:49:20+01:00
title: MDCB Configuration Options
menu:
  main:
    parent: "Configure"
weight: 5 
---

## Setting up Tyk MDCB

Tyk MDCB is mainly configured using a single file - `tyk_sink.conf`. It only needs to be able to access your Redis and MongoDB databases.

Tyk MDCB has a separate license, which you can request from your account representative.

### The configuration file

```{.copyWrapper}
    {
        "storage": {
            "type": "redis",
            "host": "localhost",
            "port": 6379
        },
        "hash_keys": true,
        "analytics": {
            "mongo_url": "mongodb://localhost/tyk_analytics"
        },
        "license": ""
    }
```

*   `storage`: This section describes your centralised Redis DB, this will act as your master key store for all of your clusters.

*   `hash_keys`: Set to `true` if you are using a hashed configuration install of Tyk, otherwise set to `false`.

*   `analytics`: This section must point to your MongoDB replica set and must be a valid mongoDB replica set URL.

*   `license`: Enter your license in this section so MDCB can start.


