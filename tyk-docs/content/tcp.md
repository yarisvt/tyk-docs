---
title: "TCP proxy"
date: 2019-09-23T10:28:52+03:00
weight: 121
menu: "main"
url: "/tcp-proxy"
---

### Using Tyk as TCP proxy

Tyk can be used as a reverse proxy for your TCP services. It means that you can put Tyk not only on top of your APIs, but on top of **any** network application, like databases, services using custom protocols and etc.

In order to enable TCP proxying set `protocol` field either to `tcp` or `tls`. In case of TLS, you can also specify `certificate` field with certificate ID or path to it.

Similar to above, proxy target scheme should be set to `tcp://` or `tls://`, depending if you upstream secured by TLS or not.

The simplest TCP API definition looks like this:

{
  "listen_port": 30001,
  "protocol": "tls",
  "certificate": ["<cert-id>"],
  "proxy": {
    "target_url": "tls://upstream:9191"
  }
}

Tyk supports multiplexing based on certificate SNI information, which means that you can have multiple TCP services on the **same port**, served on different domains. 

If Tyk sits behind another proxy, which has PROXY protocol enabled, you can set `enable_proxy_protocol` to `true`. 
If your upstream expects PROXY protocol,.

Rest of the features like load balancing, service discovery, Mutual TLS (both authorisation and communication with upstream), certificate pinning: all work exactly the same way as for your HTTP APIs. 

### Health checks

TCP health checks configured the same way as HTTP ones.
The main difference that instead of specifying HTTP request, you should specify list of commands, which send data or expect some data in response. 

The simple health check which verify only connectivity (e.g. if port is open), can be as simple as: 

```js
{
...
	"uptime_tests": {
	  "check_list": [
	    { "url": "127.0.0.1:6379" },
        "commands": []
	  ]
	}
...
}
```

#### Complex example

Here is quite complex example of using health checks, which shows Redis Sentinel setup. In this configuration we put TCP proxy, e.g. Tyk, on top of two or more Redis nodes, and role of the proxy will be always direct user to Redis master. To do that we will  need to perform health checks against each Redis node, to detect if it is a master or not. In other words Redis clients, who communicate with Redis though the proxy, will be always directed to the master, even in case of failover. 

```js
{
   "name": "Redis Sentinel",
   "listen_port": 6379,
   "protocol": "tcp",
   "enable_load_balancing": true,
   "proxy": {
	   "target_list": ["192.168.10.1:6379", "192.168.10.2:6379"]
	},
   "check_host_against_uptime_tests": true,
   "uptime_tests": {
       "check_list": [
          {
			"url": "192.168.10.1:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          },
          {
			"url": "192.168.10.2:6379",
            "commands": [
              { "name": "send", "message": "PING\r\n" },
              { "name": "expect", "message": "+PONG" },
              { "name": "send", "message": "info  replication\r\n" },
              { "name": "expect", "message": "role:master" },
              { "name": "send", "message": "QUIT\r\n" }, 
              { "name": "send", "message": "+OK" }
            ]
          }
       ]
   }
}
```

At the moment Tyk support only 2 commands:
 - `send`  send string to server
- `expect`  expect string from the server
