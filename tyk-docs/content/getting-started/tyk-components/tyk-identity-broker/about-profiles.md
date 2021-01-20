--- 
date: 2021-19-01T23:42:00+13:00
title: About TIB Profiles
menu:
  main:
    parent: "Tyk Identity Broker"
weight: 2
url: "/getting-started/tyk-components/tyk-identity-broker/profiles"
---

### What are the TIB Profiles?

TIB takes as input one or many profiles that are stored in mongo or a file (it depends on the type of installation), a profile is a configuration that outlines of how to match a identity provider with a handler and what action to perform (Example: enable Dashboard SSO using OpenID and Microsoft Azure as IDP). The Dashboard adds a user interface to manage the profiles.

![Identity Broker User Interface](https://user-images.githubusercontent.com/35005482/82677001-f20fb600-9c64-11ea-8ed3-2973b1d51463.gif)
 

### Anatomy of a Profile
Each profile is outlined by a series of attributes that will describe: action to perform, IDP to connect, URL's to redirect on success and failure, etc.
In order to know and understand each of the attributes, implications as well as configure your own profile please refer to the [profiles configuration page](https://github.com/TykTechnologies/tyk-identity-broker/wiki/How-to-configure-Tyk-Identity-Broker#the-profilesconf-file)

### Examples
Refer to [Using Identity Providers](https://github.com/TykTechnologies/tyk-identity-broker/wiki/Using-Identity-Providers) to read some working examples of profiles.