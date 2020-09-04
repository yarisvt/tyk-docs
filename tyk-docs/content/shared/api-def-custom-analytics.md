---
---

`tag_headers`:  This specifies a string array of HTTP headers which can be extracted and turned to tags. 

For example if you include `X-Request-ID` header to tag_headers, for each incoming request it will include a `x-request-id-<header_value>` tag to request an analytic record.

This functionality can be useful if you need to pass additional information from the request to the analytics, without enabling detailed logging, which records the full request and response objects.
Since we are basically decalring headers' prefix as tags Tyk as expected from tags will also do aggregations per tag for the API calls.
If you don't want to have aggregationfor these tags you can add them or the prefixes to `ignore_tag_prefix_list` in pump.conf in case the pump is writing to MongoDB ir in `tyk_sink.conf` in case MDCB is doing the writing of the aggregated analytics to MongoDB

See [Log Browser](/docs/analytics-and-reporting/log-browser/) for more details on setting via the Dashboard.

