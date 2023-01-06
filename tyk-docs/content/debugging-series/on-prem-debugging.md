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

Debugging our on-prem environment is a challenging task by any means. Many moving pieces could be causing the error you see, i.e. gateway, dashboard, backend service, Mongo, Redis, Postgres, pump, load balancer(s), certificates etc.

You should be doing two things from the beginning: isolating your components to see where the error is coming from and enabling debug logs to ensure you get all the information you need.

## `/Hello` endpoint

The `/hello` endpoints are the quickest way to get a feel for if the overall environment is up and running.

You can call the same endpoint against both the gateway and the dashboard. The dashboard returns much less info but is still valuable regarding isolating issues.

```
{
    status: "pass",
    version: "v3.0.9",
    description: "Tyk GW",
    details: {
        dashboard: {
            status: "pass",
            componentType: "system",
            time: "2022-11-18T13:30:33Z"
        },
        redis: {
            status: "pass",
            componentType: "datatstore",
            time: "2022-11-18T13:30:33Z"
        }
    }
}
```

## Gateway

This gives you a clearer picture of whether the above components are working. While it doesn't give you the whole picture, it certainly narrows the field of vision that much more.

## Debug Logs

Having debug logs turned on helps close the gap in which component is throwing the error.

### Gateway Debug Settings

If you’re using a `*.conf` for your configuration parameters:

```
"log_level": "debug"
```

If you’re using a `*.env` for your configuration:

```
TYK_GW_LOGLEVEL=debug
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

You can find the full log levels in our documentation.

## Versions/ Replicate

If you are using an older version of Tyk and running into an error, the issue might resolve if you upgrade.

You can read version release notes and upgrade your Tyk versions here: [Version Releases](https://github.com/TykTechnologies/tyk/releases) .

## Dashboard

It's essential to note that our dashboard is built on top of our OSS, which means that the dashboard uses the Dashboard API to retrieve its data. This means you can use the developer tools on your browser to access the API and its information. From here, you'll be able to see whether it's the Dashboard UI that's causing the error or if it's the API itself.

In many cases, you'll want to expose the same analytics you see in the dashboard elsewhere or isolate if an error is on the [Gateway API]({{< ref "tyk-gateway-api" >}}). level or the [Dashboard API]({{< ref "tyk-dashboard-api" >}}) level.

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
