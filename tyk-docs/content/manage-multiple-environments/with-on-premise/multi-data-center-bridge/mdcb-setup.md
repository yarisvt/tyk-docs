---
date: 2017-03-24T12:05:54Z
title: MDCB Setup
menu: 
  main:
    parent: "Multi Data Centre Bridge"
weight: 5
---

## <a name="setup"></a>Setting up Tyk MDCB

Tyk MDCB is mainly configured using a single conf file - `tyk_sink.conf`, it only needs to be able to access your Redis and MongoDB databases.

Tyk MDCB has a separate license, which you can request from your account representative.

### The Tyk Sink configuration file:

```{.copyWrapper}
    {
        "storage": {
            "type": "redis",
            "host": "localhost",
            "port": 6379
        },
        "hash_keys": true,
        "analytics": {
            "mongo_url": "mongodb://localhost/tyk_analytics"
        },
        "license": ""
        },
        "server_options": {
            "use_ssl": false,
            "certificate": { "cert_file": <path>, "key_file": <path> },
            "min_version": 1.2
        }
    }
```

*   `storage`: This section describes your centralised Redis DB, this will act as your master key store for all of your clusters.
*   `hash_keys`: Set to `true` if you are using a hashed configuration install of Tyk, otherwise set to `false`.
*   `analytics`: This section must point to your MongoDB replica set and must be a valid MongoDB replica set URL.
*   `license`: Enter your license in this section so MDCB can start.
*   `server_options`: If `use_ssl` is set to `true`, you need to enter the `cert_file` and `key_file` path names for `certificate`, `min_version` should be the minimum TLS protocol version required from the client.

## <a name="prepare-gateway-as-slave"></a> Prepare the Tyk Gateway as a Slave

### Step 1: Prepare your organisation for MDCB

Before a slave node can connect to MDCB, it is important to enable the organisation that owns all the APIs to be distributed to be allowed to utilize Tyk MDCB, to do this, the organisation record needs to be modified with a few new flags using the [Tyk Dashboard Admin API][1].

First, get a copy of the record:

```{.copyWrapper}
    GET /admin/organisations/{org-id}
    
    {
        "_id" : "55780af69b23c30001000049",
        "owner_slug" : "portal-test",
        "developer_quota" : 500,
        "hybrid_enabled" : false,
        "ui" : {
            "uptime" : {},
            "portal_section" : {},
            "designer" : {},
            "dont_show_admin_sockets" : false,
            "dont_allow_license_management" : false,
            "dont_allow_license_management_view" : false,
            "login_page" : {},
            "nav" : {}
        },
        "owner_name" : "Portal Test",
        "cname_enabled" : true,
        "cname" : "api.test.com",
        "apis" : [ 
            {
                "api_human_name" : "HttpBin (again)",
                "api_id" : "2fdd8512a856434a61f080da67a88851"
            }
        ],
        "developer_count" : 1,
        "event_options" : {}
    }
```

Now modify this object so that it has MDCB enabled by setting `hybrid_enabled: true` and also to enable key sharing across instances by setting the relevant `event_options`:

```{.copyWrapper}
    PUT /admin/organisations/54b53d3aeba6db5c35000002
    
    {
        "_id" : "55780af69b23c30001000049",
        "owner_slug" : "portal-test",
        "developer_quota" : 500,
        "hybrid_enabled" : true,
        "ui" : {
            "uptime" : {},
            "portal_section" : {},
            "designer" : {},
            "dont_show_admin_sockets" : false,
            "dont_allow_license_management" : false,
            "dont_allow_license_management_view" : false,
            "login_page" : {},
            "nav" : {}
        },
        "owner_name" : "Portal Test",
        "cname_enabled" : true,
        "cname" : "api.test.com",
        "apis" : [ 
            {
                "api_human_name" : "HttpBin (again)",
                "api_id" : "2fdd8512a856434a61f080da67a88851"
            }
        ],
        "developer_count" : 1,
        "event_options" : {
            "key_event" : {
                "webhook" : "",
                "email" : "",
                "redis" : true
            }
        },
    }
```

The first setting allows a slave to login as an organisation member into MDCB, while the second setting under `event_options`, enables key events such as updates an deletes, to be propagated to the various instance zones. API Definitions and Policies will be propagated by default.

### Step 2: Configure a Tyk Gateway for MDCB access

The last thing that needs to be done is to actually configure a slaved Tyk gateway to connect and respect the slaved settings, this means updating sections in `tyk.conf`, some of these may be new.

First, we need to ensure that we are optimising for speed:

```{.copyWrapper}
	"optimisations_use_async_session_write": true,
```

Next, we need to set the group that the node will belong to using API sharding, or API tagging, these settings will ensure that only APIs tagged as `ny-1-qa` are loaded by this gateway, you can of course change this tag to be an identifier for whichever environment you want.

```{.copyWrapper}
    "db_app_conf_options": {
        "node_is_segmented": true,
        "tags": ["ny-1-qa"]
    }
```

Next, we need to ensure that the policy loader and analytics purger use the RPC driver:

```{.copyWrapper}
    "policies": {
      "policy_source": "rpc",
      "policy_record_name": "tyk_policies"
    },
    
    "analytics_config": {
        "type": "rpc",
        ... // remains the same
    },
```

Lastly, we add the sections that enforce the RPC Slave mechanism:

```{.copyWrapper}
    "slave_options": {
        "use_rpc": true,
        "rpc_key": "{ORGID}",
        "api_key": "{APIKEY}",
        "connection_string": "{your-mdcb-instance-domain:9090}",
        "enable_rpc_cache": true,
        "bind_to_slugs": true,
        "group-id": "ny",
        "use_ssl" : true,
        "ssl_insecure_skip_verify", true
    },
    
    "auth_override": {
        "force_auth_provider": true,
        "auth_provider": {
            "name": "",
            "storage_engine": "rpc",
            "meta": {}
        }
    }
```

The most important elements here are:

*   `group_id`: This is the "zone" that his instance inhabits, e.g. the DC it lives in.
*   `tags`: These are the tags (`ny-1-qa` in the example) that the instance will use to download API definitions, Tyk will download all definitions that match each tag set.
*   `connection_string`: The MDCB instance or load balancer.

Once this is complete, you can start the Tyk MDCB instance and start having Tyk Slave instances connect to it.
### Copying an Existing Dashboard Configuration
If you are copying a Tyk Dashboard configuration (`tyk.conf`) from an On-Premises installation, you need to set `use_db_app_configs` to false. This allows Tyk to read the Tyk Sink configuration (`tyk_sink.conf`) instead of the Dashboard. See [Dashboard Configuration Options][2] for more details.


 [1]: /docs/dashboard-admin-api/organisations/
 [2]: /docs/configure/tyk-dashboard-configuration-options/






