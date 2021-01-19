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

TIB takes as input one or many profiles, a profile is no more than a configuration that outlines of how to match a identity provider with a handler and what action to perform (Example: enable Dashboard SSO using OpenID and Microsoft Azure as IDP). The Dashboard adds a user interface to manage the profiles. 

![Identity Broker User Interface](https://user-images.githubusercontent.com/35005482/82677001-f20fb600-9c64-11ea-8ed3-2973b1d51463.gif)


## What can you do with TIB?

By using the identity broker in conjunction with an IDP you have the ability to perform actions such as:

- Enabling easy access via social logins to the developer portal (e.g. GitHub login)
- Enabling internal access to the dashboard (e.g. via LDAP/ActiveDirectory)
- Enabling easy token generation from a third party for things such as mobile apps and webapps without complex configuration
