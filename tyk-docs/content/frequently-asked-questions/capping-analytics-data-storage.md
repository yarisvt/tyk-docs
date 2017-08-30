---
date: 2017-03-27T16:13:15+01:00
title: Capping analytics data storage
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---

If you wish to reduce or manage the amount of data in your MongoDB, you can also add an expire index to the collection and have Tyk enforce organisation quotas. You have two ways of doing this. A time based cap and a size based cap.

## <a name="time-based"></a> Time Based Cap

To add an expiry index to your analytics log data simply follow these three steps.

### Step 1: Add the index to MongoDB

Run this command in your preferred MongoDB tool:

```{.copyWrapper}
    db.tyk_analytics.createIndex( { "expireAt": 1 }, { expireAfterSeconds: 0 } )
```

### Step 2. Create an organisation quota

```{.copyWrapper}
    curl --header "x-tyk-authorization: {tyk-gateway-secret}" --header "content-type: application/json" --data @expiry.txt http://{tyk-gateway-ip}:{port}/tyk/org/keys/{org-id}
```

@expiry.txt:

```{.copyWrapper}
    {
    "allowance": 10000,
    "rate": 10000,
    "per": 0,
    "expires": 0,
    "quota_max": -1,
    "quota_renews": 1406121006,
    "quota_remaining": 100000,
    "quota_renewal_rate": 100000,
    "org_id": "{your-org-id}",
    "data_expires": 86400
    }
```

Set the data expires to a time in seconds for it to expire. Tyk will calculate the expiry date for you.

### Step 3: Make sure the setting is enabled in `tyk.conf`

```
    "enforce_org_data_age": true, 
    "enforce_org_quota": false
```

> **Note**: This will only work for v2.2.0.23, if you are running an earlier patch, you will need to `enforce_org_quota` set to `true`.

## <a name="size-based"></a> Size Based Cap

### Add the Size Cap

>  **Note**: The size value should be in bytes, and we recommend using a value just under the amount of RAM on your machine.

Run this command in your MongoDB shell:

```{.copyWrapper}
    use tyk_analytics
    db.runCommand({"convertToCapped": "tyk_analytics", size: 100000});
```

### Adding the Size Cap if using a mongo_selective Pump

The `mongo_selective` pump stores data on a per organisation basis. You will have to run the following command for an individual organisation as follows.


>  **Note**: The `LogId` will be a long number.

Run this command in your MongoDB shell:

```{.copyWrapper}
    db.runCommand({"convertToCapped": "z_tyk_analyticz_LogId", size: 100000});
```