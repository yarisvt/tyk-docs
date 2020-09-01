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

The TIB can bridge to the Tyk API Gateway, Tyk Portal or even the Tyk Dashboard, and makes it easy to integrate custom IDMs to your system in a pluggable way.

Starting from Tyk v3.0  the TIB has been added as a built-in feature of the Tyk Dashboard. You no longer have to setup a separated instance of the service to make it work with the Dashboard. However, this is not mandatory and you can still can set the configs to connect to an external TIB. An internal TIB doesn't require any configuration and is quite easy to set up. The internal TIB is exposed on the same port as the Dashboard and does not require a separate port to work as intended.

Additionally, the Dashboard adds a user interface to manage the profiles. 
![Identity Broker User Interface](https://user-images.githubusercontent.com/35005482/82677001-f20fb600-9c64-11ea-8ed3-2973b1d51463.gif)

### How it Works

TIB provides a simple API, which traffic can be sent through. The API will match the request to a profile which then exposes two things:

1. An **Identity Provider** that will authorise a user and validate their identity
2. An **Identity Handler** that will authenticate a user with a delegated service (in this case, Tyk)

#### Identity Providers

Identity providers can be anything, so long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have three providers:

1. **Social** - this provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2. **LDAP** - a simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
3. **Proxy** - a generic proxy handler that will forward a request to a third party and provides multiple "validators" to identify whether a response is successful or not (e.g. status code, content match and regex)

#### Identity Handlers

An identity handler will perform a predefined set of actions once a provider has validated an identity. These actions are defined as a set of action types:

#### Pass through or redirect user-based actions

* `GenerateOrLoginDeveloperProfile` - this will create or login a user to the Tyk Developer Portal
* `GenerateOrLoginUserProfile` - this will log a user into the Tyk Dashboard (this does not create a user, it only creates a temporary session for the user to have access)
* `GenerateOAuthTokenForClient` - this will act as a client ID delegate and grant an Tyk provided OAuth token for a user using a fragment in the redirect URL (standard flow)

#### Direct or Redirect

`GenerateTemporaryAuthToken` - will generate a Tyk standard access token for the user and can be delivered as a redirect fragment OR as a direct API response (JSON)

These actions are all handled by the `tap.providers.TykIdentityHandler` module which wraps the Tyk Gateway, Dashboard and Admin APIs to grant access to a stack.

Handlers are not limited to Tyk, a handler can be added quite easily by implementing the `TAProvider` so long as it implements this pattern and is registered so it can handle any of the above actions for it's own target.

### Installing TIB

Starting from Tyk Dashboard v3.0, TIB is built-in to the dashboard. 
You don't have to do anything, only ensure that in the Dashboard's config file `identity_broker` is not pointing to an external service, and `identity_broker.enabled` is set to `true`. For example:

```
"identity_broker": {
    "enabled": true,
    "host": {
        "connection_string": "",
        "secret": ""
    }
},
```

If you want install TIB as a separate component follow the guide below.

The settings are as follows:

* If `enabled` = `false` then neither the external or internal TIB will be loaded
* If `enabled` = `true` and the tib host is set, then external TIB will be loaded
* If `enabled` = `true` and the tib host is not present the internal TIB will be loaded

#### Via Packages

As of v0.4.0, TIB is now available via packages from [https://packagecloud.io/tyk/tyk-identity-broker](https://packagecloud.io/tyk/tyk-identity-broker)

Follow the instructions from the packages page to install on your environment.

#### Via Docker

TIB is also available as a Docker container from [https://hub.docker.com/r/tykio/tyk-identity-broker/](https://hub.docker.com/r/tykio/tyk-identity-broker/)

### Usage

No command line arguments are needed, but if you are running TIB from another directory or during startup, you will need to set the absolute paths to the profile and config files:

```{.copyWrapper}
Usage of ./tyk-auth-proxy:
  -c=string
        Path to the config file (default "tib.conf")
  -p#=string
        Path to the profiles file (default "profiles.json")
```


### Tyk Identity Broker Flow

The TIB flow is quite complex, the initial authentication request must go via the broker, before being handled by the Tyk Gateway:

![Tyk Identity Broker OAuth Flow](/docs/img/diagrams/idbroker.png)

### Example TIB implementation with GitHub and OAuth 2.0

{{< youtube gqUaDM4aJTw >}}