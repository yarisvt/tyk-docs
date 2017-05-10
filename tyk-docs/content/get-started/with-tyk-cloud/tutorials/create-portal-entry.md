---
date: 2017-03-15T16:33:46Z
title: Create a portal entry with Cloud
menu:
  main:
    parent: "Tutorials"
weight: 4
---

## Tutorial: Create a portal entry

You can use the dashboard to create a portal that allows developers to access the APIs you create.

### Prerequisites for a portal catalogue entry:

*   An API configured and live on your gateway
*   The API must be *Closed* (i.e. it must use either Auth Token or Basic Auth security mechanisms)
*   A security policy configured to grant access to the API

### Step 1: Select “Catalogue” from the “Portal Management” section

First you will need to navigate to the portal catalogue, to do so, select the option from the left hand nav:

![Catalogue menu link location][1]

### Step 2: Click Add new API

This page displays all of the catalogue entries you have defined, whether they have documentation attached and whether they are active on the portal or not. Click **Add new API**.

![Add new API button location][2]

### Step 3: Set a Public API Name and associate a security policy

When publishing an API with Tyk, you are not publishing a single API, but instead you are publishing access to a group of APIs. The reason for this is to ensure that it is possible to compose and bundle APIs that are managed into APIs that are published. Tyk treats these as separate, so the thing that is published on the portal is not the same as the actual API being managed by Tyk, one is a logical managed API and the other (the published catalogue version) is a facade.

Since API policies allow the bundling of access control lists of multiple APIs, it is actually this that you are granting access to. Any developer that signs up for this API, will be granted a bearer token that has this policy as a baseline template, or as a "plan".

![Portal name and security policy][3]

Please note:

1.  You will only see security policies for valid APIs in the drop-down list for the policies
2.  The policy must be "closed" (see Prerequisites)

### Step 4: Add a description

All catalogue entries can have a description. You can use Markdown formatting in these fields:

![Description form][4]

### Step 5: Enable the API

An API will not be published until you mark it as active. Ensure this option is selected, otherwise the API entry will not appear:

![API active checkbox][5]

### Step 6: Save the API

You'll notice that you haven't added any docs yet. You can only add these after you have created the API.

To save the API, click the `update` button:

![Update button location][6]

### Step 7: Take a look

You can now visit your portal to see the API catalogue entry. Select Open Your Portal:

![Portal nav menu location][7]

[1]: /docs/img/dashboard/portal-management/portal_catalogue.png
[2]: /docs/img/dashboard/system-management/addAPIbutton.png
[3]: /docs/img/dashboard/portal-management/portalPolicy.png
[4]: /docs/img/dashboard/portal-management/portalDescription.png
[5]: /docs/img/dashboard/portal-management/enableAPI.png
[6]: /docs/img/dashboard/portal-management/saveAPI.png
[7]: /docs/img/dashboard/portal-management/visitPortal.png

