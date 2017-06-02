---
date: 2017-03-23T11:04:58Z
title: Create an API Token with Pro Edition
menu:
  main:
    parent: "Tyk On-Premises Pro Edition"
weight: 2
---

## <a name="with-dashboard"></a>Tutorial: Create an API Token with the Dashboard


The Tyk Dashboard is the simplest way to generate a new token.

### Step 1: Navigate to the keys management page

![Keys menu link location][1]

### Step 2: Click the *add key* button

![Add key button location][2]

### Step 3: Set the key access rights

Leave all the defaults except for selecting `Test API` from the access rights drop-down and clicking `Add`, this will add an access rule to the token for the API we just created. This is important, Tyk keys **must** have an access rule set.

![Access rights location][3]

### Step 4: Click the create button

![Create button location][4]

The page should scroll to the top and you will see the new key on the right-hand side in a green box.

![Key success message location][5]

That's it, you've created a key - now we can try and use it.

## <a name="with-api"></a>Tutorial: Create an API Token with the API

To create an API Token, we will need the API ID that we wish to grant the token access to, then creating the token is a very simple API call to the endpoint. In a Pro installation, we use the dashboard endpoint instead of the gateway endpoint, as in a Pro installation we should always integrate with the dashboard API as it has a more granular security model.

You will also need your own API Key, to get these values:

1.  Click on "System Management" -> "Users" -> Your user name -> Edit.
2.  The API key is under marked as **Tyk Dashboard API Access Credentials**, copy this somewhere you can reference it. 

![API key location][6]

3.  Select the "System Management" -> APIs, beside your new API Name is listed the API ID, store this as well. 

![API ID location][7]

Once you have these values, you can use them to access the dashboard API, the below `curl` command will generate a token for one of your APIs:
```
    curl -X POST -H "authorization: 1238b7e0e2ff4c2957321724409ee2eb" 
     -s 
     -H "Content-Type: application/json" 
     -X POST 
     -d '{
        "allowance": 1000,
        "rate": 1000,
        "per": 1,
        "expires": -1,
        "quota_max": -1,
        "quota_renews": 1449051461,
        "quota_remaining": -1,
        "quota_renewal_rate": 60,
        "access_rights": {
            "ad5004d961a147d4649fd3216694ebe2": {
                "api_id": "ad5004d961a147d4649fd3216694ebe2",
                "api_name": "test-api",
                "versions": ["Default"]
            }
        },
        "meta_data": {}
     }' http://localhost:3000/api/keys | python -mjson.tool
```

You will see a response with your new token:
```
    {
        "action": "create",
        "key": "c2cb92a78f944e9a46de793fe28e847e",
        "status": "ok"
    }
```

The value returned in the `key` parameter of the response is the access token you can now use to access the API that was specified in the `access_rights` section of the call


[1]: /docs/img/dashboard/system-management/NavKeys.png
[2]: /docs/img/dashboard/system-management/addKeyButton.png
[3]: /docs/img/dashboard/system-management/accessRights.png
[4]: /docs/img/dashboard/system-management/createKeyButton.png
[5]: /docs/img/dashboard/system-management/keyAdded.png
[6]: /docs/img/dashboard/system-management/APIKey.png
[7]: /docs/img/dashboard/system-management/APIId.png