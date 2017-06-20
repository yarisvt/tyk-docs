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

## <a name="tcp"></a> TCP

![TCP Response Times][1]

![TCP Hit Rate][2]

## <a name="unix"></a> Unix Socket

![Unix Socket Response Times][3]


![Unix Socket Hit Rate][4]

[1]: /docs/img/diagrams/tcpResponseTime.png
[2]: /docs/img/diagrams/tcpHitRate.png
[3]: /docs/img/diagrams/unixResponseTime.png
[4]: /docs/img/diagrams/unixHitRate.png