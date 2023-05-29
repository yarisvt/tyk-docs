---
date: 2017-03-24T09:58:52Z
title: Caching
tags: ["Caching requests"]
description: "How to cache requests in Tyk"
menu:
  main:
    parent: "Reduce Latency"
weight: 0 
---

## Overview

Tyk supports various ways of caching requests. At its simplest level, Tyk can cache all safe requests, however you can also manually set exactly which endpoint patterns to cache, and if that doesn't suffice, or you require more granular control, then you can enable upstream control and have your application tell Tyk whether to cache a request or not and for how long.

{{< note success >}}
**Note**  

Invalidate Cache functionality is supported in MDCB Gateways from version 4.0 and 3.0.9 
{{< /note >}}


## Global

### Enabling Caching via an API Definition

To enable caching in your API, within your API definition you will need to set the `cache_options` flags in the main body of the definition:

```{.copyWrapper}
"cache_options": {
  "cache_timeout": 10,
  "enable_cache": true,
  "cache_all_safe_requests": false,
  "enable_upstream_cache_control": false,
  "cache_by_headers": [],
  "cache_response_codes": [200]
}
```

{{< note success >}}
**Note**  

If you set `cache_all_safe_requests` to true, then the cache will be global and *all* inbound requests will be evaluated by the caching middleware. This is great for simple APIs, but for most a finer-grained control is required.
{{< /note >}}


### Enabling Caching via the Dashboard

Follow these steps to enable caching via the Dashboard.

#### Step 1: Go to the Advanced Options

From the API Designer, select the **Advanced Options** tab:

{{< img src="/img/2.10/advanced_options_designer.png" alt="Advanced options tab location" >}}

#### Step 2: Set the Cache Options for the Global Cache

{{< img src="/img/2.10/cache_options.png" alt="Cache settings" >}}

Here you must set:

1.  **Enable caching**: To enable the cache middleware.
2.  **Cache timeout**: To set the timeout (in seconds) for cached requests.
3.  **Cache only these status codes**: To set which response codes to cache (remember to click **Add** after entering a response code).
4.  **Global cache**: Enable the global cache.

## Dynamic caching based on headers or body content

By default Tyk maintains a cache of an API key (if auth is enabled), request method and request path.
But you can have a dynamic cache for keys as well, and maintain a differnt cache based on the header or body content values.

For HTTP headers you can set the`cache_option.cache_by_headers` option. For example: 
```
"cache_options": {
   "cache_by_headers": ["Unique-user-Id"]
   ....
}
```

For request body based caching, it should be defined on a per endpoint level. Add the following config under the API definition `extended_paths` section:
```
"extended_paths": {
  "advance_cache_config": [
    {
      "method":"POST",
      "path":"addBooks",
      "cache_key_regex": "pattern"
    }
  ]
  ...
}
```

Both header and body dynamic caching is not exposed in the Dashboard UI, and needs to be enabled though either the raw API editor or via the Dashboard API. 

## Per-Path

To cache only specific endpoints, within the version data under the `extended_paths` section, you will need to define the paths to cache in the `cache` list:

```
extended_paths: {
  ignored: [],
  white_list: [],
  black_list: [],
  cache: [
      "widget",
      "badger",
      "fish"
  ],
  transform: [],
  transform_headers: []
}
```

Now Tyk will only cache the `/widget`, `/badger`, and `/fish` endpoints. Tyk will only cache safe requests, so currently `GET` and `HEAD` requests are the only supported HTTP methods. For many this will suffice with regards to caching requests; however in some cases you may wish to have full control over when to cache and be reactive about the time to live of the cached response.

You will still need to set the timeout and the response codes to validate in the cache configuration section.

### Setting Up a Per-Path Cache in the Dashboard

#### Step 1: Disable Global Cache

Ensure that the global cache is disabled (**Cache all safe requests** is not selected).

{{< img src="/img/2.10/advanced_options_designer.png" alt="Cache options form" >}}

You need to set:

1.  **Caching middleware**: To enable the cache middleware.
2.  **Cache timeout**: To set the timeout (in seconds) for cached requests.
3.  **Cache only these status codes**: To set which status codes to cache (click **Add** after entering a code).

#### Step 2: Select the Cache Plugin

Go to the Endpoint Designer tab. From the path you want to cache, select the **Cache** plugin option from the drop-down list.

{{< img src="/img/2.10/cache_plugin.png" alt="Plugin dropdown list" >}}

 
## Upstream Cache Control

Upstream cache control allows you to specify caching behavior for
responses from your back-end services. Follow these steps to enable it:

Step 1: In the API definition, set the following properties:

```json
"enable_cache": true,
"enable_upstream_cache_control": true
```

Additionally, identify the paths that should be affected. You can either
use the dashboard user interface or manually add these paths to the cache
list in the extended_paths section of your API version, as shown below:

```json
"extended_paths": {
    "cache": [
        "ip"
    ]
}
```

Step 2: Tyk evaluates the response headers sent by your application for the specified paths.

The following headers control caching behavior:

- `x-tyk-cache-action-set`: This header determines whether the request should be cached. Send `1` to enable caching the request.
- `x-tyk-cache-action-set-ttl`: This header allows you to override the default cache TTL (Time to Live) value, specified in seconds.

By configuring these headers in the responses, you have precise control
over caching behavior. When the headers are absent or set to specific
values, Tyk follows its default behavior, typically resulting in
non-caching of the request.

Explanation:

- `x-tyk-cache-action-set`: If the header is set to `1`, Tyk caches the
request, even for non-safe requests. If the header is empty or absent,
Tyk follows its default behavior, which typically involves not caching
the request.

- `x-tyk-cache-action-set-ttl`: If the header is present, Tyk uses the
specified value as the TTL. If the header is not present, Tyk falls back
to the value specified in `cache_options.cache_timeout`.

If you wish to change these headers to a header of your choice, you can
do so by setting the following cache options:

```json
"cache_options": {
    "cache_control_ttl_header": "x-expire"
}
```

With this set, you can send `x-expire: 30` to cache a response for 30
seconds.

Utilising this approach gives the most control as it will also only cache
responses based on the request method. So if you only want `OPTIONS`
requests to be cached, and return cache control headers only for this
method, then only that method/URL combination will be cached, ignoring
other methods for the same path.


### Configuration via the Dashboard UI

Under the Advanced settings, ensure that **Enable upstream cache control** is selected and **Global cache** is not selected, then follow the steps for per-path caching.

## A Separate Redis Cache

For high-traffic systems that make heavy use of caching as well as rate limiting, it makes sense to separate out the Redis cache server from the Redis configuration server that supplies auth tokens and handles rate limiting configuration.

To enable a separate cache server, update your `tyk.conf` with the following section:

```{.copyWrapper}
"enable_separate_cache_store": true,
"cache_storage": {
  "type": "redis",
  "host": "",
  "port": 0,
  "addrs": [
      "localhost:6379"
  ],
  "username": "",
  "password": "",
  "database": 0,
  "optimisation_max_idle": 3000,
  "optimisation_max_active": 5000,
  "enable_cluster": false
},
```

{{< note success >}}
**Note**  

`addrs` is new in v2.9.3, and replaces `hosts` which is now deprecated.
{{< /note >}}

If you set `enable_cluster` to `false`, you only need to set one entry in `addrs`:

The configuration is the same (and uses the same underlying driver) as the regular configuration, so Redis Cluster is fully supported.
