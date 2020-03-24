---
title: "Revoke OAuth Tokens"
date: 2020-03-17
menu:
  main:
    parent: "OAuth 2.0"
weight: 1
url: "/basic-config-and-security/security/your-apis/oauth2.0/revoke-oauth-tokens"
---

This feature gives you (both developers and Dashboard users) the ability to revoke OAuth tokens. You can revoke specific tokens by providing the token and token hint (`access_token` or `refresh_token`) or you can revoke all OAuth Client tokens. 

You can revoke OAuth tokens via the following methods:

* From a Gateway API endpoint (in compliance with https://tools.ietf.org/html/rfc7009)
* Via a Dashboard API call
* Via a Portal Developer API call
* Via the Developer menu from the Tyk Dashboard

## Gateway API call

We have two endpoints