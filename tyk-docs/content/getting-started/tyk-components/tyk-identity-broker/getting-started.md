--- 
date: 2021-18-01T15:00:00+13:00
title: Getting Started with TIB
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 1
url: "/getting-started/tyk-components/tyk-identity-broker/getting-started"
---

## Requirements

TIB requires:

- Tyk Gateway v1.9.1+
- Redis
- Tyk Dashboard v0.9.7.1+ (Only if you want to do SSO to Tyk Dashboard UI or Tyk Developer Portal)

## Installation

The simplest way to use TIB is the embedded version, starting from Tyk Dashboard v3.0 TIB is built-in to the dashboard, in this case TIB will store the profiles in the same mongo database configured for dashboard (in the standalone TIB the profiles will be stored in file indicated when the app is started). 


### Configuration

For the embedded TIB you don't have to do anything, only ensure that in the Dashboard's config file `identity_broker` is not pointing to an external service, and `identity_broker.enabled` is set to `true`. For example:

```
"identity_broker": {
    "enabled": true,
},
```

This settings behaves as follows:

* If `enabled` = `false` then neither the external or internal TIB will be loaded
* If `enabled` = `true` and the tib host is not present the internal TIB will be loaded
* If `enabled` = `true` and the tib host is set, then external TIB will be loaded


**Advanced** If you wish to install TIB as a separate application then you have the next options:

- You can install via Docker https://hub.docker.com/r/tykio/tyk-identity-broker/
- Or via packages (deb or rpm): https://packagecloud.io/tyk/tyk-identity-broker/install#bash-deb

No command line arguments are needed, but if you are running TIB from another directory or during startup, you will need to set the absolute paths to the profile and config files:

```{.copyWrapper}
Usage of ./tyk-auth-proxy:
  -c=string
        Path to the config file (default "tib.conf")
  -p#=string
        Path to the profiles file (default "profiles.json")
```

For more details on how to configure TIB as a separate component follow [this link](https://github.com/TykTechnologies/tyk-identity-broker#how-to-configure-tib).
