# Tyk Dashboard
Tyk Pump

* Activity by API
* Activity by Key
* Errors
* Log Browser
* Developer Portal - API Usage

{{< tabs_start >}}
{{< tab_start "MongoDB" >}}

The Tyk Dashboard uses the `mongo-pump-aggregate` collection to display analytics. This is different than the standard `mongo` pump plugin that will store individual analytic items into MongoDB. The aggregate functionality was built to be fast, as querying raw analytics is expensive in large data sets. See [Pump Dashboard Config]({{< ref "/content/tyk-pump/tyk-pump-configuration/tyk-pump-dashboard-config.md" >}}) for more details.

{{< tab_end >}}
{{< tab_start "SQL" >}}

In v4.0 of the Tyk Dashboard, we have added support for the following SQL platforms:
- PostgreSQL
- SQLite

Within your Dashboard configuration file (`tyk-analytics.conf`) there is now a `storage` section.

```{.shell}
{
  ...
  "storage": {
    "main":{},
    "analytics":{},
    "logs":{},
    "uptime": {}
  }
}
```
### Field description

- `main` - Main storage (APIs, Policies, Users, User Groups, etc.)
- `analytics` - Analytics storage (used for display all the charts and for all analytics screens)
- `logs` - Logs storage (log browser page)
- `uptime` - uptime tests analytics data

## Common settings

For every `storage` section, you must populate the following fields:
```{.shell}
{
...
  "storage": {
    ...
    "main": {
      "type": "postgres",
      "connection_string": "user=root password=admin database=tyk-demo-db host=tyk-db port=5432",
    }
  }
}
```
- `type` use this field to define your SQL platform (currently SQLite or PostgreSQL are supported)
- `connection_string` the specific connection settings for your platform

The pump needed for storing logs data in the database, is very similar to other pumps as well as the storage setting in your Tyk Dashboard config. It just requires the `sql` name and database specific configuration options.

### SQL example

```{.shell}
"sql": {
  "name": "sql",
  "meta": {
    "type": "postgres",
    "connection_string": "user=laurentiughiur password=test123 database=tyk-demo-db host=127.0.0.1 port=5432"
  }
},
```

{{< tab_end >}}
{{< tabs_end >}}