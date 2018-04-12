### IP Blacklisting (Middleware)

* `enable_ip_blacklisting`: If set to `true`, requests coming from the explicit list of IP addresses (`blacklisted_ips`) are not allowed through.

* `blacklisted_ips`: A list of strings that defines the IP addresses that are blocked access via Tyk. This list is explicit and wildcards are currently not supported. e.g.:

```{.json}
...
"enable_ip_blacklisting": true,
"blacklisted_ips": ["12.12.12.12", "12.12.12.13", "12.12.12.14"]
...
```