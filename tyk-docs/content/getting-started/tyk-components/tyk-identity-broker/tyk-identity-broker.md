--- 
date: 2021-18-01T15:00:00+13:00
title: Tyk Identity Broker
menu:
  main:
    parent: "Tyk Components"
weight: 1
url: "/getting-started/tyk-components/new-tyk-identity-broker"
---

## What is the Tyk Identity Broker (TIB)?

The Tyk Identity Broker (TIB) is a microservice portal that provides a bridge between various Identity Management Systems such as LDAP, Social OAuth (e.g. GPlus, Twitter, GitHub), legacy Basic Authentication providers, to your Tyk installation.

The TIB can bridge to the Tyk API Gateway, Tyk Portal or even the Tyk Dashboard, and makes it easy to integrate custom IDMs to your system in a pluggable way.

Starting from Tyk v3.0  the TIB has been added as a built-in feature of the Tyk Dashboard. You no longer have to setup a separated instance of the service to make it work with the Dashboard. However, this is not mandatory and you can still can set the configs to connect to an external TIB. An internal TIB doesn't require any configuration and is quite easy to set up. The internal TIB is exposed on the same port as the Dashboard hence it doesn't require a separate port to work as intended.


## What can you do with TIB?

By using the identity broker in conjunction with an IDP you have the ability to perform actions such as:

- Enabling easy access via social logins to the developer portal (e.g. GitHub login)
- Enabling internal access to the dashboard (e.g. via LDAP/ActiveDirectory)
- Enabling easy token generation from a third party for things such as mobile apps and webapps without complex configuration

### How it Works

TIB provides a simple API, which traffic can be sent through. The API will match the request to a profile which then exposes two things:

1. An **Identity Provider** that will authorise a user and validate their identity
2. An **Identity Handler** that will authenticate a user with a delegated service (in this case, Tyk)

#### Identity Providers

Identity providers can be anything, so long as they implement the `tap.TAProvider` interface. Bundled with TIB at the moment you have three providers:

1. **Social** - this provides OAuth handlers for many popular social logins (such as Google, Github and Bitbucket)
2. **LDAP** - a simple LDAP protocol binder that can validate a username and password against an LDAP server (tested against OpenLDAP)
3. **Proxy** - a generic proxy handler that will forward a request to a third party and provides multiple "validators" to identify whether a response is successful or not (e.g. status code, content match and regex)
4. **SAML** - provides a way to authenticate against a SAML IDP.

#### Identity Handlers

An identity handler will perform a predefined set of actions once a provider has validated an identity. These actions are defined as a set of action types:

* `GenerateOrLoginDeveloperProfile` - this will create or login a user to the Tyk Developer Portal
* `GenerateOrLoginUserProfile` - this will log a user into the Tyk Dashboard (this does not create a user, it only creates a temporary session for the user to have access)
* `GenerateOAuthTokenForClient` - this will act as a client ID delegate and grant an Tyk provided OAuth token for a user using a fragment in the redirect URL (standard flow)
