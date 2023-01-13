---
title: "On-Prem Debugging Guide"
date: 2023-01-06
tags: ["Debugging", "On-Prem Debugging", "Debugging Guide", "Debugging Tips" ]
description: "Debugging Tips and Tricks on how-to debug a Tyk Instance"
menu:
  main:
    parent: "Debugging Series"
aliases:
  - /debugging-series/on-prem-debugging/
---

This guide should help a user of Tyks self managed pro offering in debugging common issues. A helpful way to go about this is by:

1. Isolating your components to see where the error is coming
2. Enabling debug logs to ensure you get all the information you need

## Gateway `/hello` endpoint

The `/hello` health check endpoint against the Gateway is the quickest way in determining the status of your Tyk instance. You can find more information in our docs about the [Gateway Liveness health check]({{< ref "planning-for-production/ensure-high-availability/health-check" >}}).

The reason this endpoint is important is that components such as the Tyk Dashboard, RPC, or Redis can go down at any given point so it is useful to know if the Gateway is currently usable or not.

```json
{
    "status":"pass",
    "version":"v4.0.10",
    "description":"Tyk GW",
    "details":{
        "dashboard":{
            "status":"pass",
            "componentType":"system",
            "time":"2023-01-13T14:45:00Z"
            },
        "redis":{
            "status":"pass",
            "componentType":"datastore",
            "time":"2023-01-13T14:45:00Z"
            }
        },
        "rpc": {
            "status": "pass",
            "componentType": "system",
            "time":"2023-01-13T14:45:00Z"
        }
}
```

The Gateway can still function if the Dashboard fails. This means that your API calls are still working as normal.

## Debug Logs

Having Debug mode turned on is helpful when debugging because it throws more descriptive error messages.

### Gateway Debug Settings

If you’re using a `*.conf` for your configuration parameters:

```
"log_level": "debug"
```

If you’re using a `*.env` for your configuration:

```
TYK_GW_LOGLEVEL=debug
```

If you're using Tyk Helm Charts. Add the following items to your `values.yaml`:

```
extraEnvs:
  - name: TYK_LOGLEVEL
    value: debug
```

### Dashboard Debug Settings

If you’re using a `*.conf` for your configuration parameters:

```
"log_level": "debug"
```

If you’re using a `*.env` for your configuration:

```
TYK_DB_LOGLEVEL=debug
```

If you're using Tyk Helm Charts. Add the following items to your `values.yaml`:

```
extraEnvs:
  - name: TYK_LOGLEVEL
    value: debug
```

You can find the full log levels in our documentation.

## Versions/ Replicate

Please see the latest version releases [here](https://github.com/TykTechnologies/tyk/releases).

We recommend using the latest version of Tyk always. Tyk is backwards compatible, upgrading to newer versions won't activate any features or change behaviour of your existing environment

## Dashboard

It's essential to note that our dashboard is built on top of our OSS, which means that the dashboard uses the Dashboard API to retrieve its data. This means you can use the developer tools on your browser to access the API and its information. From here, you'll be able to see whether it's the Dashboard UI that's causing the error or if it's the API itself.

In many cases, you'll want to expose the same analytics you see in the dashboard elsewhere or isolate if an error is on the [Gateway API]({{< ref "tyk-gateway-api" >}}) level or the [Dashboard API]({{< ref "tyk-dashboard-api" >}}) level.

By using the browser developer tools, you can see and replicate this information through API calls.

### Isolating

As mentioned above, errors can come from many parts of Tyk or your architecture, and as such, one of the critical things you'll pick up during your debugging phase is isolating these environments.

### Dashboard Level

When using the dashboard, you'll run into a common theme where something doesn't work on the dashboard but will work when using the gateway API.

That's one of the first things you should do when debugging something on the dashboard, i.e. does the same call work if you isolate the gateway away from the dashboard? If it works with the gateway API only, then it's likely on the dashboard level. This might be because the dashboard needs some configuration parameters or environment variables.

### Gateway or API level

Are you making calls against your gateway or API, and it's not working? Try isolating the gateway from everything else. Often you'll see that the gateway or API aren't at fault and that it's something else; it can be the load balancer you have in your environment blocking the call from ever reaching it.

In the case of the API error-ing out, you can also isolate it by:

- Creating a generic Httpbin API and calling it
    - If this works, then the API configuration or the backend is at fault
- Changing the target URL of the API
    - The upstream API can be at fault
- Assuming your API has a plugin, take away the plugin and test the API
    - The error most likely exists in the plugin
- If the error exists in your plugin, try taking out certain parts of the code and testing it with minimal logic
    - This means that part of your code with integrated logic is incorrect
- Is the target URL the same in another one of your APIs?
    - The gateway sees the API as duplicated and changes the new target URL causing the gateway to error.

You will eventually hit the point of error by further isolating parts of your API.

## What do you do when you can’t fix the error?
You're probably not the first to encounter this error. Visit these relevant Tyk resources additional help or guidance:

1. [Tyk Community Forums](https://community.tyk.io/)
2. [Tyk FAQ Section]({{< ref "frequently-asked-questions" >}})
3. [Tyk Github Page](https://github.com/TykTechnologies)
4. Tyk Support (Paid SLA only)
