---
date: 2017-03-24T13:21:13Z
title: gRPC Performance
menu:
  main:
    parent: "gRPC"
weight: 0 
aliases: 
  -  "/plugins/rich-plugins/grpc/performance"
---

These are some benchmarks performed on gRPC plugins.

gRPC plugins may use different transports, we've tested TCP and Unix Sockets.

## TCP

![TCP Response Times](/docs/img/diagrams/tcpResponseTime.png)

![TCP Hit Rate](/docs/img/diagrams/tcpHitRate.png)

## Unix Socket

![Unix Socket Response Times](/docs/img/diagrams/unixResponseTime.png)


![Unix Socket Hit Rate](/docs/img/diagrams/unixHitRate.png)