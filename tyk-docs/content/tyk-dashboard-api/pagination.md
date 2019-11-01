---
date: 2019-10-15T12:13:12+01:00
title: Pagination
menu:
  main:
    parent: "Tyk Dashboard API"
weight: 1
---

Select Dashboard APIs are paginated.  

You can choose what page of results to return by adding a parameter `p` which starts at 1.

Alternatively, passing `0` or lower as a parameter will return all items.

The default page size is 10. You can overwrite the default page size in your dashboard configuration file [using the page_size key](https://tyk.io/docs/configure/tyk-dashboard-configuration-options/#environment-variables). It's suggested you do not modify it as it will affect the performance of the Dashboard.

#### Sample Request:

```{.copyWrapper}
GET /api/apis/?p=1 HTTP/1.1
Host: localhost:3000
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response:

```
{
  "apis": [
    { ... },
    { ... },
    { ... }
  ],
  "pages": 1
}
```
