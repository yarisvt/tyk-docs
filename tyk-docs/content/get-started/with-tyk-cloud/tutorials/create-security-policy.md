---
date: 2017-03-13T14:32:26Z
title: Create a security policy with Cloud
weight: 0
menu:
    main: 
        parent: "Tutorials"
---

## <a name="what-is-a-policy"></a>What is a security policy ?

A policy encapsulates several security options that can be applied to a token. It acts as a template that can override individual sections of an API token (or identity) in Tyk. A good example is if you had 10,000 API tokens issued, how would you ensure that all 10,000 users received an upgraded quota, or access to a new API that you have published?

You could manually modify all 10,000 tokens, or you could apply a policy to each of those tokens when you create them, and then just modify the policy once.

Policies can set:

*   Access lists for API and versions
*   Access lists for method and path (granular control)
*   Rate limit for a user
*   Quota for a user

Each of these can also be overridden in isolation using the partitioning options. When partitioning a policy, only one segment of the policy will be applied to the token. So, for example, if you need to set quotas and rate limits on a per client basis, but want to manage access control across all of your clients, a partitioned policy with only the ACL enabled would achieve this.

## <a name="with-dashboard"></a>Tutorial: Create a security policy with the Dashboard

To create a security policy with the Dashboard, follow these steps:

### Step 1: Navigate to the policies management page

![Policies menu link location][1]

### Step 2: Click the *add policy* button

![Add policy button location][2]

This page lists out all the policies that you have created. Once you have reached the policies list you need to click the *add policy* button.

### Step 3: Give the policy a name

![Policy name form][3]

All policies require a descriptive name, this helps you to reference it later, and it will appear in drop-down options where you can attach policies to objects such as tokens or OAuth client IDs.

### Step 4: Set the rate limit

![Rate limit form][4]

A rate limit is enforced on all tokens, set the number of requests per second that a bearer of a token with this policy is allowed to use.

### Step 5: Set the quota

![Quota form][5]

A quota limits the number of total requests a user is allowed to have over a longer period of time, so while a rate limit is a rolling window, think of a quota as an absolute maximum that a user is allowed to have over a week, a day or a month.

### Step 6: Add a security entry

![Add an access rule][6]

**Required** - A security entry is required for all policies (even partitioned ones) as we need to ensure access is always explicit for APIs managed by Tyk.

### Step 7: Save the policy

![Save a Policy][7]

To make the policy active, select the `Create` button. Once the policy is saved, you will be able to use it when generating tokens, OAuth clients and custom JWT tokens.

## <a name="with-api"></a>Tutorial: Create a security policy with the API

Security Policies can be created with a single call to the API. It is very similar to the token creation process. To generate a simple security policy using the Tyk Cloud API you can use the following curl command:
```
    curl -X POST -H "authorization: {API-TOKEN}"
     -s
     -H "Content-Type: application/json"
     -X POST
     -d '{
          "access_rights": {
            "{API-ID}": {
              "allowed_urls": [],
              "api_id": "{API-ID}",
              "api_name": "{API-NAME}",
              "versions": [
                "Default"
              ]
            }
          },
          "active": true,
          "name": "POLICY NAME",
          "rate": 100,
          "per": 1,
          "quota_max": 10000,
          "quota_renewal_rate": 3600,
          "tags": ["Startup Users"]
        }'
     https://admin.cloud.tyk.io/api/portal/policies | python -mjson.tool
```

You must replace:

*   `{API-TOKEN}`: Your API Token for the Dashboard API.
*   `{API-ID}`: The API ID you wish this policy to grant access to, there can be more than one of these entries.
*   `{API-NAME}`: The name of the API that is being granted access to (this is not required, but helps when debugging or auditing).
*   `POLICY NAME`: The name of this security policy.

The main elements that are important are:

*   `access_rights`: A list of objects representing which APIs that you have configured to grant access to.
*   `rate` and `per`: The number of requests to allow per period.
*   `quota_max`: The maximum number of allowed requests over a quota period.
*   `quota_renewal_rate`: how often the quota resets, in seconds. In this case we have set it to renew every hour.

When you send this request, you should see the following reply with your Policy ID:
```
    {
        "Message": "577a8589428a6b0001000017",
        "Meta": null,
        "Status": "OK"
    }
```

You can then use this policy ID in the `apply_policy_id` field of an API token. Please see the relevant documentation on session objects for more information about how tokens are attached to policies.

For more information on how policies are constructed and a detailed explanation of their properties, please see the Security Policies section.

 [1]: /img/dashboard/system-management/NavPolicies.png
 [2]: /img/dashboard/system-management/AddPolicyButton.png
 [3]: /img/dashboard/system-management/policyNameField.png
 [4]: /img/dashboard/system-management/rateLimit.png
 [5]: /img/dashboard/system-management/usageQuotas.png
 [6]: /img/dashboard/system-management/securityEntry.png
 [7]: /img/dashboard/system-management/savePolicy.png