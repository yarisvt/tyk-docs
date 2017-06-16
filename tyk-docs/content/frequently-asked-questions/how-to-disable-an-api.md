---
date: 2017-03-27T16:09:14+01:00
title: How to disable an API
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

You will need to GET the API from the Dashboard, then set `active` property to `false`, then PUT it back.
See the [Dashboard API definitions documentation][1], this explains how to GET and PUT an API definition.

[1]: /docs/tyk-dashboard-api/api-definitions/