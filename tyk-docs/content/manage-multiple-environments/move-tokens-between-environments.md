---
date: 2017-03-24T12:29:23Z
title: Move tokens between environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 0 
---

Tyk currently does not have a facility to export a group of tokens from one environment and reissue them in another and still be able to manage those tokens from within the Dashboard.

However, it is possible to temporarily allow access to existing tokens in a new environment, but it should be noted that these tokens should eventually be expired and re-generated within the new environment.

In order to use a legacy token in a new environment, simply extract the token from the old environment using a `GET /tyk/keys/{keyID}` request and then `POST` that token to the Gateway REST API (not create) under `/tyk/keys/{keyId}`, this will insert the token into Tyk, and Tyk will respect that token, however it may not be visible in the Dashboard. This is called a custom token.
