---
date: 2017-03-24T13:19:52Z
title: gRPC
menu:
  main:
    parent: "Rich Plugins"
weight: 5
url: "/customise-tyk/plugins/rich-plugins/grpc"
---
## What is gRPC?
From the [gRPC documentation][1]:

> gRPC is a modern, open source remote procedure call (RPC) framework that can run anywhere. It enables client and server applications to communicate transparently, and makes it easier to build connected systems.

### How can I use gRPC with Tyk?

Tyk supports gRPC pass though proxying when using HTTP/2 as a transport (the most common way to deploy gRPC services). The only requirement is enabling HTTP/2 support on the Gateway side, for both incoming and upstream connections, by setting http_server_options.enable_http2 and proxy_enable_http2 to true in your Gateway config file.

You also need to set your `listen_path` in your API definitions.

The gRPC over HTTP2 specification defines the rules on how the gRPC protocol maps to a HTTP request. In the context of the API Gateway, we are intersted in the following:

- HTTP path follows the format `/{Service-Name}/{method name}`, for example: `/google.pubsub.v2.PublisherService/CreateTopic`. You can use this feature to apply standard ACL rules via Keys and Policies, or use url rewrite plugins in our [Endpoint Desiger](/docs/transform-traffic/url-rewriting/#a-name-url-rewrite-with-endpoint-designer-a-rewrite-a-url-with-the-endpoint-designer).
- HTTP method is always POST
gRPC custom request metadata is added as HTTP headers, where metadata key is directly mapped to the HTTP header with the same name.

 

### Mutual Authentication
Tyk supports Mutual Authentication in gRPC. See [Mutual TLS](https://tyk.io/docs/security/tls-and-ssl/mutual-tls/) to configure Mutual Authentication in Tyk. Now, everything will be same as default Mutual Authentication.

### Basic Authentication
Tyk supports Basic Authentication in gRPC. See [Basic Authentication](https://tyk.io/docs/security/your-apis/basic-auth/) to configure Basic Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send credentials with the correct base64 format in an `Authorization` header from your gRPC client. 

`Basic base64Encode(username:password)`

### Token Based Authentication
Tyk supports Token Based Authentication in gRPC. See [Bearer Tokens](https://tyk.io/docs/security/your-apis/bearer-tokens/) to configure Token Based Authentication in Tyk. 

After setting your Tyk configuration, all you need to do is to send a token in an `Authorization` header from your gRPC client.

### gRPC Plugins and Tyk
Tyk has built-in support for gRPC backends, enabling you to build rich plugins using any of the gRPC supported languages. At the time of writing, the following languages are supported: C++, Java, Objective-C, Python, Ruby, Go, C# and Node.JS (see ["gRPC by language"][2]).

[Protocol Buffers][3] are used for dispatching and exchanging requests between Tyk and your gRPC plugins. Protocol buffers can be versioned using the conventions outlined [here](http://h22208.www2.hpe.com/eginfolib/networking/docs/sdn/sdnc2_7/5200-0910prog/content/s_sdnc-app-ha-versioning-GPB.html). The **protocol definitions** provided by Tyk should be used in order for the communication to be successful. You may find these definitions [here][4].

You may re-use the bindings that were generated for our samples. In case you find it necessary, or you don't find a sample that uses your target language, you may generate the bindings yourself. The Protocol Buffers and gRPC documentation provide specific requirements and instructions for each language, we suggest you check them.

See [this tutorial][5] for instructions on how to create a gRPC plugin.

 [1]: http://www.grpc.io/faq/ 
 [2]: http://www.grpc.io/docs/
 [3]: https://developers.google.com/protocol-buffers/
 [4]: https://github.com/TykTechnologies/tyk-protobuf
 [5]: /docs/customise-tyk/plugins/rich-plugins/grpc/tutorial-add-grpc-plugin-api/