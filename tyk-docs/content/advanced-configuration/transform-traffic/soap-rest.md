---
title: "SOAP to REST"
date: 2020-07-10
menu:
  main:
    parent: "Transform Traffic"
weight: 9
---

## Introduction

You can transform an existing SOAP service to a JSON REST service. This can be done from the Tyk Dashboard with no coding involved, and should take around 10 minutes to perform the transform.

We also have a video which walks you through the SOAP to REST transform.

{{< youtube PEwG8F8PxUs >}}

## Prerequisites

An existing SOAP service and the WSDL definition. For this example we will use:

- Upstream Target - [https://www.dataaccess.com/webservicesserver/numberconversion.wso](https://www.dataaccess.com/webservicesserver/numberconversion.wso)
- The WSDL definition from - [https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL](https://www.dataaccess.com/webservicesserver/numberconversion.wso?WSDL)
- Postman Client (or other endpoint testing tool)

## Step 1: Import the WSDL API

1. Select APIs from the System Management menu

![APIs Menu](/docs/img/2.10/apis_menu.png)

2. Click Import API

![Import API](/docs/img/2.10/import_api_button.png)

3. Select **From WSDL** from the Import an API Definition window
4. In the **Upstream Target** field, enter `https://www.dataaccess.com/webservicesserver/numberconversion.wso` as listed in the Prerequisites.
5. Paste the WSDL definition from the link in Prerequisites (you should remove the `<script>` code from line 2)
6. Click **Generate API**. You should now have an API named `NumberService` in your API list

![NumberService API](/docs/img/2.10/numberservice_api.png)

## Step2: Add the transforms to an Endpoint

1. From the API list, select Edit from the Actions menu for the `NumberService` API
2. Select the **Endpoint Designer** tab. You should see 2 POST endpoints that were imported. We will apply the transforms to one of the endpoints

![Endpoints](/docs/img/2.10/numberservice_endpoints.png)

3. Expand the `NumberToWords` endpoint. The following plugins should have been added as part of the import process.
  - URL rewrite
  - Track endpoint
4. Add the following plugins from the **Plugins** drop-down list:
  - Body transform
  - Modify headers

## Step 4: Modify the Body Transform Plugin

### Set up the Request

We use the `{{.FieldName}}` Golang template syntax to access the JSON request. For this template we will use `{{.numberToConvert}}`.

1. Expand the Body transform plugin. From the Request tab, copy the following into the Template section:

```{.CopyWrapper}
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>{{.numberToConvert}}</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```

2. In the Input field, enter the following:

```{.CopyWrapper}
{
    "numberToConvert": 35
}
```
> **NOTE**: the '35' integer can be any number you want to convert

3. Click **Test**. You should get the following in the Output field:

```
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="http://www.dataaccess.com/webservicesserver/">
   <soapenv:Header/>
   <soapenv:Body>
      <web:NumberToDollars>
         <web:dNum>35</web:dNum>
      </web:NumberToDollars>
   </soapenv:Body>
</soapenv:Envelope>
```
### Set up the Response

Again, for the response we will be using the `{{.FieldName}}` syntax as the following `{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}`

1. For the Input Type, select XML

![Response Input Type](/docs/img/2.10/body_trans_response_input.png)

2. In the Template section enter:

```{.CopyWrapper}

{
    "convertedNumber": "{{.Envelope.Body.NumberToDollarsResponse.NumberToDollarsResult}}"
}
```
3. Enter the folowing into the input field:

```{.CopyWrapper}
<soap12:Envelope xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
  <soap12:Body>
    <NumberToDollarsResponse xmlns="http://www.dataaccess.com/webservicesserver/">
      <NumberToDollarsResult>thirty five dollars</NumberToDollarsResult>
    </NumberToDollarsResponse>
  </soap12:Body>
</soap12:Envelope>
```
4. Click Test. You should get the following in the Output field:

```
{
    "convertedNumber": "thirty five dollars"
}
```
## Step 5: Change the Content-Type Header

We now need to change the `content-type` header to allow the SOAP service to receive the payload in XML. We do this by using the **Modify header** plugin

1. Expand the Modify Header plugin
2. From the Request tab enter the following in the **Add this header** section
  - Header Name: `content-type`
  - Header Value: `text/xlm`

![Modify Header](/docs/img/2.10/add_header_type.png)

3. Click **Add**
4. Click **Update**

![Update API](/docs/img/2.10/update_number_conversion.png)

## Testing the Endpoint

You now need to test the endpoint. We are going to use Postman.

> NOTE: We have not setup any Authentication for this API, it has defaulted to `Open (Keyless)`.

1. Copy the URL for your NumberConversion API with the NumberToWords endpoint - `https://tyk-url/numberconversion/NumberToWords/`
2. Paste it as a POST URL in the Postman URL Request field
3. Enter the following as a raw Body request

```{.CopyWrapper}
{
    "numberToConvert": 35
}
```
Your Postman request should look similar to below (apart from the URL used)

![Postman](/docs/img/2.10/postman_soap_rest.png)