---
date: 2017-03-24T13:02:59Z
title: What are they ?
menu:
  main:
    parent: "Rich Plugins"
weight: 1
---

Rich plugins make it possible to write powerful middleware for Tyk. Tyk supports [Python][1], [Lua][2] and [gRPC][3]. gRPC provides the ability to write plugins using many languages including C++, Java, Ruby and C#.

The dynamically built Tyk binaries can expose and call Foreign Function Interfaces in guest languages that extend the functionality of a gateway process.

The plugins are able to directly call some Tyk API function from within their guest language. They can also be configured so that they hook into various points along the standard middleware chain.

 [1]: https://www.python.org/
 [2]: https://www.lua.org/
 [3]: http://www.grpc.io/