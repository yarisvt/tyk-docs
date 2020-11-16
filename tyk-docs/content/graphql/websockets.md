---
title: "Websockets"
date: 2020-11-16
menu:
  main:
    parent: "GraphQL"
weight: 4
aliases:
    - /graphql/websockets/
---

As from Tyk Gateway v3.2, Tyk also supports the GraphQL websockets protocol. 

Before this feature can be used, websockets need to be enabled in the Tyk Gateway configuration. To enable it set `http_server_options.enable_websockets` to `true` in your `tyk.conf` file. [See reference here]({{< ref "/content/tyk-configuration-reference/tyk-gateway-configuration-options.md#http_server_optionsenable_websockets" >}}).

In order to upgrade the HTTP connection for a GraphQL API to websockets, the request should contain following headers:
```
Connection: Upgrade
Upgrade: websocket
Sec-WebSocket-Key: <random key>
Sec-WebSocket-Version: 13
Sec-WebSocket-Protocol: graphql-ws
```