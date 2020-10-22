---
date: 2017-03-27T16:45:06+01:00
title: How to clear / invalidate API cache
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

Use the REST API to clear the cache

## OSS

```
DELETE /tyk/cache/{api-id}
```

## Tyk Dashboard

```
DELETE /api/cache/{api-id}
```
