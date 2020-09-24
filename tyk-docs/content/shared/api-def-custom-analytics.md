---
---

`tag_headers`:  This specifies a string array of HTTP headers which can be extracted and turned to tags. 

For example if you include `X-Request-ID` header to tag_headers, for each incoming request it will include a `x-request-id-<header_value>` tag to request an analytic record.

This functionality can be useful if you need to pass additional information from the request to the analytics, without enabling detailed logging, which records the full request and response objects.
Since we are basically declaring headers' prefix as tags Tyk as expected from tags will also do aggregations per tag for the API calls.
If you don't want to have aggregation for these tags you can add them or their prefixes to `ignore_tag_prefix_list` in `pump.conf` in case the pump is writing the aggregated analytics to MongoDB. Alternatively, in case MDCB is doing the writing to mongoDB, set the same field in `tyk_sink.conf` at root level (please note that this field is replacing `"aggregates_ignore_tags"` which is still working but will eventually be deprecated).

See [Log Browser](/docs/analytics-and-reporting/log-browser/) for more details on setting via the Dashboard.

