---
date: 2017-03-24T13:32:12Z
title: How to write gRPC Plugin
menu:
  main:
    parent: "gRPC"
weight: 0 
---

A gRPC plugin uses the standard bundling mechanism that you use for the rest of the rich plugins. The essential difference with a standard rich plugin is that a rich plugin bundle contains the actual code, which will be executed by Tyk, while a gRPC plugin bundle contains just a custom middleware definition, and you handle the execution of your code, independently, e.g. a gRPC server, listening on port 5000.

## Bundle

This is what a manifest could look like:

```
    {
      "file_list": [
      ],
      "custom_middleware": {
        "pre": [
          {
            "name": "MyPreMiddleware",
          }
        ],
        "post": [
          {
            "name": "MyPostMiddleware",
          }
        ],
        "auth_check": {
          "name": "MyAuthCheck"
        },
        "driver": "grpc"
      },
      "checksum": "",
      "signature": ""
    }
```

After saving this file as `manifest.json`, build it using [tyk-cli][1]:

`tyk-cli bundle build -output mybundle.zip -key mykey.pem`

## The gRPC server

A gRPC server must be implemented in the language of your choice, we have prepared different tutorials for some of them:

*   [Ruby][2]
*   [C#/.NET][3]

 [1]: https://github.com/TykTechnologies/tyk-cli
 [2]: https://github.com/TykTechnologies/tyk-plugin-demo-ruby
 [3]: https://github.com/TykTechnologies/tyk-plugin-demo-dotnet

