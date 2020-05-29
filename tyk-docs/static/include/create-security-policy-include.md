## Introduction

A security policy encapsulates several options that can be applied to a key. It acts as a template that can override individual sections of an API key (or identity) in Tyk.

See [What is a Security Policy?][8]


## Tutorial: Create a security policy with the Dashboard

We have a video walkthrough for creating an security policy with the Dashboard.

<iframe width="870" height="480" src="https://www.youtube.com/embed/aqWujsdoU-s" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

To create a security policy with the Dashboard, follow these steps:

### Step 1: Select "Policies" from the "System Management" section

![Policies menu link location](/docs/img/2.10/policies_menu.png)

Your current policies will be displayed

![Current Policies](/docs/img/2.10/policy_list.png)

### Step 2: Click ADD POLICY

![Add policy button](/docs/img/2.10/add_policy.png)


### Step 3: Select an API to apply the policy Access Rights to

![Policy name form](/docs/img/2.10/select_api_policy.png)

To select an API, you can either:

* Scroll through your API Name list
* Use the Search field
* You can also Group by Authentication Type to filter your APIs
* You can also Group by Category 

All policies require a descriptive name, this helps you to reference it later, and it will appear in drop-down options where you can attach policies to objects such as Keys or OAuth client IDs.

### Step 4: Setting Global Rate Limits and Quota

![Global Rates](/docs/img/2.10/global_limits_policies.png)

These settings will be applied to all APIs that the policy is applied to. You can override these settings by turning Set per API Rate Limits and Quota on for the API you selected in Step 3.

#### Path Based Permissions

You can also use a security policy to apply restrictions on a particular path and method. Granular path control allows you to define which methods and paths a key is allowed to access on a per API-version basis. See [Secure your APIs by Method and Path](/docs/basic-config-and-security/security/security-policies/secure-apis-method-path/) for more details

![Path and Method](/docs/img/2.10/path_and_method.png)


### Step 4: Set Rate limits

![Rate limit form][4]

A rate limit is enforced on all keys, set the number of requests per second that a user of a key with this policy is allowed to use.

> **NOTE:** The Rate Limit set by a policy will override the limits applied to an individual key.

### Step 5: Set Usage Quotas

![Quota form][5]

Usage quotas limit the number of total requests a user is allowed to have over a longer period of time. So while a rate limit is a rolling window, a quota is an absolute maximum that a user is allowed to have over a week, a day or a month.

Usage quotas can only be a positive number, or -1 (unlimited).

> **NOTE:** The Usage Quota set by a policy will override a quota applied to an individual key.

#### Limits and Quotas per API

![Quotes Per API][9]

Select **Enable Limits** in this section, if you want to set different Rate Limits and Quotas for each individual API added in the Access Rights section.

Click **Add Limits** for each API and set the limits and quotas in the pop-up that is displayed.

This is available from v1.8.0 of the Tyk Dashboard.


### Step 6: Add a security entry

![Add an access rule][6]

**Required** - A security entry is required for all policies (even partitioned ones) as we need to ensure access is always explicit for APIs managed by Tyk. Click **Add** to apply an API to the Access Rule.

### Step 7: Add Tags and Metadata

![Tags and Metadata](/docs/img/dashboard/system-management/tags_meta2.9.3.png)

* Tags that you add can be used in the Analytics for the policy. Tag descriptions are case sensitive.
* Metadata such as User IDs can be used by middleware components. See [Session Metadata](/docs/getting-started/key-concepts/session-meta-data/) for more details.  


### Step 8: Save the policy

![Save a Policy][7]

To make the policy active, click **CREATE** . Once the policy is saved, you will be able to use it when creating keys, OAuth clients and custom JWT tokens.

## Tutorial: Create a security policy with the API

Security Policies can be created with a single call to the API. It is very similar to the token creation process. To generate a simple security policy using the Tyk Cloud API you can use the following curl command:
```{.copyWrapper}
curl -X POST -H "authorization: {API-TOKEN}" \
  -s \
  -H "Content-Type: application/json" \
  -X POST \
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
  }' https://admin.cloud.tyk.io/api/portal/policies | python -mjson.tool
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
> **NOTE**: `apply_policy_id` is supported, but has now been deprecated. `apply_policies` is now used to list your policy IDs as an array. This supports the **Multiple Policy** feature introduced in the  **v2.4/1.4** release.

For more information on how policies are constructed and a detailed explanation of their properties, please see the [Security Policies](/docs/security/security-policies/) section.

 [1]: /docs/img/dashboard/system-management/policies2.7.png
 [2]: /docs/img/dashboard/system-management/add_policy_new_2.5.png
 [3]: /docs/img/dashboard/system-management/policy_name_2.5.png
 [4]: /docs/img/dashboard/system-management/rate_limit_2.5.png
 [5]: /docs/img/dashboard/system-management/usage_quotas_2.5.png
 [6]: /docs/img/dashboard/system-management/access_rights_2.5.png
 [7]: /docs/img/dashboard/system-management/keys_create_2.5.png
 [8]: /docs/concepts/what-is-a-security-policy/
 [9]: /docs/img/dashboard/system-management/limits-quotas_per-api.png