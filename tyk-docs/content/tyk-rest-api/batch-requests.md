---
title: Batch Requests
menu:
  main:
    parent: "Tyk Rest API"
weight: 9 
---

Tyk supports batch requests, so a client makes a single request to the API but gets a compound response object back.

To enable batch request support, set the `enable_batch_request_support` value to `true`

This is especially handy if clients have complex requests that have multiple synchronous dependencies and do not wish to have the entire request / response cycle running for each event.

Batch requests that come into Tyk are *run through the whole Tyk machinery* and *use a relative path to prevent spamming*. This means that a batch request to Tyk for three resources with the same API key will have three requests applied to their session quota and request limiting could become active if they are being throttled.

Tyk reconstructs the API request based on the data in the batch request. This is to ensure that Tyk is not being used to proxy requests to other hosts outside of the upstream API being accessed.

Batch requests are created by POSTing to the `/{api-id}/tyk/batch` endpoint. These requests **do not require a valid key**, but their request list does. Here is a sample request body:

```{json}
    {
        "requests": [
            {
                "method": "GET",
                "headers": {
                    "x-tyk-test": "1",
                    "x-tyk-version": "1.2",
                    "authorization": "1dbc83b9c431649d7698faa9797e2900f"
                },
                "body": "",
                "relative_url": "get"
            },
            {
                "method": "GET",
                "headers": {
                    "x-tyk-test": "2",
                    "x-tyk-version": "1.2",
                    "authorization": "1dbc83b9c431649d7698faa9797e2900f"
                },
                "body": "",
                "relative_url": "get"
            }
        ],
        "suppress_parallel_execution": false
    }
```

The response will will be a structured reply that encapsulates the responses for each of the outbound requests. If `suppress_parallel_execution` is set to `true`, requests will be made synchronously. If set to `false` then they will run in parallel and the response order is not guaranteed.

A response to the above when pointing at [httpbin](https://httpbin.org/) would look like:

```
    [
        {
            "relative_url": "get",
            "code": 200,
            "headers": {
                "Access-Control-Allow-Credentials": [
                    "true"
                ],
                "Access-Control-Allow-Origin": [
                    "*"
                ],
                "Content-Length": [
                    "497"
                ],
                "Content-Type": [
                    "application/json"
                ],
                "Date": [
                    "Wed, 12 Nov 2014 15:32:43 GMT"
                ],
                "Server": [
                    "gunicorn/18.0"
                ],
                "Via": [
                    "1.1 vegur"
                ]
            },
            "body": "{
      "args": {}, 
      "headers": {
        "Accept-Encoding": "gzip", 
        "Authorization": "1dbc83b9c431649d7698faa9797e2900f", 
        "Connect-Time": "2", 
        "Connection": "close", 
        "Host": "httpbin.org", 
        "Total-Route-Time": "0", 
        "User-Agent": "Go 1.1 package http", 
        "Via": "1.1 vegur", 
        "X-Request-Id": "6a22499a-2776-4aa1-80c0-686581a8be4d", 
        "X-Tyk-Test": "2", 
        "X-Tyk-Version": "1.2"
      }, 
      "origin": "127.0.0.1, 62.232.114.250", 
      "url": "http://httpbin.org/get"
    }"
        },
        {
            "relative_url": "get",
            "code": 200,
            "headers": {
                "Access-Control-Allow-Credentials": [
                    "true"
                ],
                "Access-Control-Allow-Origin": [
                    "*"
                ],
                "Content-Length": [
                    "497"
                ],
                "Content-Type": [
                    "application/json"
                ],
                "Date": [
                    "Wed, 12 Nov 2014 15:32:43 GMT"
                ],
                "Server": [
                    "gunicorn/18.0"
                ],
                "Via": [
                    "1.1 vegur"
                ]
            },
            "body": "{
      "args": {}, 
      "headers": {
        "Accept-Encoding": "gzip", 
        "Authorization": "1dbc83b9c431649d7698faa9797e2900f", 
        "Connect-Time": "7", 
        "Connection": "close", 
        "Host": "httpbin.org", 
        "Total-Route-Time": "0", 
        "User-Agent": "Go 1.1 package http", 
        "Via": "1.1 vegur", 
        "X-Request-Id": "1ab61f50-51ff-4828-a7e2-17240385a6d2", 
        "X-Tyk-Test": "1", 
        "X-Tyk-Version": "1.2"
      }, 
      "origin": "127.0.0.1, 62.232.114.250", 
      "url": "http://httpbin.org/get"
    }"
        }
    ]
```

With the body for each request string encoded in the `body` field.

* `expire_analytics_after`: If you are running a busy API, you may want to ensure that your MongoDB database does not overflow with old data. Set the `expire_analytics_after` value to the number of seconds you would like the data to last for. Setting this flag to anything above `0` will set an `expireAt` field for each record that is written to the database.
    
> **Important:** Tyk will not create the expiry index for you. In order to implement data expiry for your analytics data, ensure that the index is created This is very easily achieved using the [MongoDB command line interface](https://docs.mongodb.com/getting-started/shell/client/).

* `dont_set_quota_on_create`: This setting defaults to `false`, but if it is set to `true`, when the API is used to edit, create or add keys, the quota cache in Redis will not be re-set. By default, all updates or creates to Keys that have Quotas set will re-set the quota (This has been the default behaviour since 1.0).
    
This behaviour can be bypassed on a case-by-case basis by using the `suppress_reset` parameter when making a REST API request. This is the advised mode of operation as it allows for manual, granular control over key quotas and reset timings.

* `cache_options`: This section enables you to configure the caching behaviour of Tyk and to enable or disable the caching middleware for your API.

* `cache_options.enable_cache`: Set this value to `true` if the cache should be enabled for this endpoint, setting it to false will stop all caching behaviour.

* `cache_options.cache_timeout`: The amount of time, in seconds, to keep cached objects, defaults to `60` seconds.

* `cache_options.cache_all_safe_requests`: Set this to `true` if you want all *safe* requests (GET, HEAD, OPTIONS) to be cached. This is a blanket setting for APIs where caching is required but you don't want to set individual paths up in the definition.

* `cache_options.enable_upstream_cache_control`: Set this to `true` if you want your application to control the cache options for Tyk (TTL and whether to cache or not). See [Caching](/docs/reduce-latency/caching/) for more details.

* `response_processors`: Response processors need to be specifically defined so they are loaded on API creation, otherwise the middleware will not fire. In order to have the two main response middleware components fire, the following configuration object should be supplied:

```{json}
    "response_processors": [
        {
            "name": "header_injector",
            "options": {
                "add_headers": {"name": "value"},
                "remove_headers": ["name"]
            }
        },
        {
          "name": "response_body_transform",
          "options": {}
        }
    ]
```
    
The options for the `header_injector` are global, and will apply to all outbound requests.