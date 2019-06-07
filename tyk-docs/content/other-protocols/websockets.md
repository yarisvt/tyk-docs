---
date: 2017-03-24T12:52:17Z
title: WebSockets
menu:
  main:
    parent: "Other Protocols"
weight: 0 
---

As of Tyk gateway v2.2, Tyk supports transparent WebSocket connection upgrades. To enable this feature, set the `enable_websockets` value to `true` in your `tyk.conf` file.

WebSocket proxying is transparent, Tyk will not modify the frames that are sent between client and host, and rate limits are on a per-connection, not per-frame basis.

The WebSocket upgrade is the last middleware to fire in a Tyk request cycle, and so can make use of HA capabilities such as circuit breakers and enforced timeouts.

Tyk needs to decrypt the inbound and re-encrypt the outbound for the copy operations to work, Tyk does not just pass through the WebSocket. When the target is on default SSL port you must explicitly specify the target url for the API:

```{.copyWrapper}
https://target:443/
```

## WebSocket Example

We are going to set up Tyk with a WebSocket proxy using our [Tyk Pro Docker Demo](https://github.com/TykTechnologies/tyk-pro-docker-demo) installation.

You will also need a WebSocket client. We will use a Chrome Browser extension called [Simple WebSocket Client](https://chrome.google.com/webstore/detail/simple-websocket-client/pfdhoblngboilpfeibdedpjgfnlcodoo?hl=en).

### Step 1. Set up the WebSockets Server

We have a repo with the server code [here](https://github.com/sedkis/websocket-example)

Clone the repo and run the install and start commands as per the Readme.

```{.copyWrapper}
npm install
```

Then

```{.copyWrapper}
npm start
```

You now have a WebSockets server listening on port 3001.

### Step 2. Setup the API in Tyk

Create a new API in Tyk. For this demo we are going to select Open (Keyless) as the **Authentication mode**.

Set the **Target URL** to `ws://localhost:3001`

This gives you a **Gateway URL** of: `http://tyk-test.com:8080/websocket/`

We will change `http` to `ws` in the WebSocket client.

### Step 3. Test the Connection

Using the **Simple WebSocket Client** in **Chrome**, in the Server Location field, enter:

`ws://www.tyk-test.com:8080/websocket/`

![Server Location][1]

Then connect another instance to the WebSocket Server and watch them send messages to each other through Tyk:

![Server Location][2]







[1]: /docs/img/dashboard/system-management/websocket_server1.png
[2]: /docs/img/dashboard/system-management/websocket_server2.png





