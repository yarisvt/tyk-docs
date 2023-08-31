---
title: "Connecting data sources"
date: 2020-09-14
menu:
  main:
    parent: "UDG Getting Started"
weight: 2
aliases:
    - /universal-data-graph/udg-getting-started/connect-datasource/
---

Connecting **one or more data sources** to your Data Graph is only possible once you've [designed and created the Data Graph schema first]({{< ref "/universal-data-graph/udg-getting-started/creating-schema">}}). This is the step in which you can define where the Data Graph should take the data from in order to populate all the fields you've defined.

This step is much easier when done using Tyk Dashboard, but if you are Tyk Community Edition user it's also possible. Below you will be able to see how to do it using both options.

## Data source types

Data sources available for Data Graphs can be divided in two different ways.

Depending on the kind of technology they are built in:
* REST API data source
* GraphQL API data source
* Kafka data source

And depending on their relation to your Tyk Gateway environment and your Data Graph:
* Tyk data source - an API that you are already proxying through your Tyk Gateway, which allows you to access APIs from within your Tyk environment.
* External data source - an API that does not exist in your Tyk environment, but with the correct credentials can be accessed over the web.
* Current Data Graph data source - a data source that you've already configured in the current Data Graph and wish to re-use it. This is not accessible from any other Data Graphs.

## Connecting the first data source

Your consumers will be interacting with the Data Graph by performing one of the root type operations:

* a query
* a mutation
* a subscription

Not all three have to be present in your Data Graph schema, but since `query` root type is mandatory, we'd advise you to start with it first.


### Query REST data source

*To illustrate this process, we will use an example Data Graph schema.*

```graphql
type Query {
  vatcheck(code: String): VatInfo
}

type VatInfo {
  valid: Boolean
  vat_number: String
  name: String
  address: String
  country_code: String
}
```

The REST API that will provide the data for this Data Graph is:

```bash
GET https://api.vatcomply.com/vat?vat_number={VAT_NUMBER} HTTP/1.1
```

There are 2 options at this point:
1. You can first create this REST API in your Tyk Gateway and later use it in your Data Graph as **Tyk REST**
2. You can go straight to using it as **External REST**

#### Using Tyk REST data source for query

To create a REST API in Tyk refer to [this guide]({{< ref "/getting-started/create-api">}}) first. Once done, you can come back to your Data Graph.

{{< tabs_start >}}
{{< tab_start "Tyk Dashboard" >}}

Navigate to your Data Graph and then open the **Schema** tab.

{{< img src="/img/dashboard/udg/getting-started/navigate-to-schema.png" alt="Schema tab" >}}

On the right-hand side click the `query` name you are intending to connect the data source for.

*In this example there's only one query called `vatcheck`.*

You will see the *schema editor* fold away and instead a new section **Configure data source** will slide out from the right. If you've previously created any REST or GraphQL APIs in your Tyk Dashboard you will see them in the top two dropdowns. Open **REST | Tyk** and choose an API you want to use as a data source.

{{< img src="/img/dashboard/udg/getting-started/choosing-rest-ds.png" alt="Choosing Tyk REST">}}

**Data source name**
Type your data source name in this field - this can be anything you want and it is a **mandatory** field so cannot be left blank. 
*We advise you use a descriptive name that will help you understand what this data source refers to, in case you want to re-use it later in your Data Graph*

**Endpoint**
This field is **optional** and it depends on how your Tyk REST API has been configured.

Continuing with the initial example of:

```bash
GET https://api.vatcomply.com/vat?vat_number={VAT_NUMBER} HTTP/1.1
```

If Tyk REST API uses `https://api.vatcomply.com/` as **Target URL** then to complete the request path the following needs to be added in **Endpoint** field:

```curl
/vat?vat_number={{.arguments.code}}
```

{{< note success >}}
**Note**  
The `{{.arguments.code}}` part of the endpoint configuration refers to `code: String` argument defined in Data Graph schema for `vatcheck` query.

With that Tyk will be able to parse the argument your consumer provides with their query and inject it into the REST API call to get the data that is being asked for.

Once you start typing the first `{` brace, Tyk Dashboard will show you a list of options to choose from, entirely based on your Data Graph schema. Just click the one you need.
{{< /note >}}

In case the Tyk REST API target URL does not need any additional extensions, you can leave this field blank.

**Method**
Next step is to choose the method you want to use with the data source. For queries it will usually be `GET`.

Choosing the method is **mandatory**.

**Add headers**
By ticking the *Add headers* box you will be able to provide a list of key/value pairs that will be sent to your REST data source each time consumer interacts w your Data Graph.

This is an **optional** setting.

UDG is capable of forwarding the headers your consumers send with their request to multiple data sources. To know more about header forwarding see [this]({{< ref "/universal-data-graph/getting-started/header-forwarding">}}) section.

**Field mapping**
This setting allows you to define how Tyk's Data Graph engine should traverse the data source response, to parse the part you want. This is an **optional** setting and it is disabled by default.

It is useful for more complex configurations, which are explained in detail [here]({{< ref "/universal-data-graph/concepts/field_mappings">}}).

The final result should look like this:

{{< img src="/img/dashboard/udg/getting-started/data-source-configuration.png" alt="Data source configuration">}}

To save data source configuration click **Save** and then update the Data Graph by clicking **Update**.

{{< tab_end >}}
{{< tab_start "Tyk Gateway API" >}}

Using Tyk Gateway API you will need to configure Tyk Definition correctly in order to connect a REST API data source to your query.

All the settings will be done in `"graphql"` object of Tyk Definition JSON.

Make sure your execution mode is set as:
```bash
"execution_mode": "executionEngine"
```

Next step is to use `"engine"` object to connect the data source and correctly configure all details. This is an empty object:

```bash
"engine": {
    "field_configs": [],
    "data_sources": []
     }
```

`"field_configs"` contains the configuration of the field (or fields) from your Data Graph schema, which will have the data source connected. This is a basic **required** configuration for that object:

```bash
"field_configs": [
    {
        "type_name": "Query",
        "field_name": "vatcheck",
        "disable_default_mapping": true,
        "path": [
            ""
        ]
    }
]
```

**type_name** *string*
This is the name of the type from your Data Graph schema where under which the field is located. 
*In this case it's `Query` because we are connecting data source for it.*

**field_name** *string*
The name of the field to which data source should be connected.

**disable_default_mapping** *boolean*
This setting allows you to define how Tyk's Data Graph engine should traverse the data source response, to parse the part you want. By default it is set to `true`.

It is useful for more complex configurations, which are explained in detail [here]({{< ref "/universal-data-graph/concepts/field_mappings">}}).

**path** *array*
This is only required when `disable_default_mapping` is set to `false`. Otherwise should be left empty.

`"data_sources"` contains the configurations for all data sources. Those configurations can later be re-used with other fields of your current Data Graph. Here's a basic **required** configuration for this object:

```bash
"data_sources": [
    {
        "kind": "REST",
        "name": "vat-check-main",
        "internal": true,
        "root_fields": [
            {
                "type": "Query",
                "fields": [
                    "vatcheck"
                ]
            }
        ],
        "config": {
            "url": "tyk://<tyk-api-id>/vat?vat_number={{.arguments.code}}",
            "method": "GET",
            "body": "",
            "headers": {
              "additional_information": "someValue"
            }
        }
    }
]
```

**kind** *string*
The kind of the upstream data source. Possible values: `REST`, `GraphQL` and `Kafka`.

**name** *string*
Data source name

**internal** *boolean*
`true` if you are using a REST API that has already been created before in yout Tyk Gateway.
`false` for external data sources that do not exist in your Tyk environment.

**root_fields** *array*
An array of fields, from your Data Graph schema, that this data source should be connected to.

*There will often just be one element in this array, but in case you want to re-use the same data source with another field, this is where you indicate that*

**config** *object*
Details of the data source config

**url**
Full URL of the data source you want to use. If you're using a Tyk REST API, then you can refer to it by its API ID.

{{< note success >}}
**Note**  
The `{{.arguments.code}}` part of the endpurloint configuration refers to `code: String` argument defined in Data Graph schema for `vatcheck` query.

With that Tyk will be able to parse the argument your consumer provides with their query and inject it into the REST API call to get the data that is being asked for.
{{< /note >}}

**method** *string*
HTTP request method that should be used when send a request to the data source.

**body** *string*
HTTP request body to send to upstream. For `GET` requests it will usually be empty, but might need to be set when connecting data source to a mutation root type.


**headers** *object*
A set of header key/value pairs that you want to send with each request to your data source.

*Header values* can reference [request context variables]({{< ref "/context-variables">}}).

{{< tab_end >}}
{{< tabs_end >}}

#### Using external REST data source for query

The configuration for this type of data source is almost identical to **Tyk REST** with the exception of `url` field. In this case the `url` has to be provided explicitl, not as a reference to a Tyk API. For example:

```bash
"data_sources": [
    {
        "kind": "REST",
        "name": "vatcheck",
        "internal": false,
        "root_fields": [
            {
                "type": "Query",
                "fields": [
                    "vatcheck"
                ]
            }
        ],
        "config": {
            "url": "https://api.vatcomply.com/vat?vat_number={{.arguments.code}}",
            "method": "GET",
            "body": "",
            "headers": {}
        }
    }
]
```

### Using internal GQL data source for query

To create a GQL API in Tyk refer to [this guide]({{< ref "/getting-started/create-api">}}) first. Once done, you can come back to your Data Graph.



### Using external GQL data source for query