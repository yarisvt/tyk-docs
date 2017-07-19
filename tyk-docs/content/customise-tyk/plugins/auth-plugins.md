---
date: 2017-03-24T15:45:13Z
title: Auth Plugins
menu:
  main:
    parent: "Plugins"
weight: 0 
---

The ID extractor is a very useful mechanism that will let you cache your authentication IDs and prevent certain requests from hitting your CP backend. It takes a set of rules from your API configuration (the rules are set per API).

A sample usage will look like this:

```{.copyWrapper}
    "custom_middleware": {
      "pre": [
        {
          "name": "MyPreMiddleware",
          "require_session": false
        }
      ],
      "id_extractor": {
        "extract_from": "header",
        "extract_with": "value",
        "extractor_config": {
          "header_name": "Authorization"
        }
      },
      "driver": "grpc"
    },
```

Tyk provides a set of ID extractors that aim to cover the most common use cases, a very simple one is the **value extractor**.
