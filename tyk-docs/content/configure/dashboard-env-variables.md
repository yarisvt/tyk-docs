---
title: Tyk Dashboard Environment Variables
menu:
  main:
    parent: "Configure"
weight: 13 
---


| JSON Value                         | Environment Variable Name                    |
|------------------------------------|----------------------------------------------|
| listen_port                        | TYK_DB_LISTENPORT                            |
| Host                               | TYK_DB_TYKAPI_HOST                           |
| Port                               | TYK_DB_TYKAPI_PORT                           |
| Secret                             | TYK_DB_TYKAPI_SECRET                         |
| mongo_url                          | TYK_DB_MONGOURL                              |
| page_size                          | TYK_DB_PAGESIZE                              |
| admin_secret                       | TYK_DB_ADMINSECRET                           |
| shared_node_secret                 | TYK_DB_NODESECRET                            |
| redis_port                         | TYK_DB_REDISPORT                             |
| redis_host                         | TYK_DB_REDISHOST                             |
| redis_password                     | TYK_DB_REDISPASSWORD                         |
| enable_cluster                     | TYK_DB_ENABLECLUSTER                         |
| force_api_defaults                 | TYK_DB_FORCEAPIDEFAULTS                      |
| notify_on_change                   | TYK_DB_NOTIFYONCHANGE                        |
| license_key                        | TYK_DB_LICENSEKEY                            |
| redis_database                     | TYK_DB_REDISDATABASE                         |
| redis_hosts                        | TYK_DB_HOSTS                                 |
| hash_keys                          | TYK_DB_HASHKEYS                              |
| enable_email_notifications         | TYK_DB_EMAILBACKEND_ENABLEEMAILNOTIFICATIONS |
| code                               | TYK_DB_EMAILBACKEND_CODE                     |
| settings                           | TYK_DB_EMAILBACKEND_SETTINGS                 |
| default_from_email                 | TYK_DB_EMAILBACKEND_DEFAULTFROMEMAIL         |
| default_from_name                  | TYK_DB_EMAILBACKEND_DEFAULTFROMNAME          |
| hide_listen_path                   | TYK_DB_HIDELISTENPATH                        |
| sentry_code                        | TYK_DB_SENTRYCODE                            |
| sentry_js_code                     | TYK_DB_SENTRYJSCODE                          |
| use_sentry                         | TYK_DB_USESENTRY                             |
| enable_master_keys                 | TYK_DB_ENABLEMASTERKEYS                      |
| enable_duplicate_slugs             | TYK_DB_ENABLEDUPLICATESLUGS                  |
| show_org_id                        | TYK_DB_SHOWORGID                             |
| enable_host_names                  | TYK_DB_HOSTCONFIG_ENABLEHOSTNAMES            |
| disable_org_slug_prefix            | TYK_DB_HOSTCONFIG_DISABLEORGSLUGPREFIX       |
| hostname                           | TYK_DB_HOSTCONFIG_HOSTNAME                   |
| override_hostname                  | TYK_DB_HOSTCONFIG_GATEWAYHOSTNAME            |
| portal_domains                     | TYK_DB_HOSTCONFIG_PORTALDOMAINS              |
| portal_root_path                   | TYK_DB_HOSTCONFIG_PORTALROOTPATH             |
| generate_secure_paths              | TYK_DB_HOSTCONFIG_GENERATEHTTPS              |
| use_strict_hostmatch               | TYK_DB_HOSTCONFIG_USESTRICT                  |
| use_ssl                            | TYK_DB_HTTPSERVEROPTIONS_USESSL              |
| certificates                       | TYK_DB_HTTPSERVEROPTIONS_CERTIFICATES        |
| min_version                        | TYK_DB_HTTPSERVEROPTIONS_MINVERSION          |
| languages                          | TYK_DB_UI_LANGUAGES                          |
| hide_help                          | TYK_DB_UI_HIDEHELP                           |
| default_lang                       | TYK_DB_UI_DEFAULTLANG                        |
| login_page                         | TYK_DB_UI_LOGINPAGE                          |
| nav                                | TYK_DB_UI_NAV                                |
| uptime                             | TYK_DB_UI_UPTIME                             |
| portal_section                     | TYK_DB_UI_PORTALSECTION                      |
| designer                           | TYK_DB_UI_DESIGNER                           |
| dont_show_admin_sockets            | TYK_DB_UI_DONTSHOWADMINSOCKETMESSAGES        |
| dont_allow_license_management      | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENT         |
| dont_allow_license_management_view | TYK_DB_UI_DONTALLOWLICENSEMANAGEMENTVIEW     |
| home_dir                           | TYK_DB_HOMEDIR                               |
| enabled                            | TYK_DB_TIB_ENABLED                           |
| connection_string                  | TYK_DB_HOST_CONNECTIONSTRING                 |
| secret                             | TYK_DB_HOST_SECRET                           |
| tag_all_apis_by_org                | TYK_DB_TAGGINGOPTIONS_TAGALLAPISBYORG        |
| use_sharded_analytics              | TYK_DB_USESHARDEDANLAYTICS                   |
| enable_aggregate_lookups           | TYK_DB_ENABLEAGGREGATELOOKUPS                |
| enable_analytics_cache             | TYK_DB_ENABLEANALYTICSCACHE                  |
| aggregate_lookup_cutoff            | TYK_DB_AGGREGATELOOKUPCUTOFF                 |
| maintenance_mode                   | TYK_DB_MAINTENANCEMODE                       |
| allow_explicit_policy_id           | TYK_DB_ALLOWEXPLICITPOLICYID                 |
| private_key_path                   | TYK_DB_PRIVATEKEYPATH                        |
| node_schema_path                   | TYK_DB_NODESCHEMADIR                         |
| oauth_redirect_uri_separator       | TYK_DB_OAUTHREDIRECTURISEPARATOR             |