---
date: 2017-03-23T14:33:23Z
title: Key Hashing
menu:
  main:
    parent: "Security Concepts"
weight: 5 
---

## Concept: Key Hashing

Tyk stores all API Tokens and their equivalent Session Objects in Redis DB. Because of this, Tyk will, by default, obfuscate the tokens in Redis using a key hash.

To find a balance between performance and security, the current algorithm used by Tyk to do the hashing is `murmur3`, and serves more to obfuscate than to cryptographically secure the tokens.

It is possible to disable key hashing in Tyk using a configuration setting in the `tyk.conf` file (and the `tyk_analytics.conf` file) called `hash_keys`.

See the [Gateway Configuration Options](/docs/configure/tyk-gateway-configuration-options/) for more details.

A hashed installation imposes some constraints on how Tyk is used:

*   Listing tokens is not possible
*   Tokens appear in Analytics in their hashed form
*   Amending raw tokens requires knowledge of their hashed representation

> **Warning**: Switching from a hashed installation to non-hashed means all existing tokens cannot be used (they will not be correctly validated).

