---
date: 2017-03-27T16:37:14+01:00
title: How to backup Tyk
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

The best thing to do is to backup MongoDB/Postgres and Redis (you would need that as all of the tokens that are used by Tyk are stored there). You will also need your `tyk.conf`, `tyk_analytics.conf` and `pump.conf` files.

If you have all of these you should be able to easily boot a new version of your Gateway in the same state that it was in before the backup and have all tokens still working.
