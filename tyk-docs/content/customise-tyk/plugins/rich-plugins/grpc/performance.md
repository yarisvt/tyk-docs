---
date: 2017-03-24T13:21:13Z
title: gRPC Performance
menu:
  main:
    parent: "gRPC"
weight: 0 
---

These are some benchmarks performed on gRPC plugins.

gRPC plugins may use different transports, we've tested TCP and Unix Sockets.

## TCP

![TCP Response Times][1]

![TCP Hit Rate][2]

## Unix Socket

![Unix Socket Response Times][3]


![Unix Socket Hit Rate][4]

[1]: /img/tcpResponseTime.png
[2]: /img/tcpHitRate.png
[3]: /img/unixResponseTime.png
[4]: /img/unixHitRate.png