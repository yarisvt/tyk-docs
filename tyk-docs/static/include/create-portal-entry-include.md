## Tutorial: Create a portal entry

You can use the dashboard to create a portal that allows developers to access the APIs you create.

### Prerequisites for a portal catalogue entry:

*   An API configured and live on your gateway
*   The API must be *Closed* (i.e. it must use either Auth Token or Basic Auth security mechanisms)
*   A security policy configured to grant access to the API

> **Warning**: Without these prerequisites, you may get a 404 error when trying to access the portal.

### Step 1: Select "Catalogue" from the "Portal Management" section

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

### Step 5: Show the API

An API will not be published until you select **Show API**:

![API active checkbox][5]

### Step 6: Add Documentation
You can add import documentation in the following formats:
* From a Swagger file
* From a Swagger URL
* From API Blueprint

From v1.4, you can add your documentation before or after saving your API.

![Add Docs][8]

### Step 6: Save the API

To save the API, click **Update**.

### Step 7: Take a look

You can now visit your portal to see the API catalogue entry. Select Open Your Portal:

![Portal nav menu location][7]

[1]: /docs/img/dashboard/portal-management/nav_catalogue_new.png
[2]: /docs/img/dashboard/portal-management/add_api_cat_button_new.png
[3]: /docs/img/dashboard/portal-management/portalPolicy.png
[4]: /docs/img/dashboard/portal-management/portalDescription.png
[5]: /docs/img/dashboard/portal-management/show_api_cat_new.png
[6]: /docs/img/dashboard/portal-management/saveAPI.png
[7]: /docs/img/dashboard/portal-management/visitPortal.png
[8]: /docs/img/dashboard/portal-management/cat_add_docs_new.png
