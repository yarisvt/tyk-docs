---
date: 2017-03-27T10:41:57+01:00
title: Tyk Rest API
weight: 0
menu: "main"
---

## Introduction


The Tyk REST API is the primary means for integrating your application with the Tyk API Gateway server. In order to use the REST API, you’ll need to set the secret parameter in your `tyk.conf` file.

The shared secret you set should then be sent along as a header with each REST API Request in order for it to be successful:

```
	x-tyk-authorization: {your api secret here}
```

