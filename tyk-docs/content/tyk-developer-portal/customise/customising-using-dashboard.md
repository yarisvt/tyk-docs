---
date: 2017-03-24T17:18:28Z
title: Customise Pages with CSS
linktitle: Pages with CSS
menu:
  main:
    parent: "Customise"
weight: 3 
---

The main customisation that can be done with the Tyk Dashboard is via the CSS Editor.

#### Step 1: Open CSS Editor

Click **CSS** from the **Portal Management** menu.

![Portal management menu][1]

#### Step 2: Make CSS Amendments

In the CSS Editor, add the classes that you would like to override in the home page. For Tyk Cloud and Multi-Cloud users, this will already be filled in with some initial overrides for you:

![Portal CSS editor][2]

#### Step 3: Make Email CSS Amendments

If you wish to customise how emails are displayed to end-users, then you can also add new classes to the Email CSS editor, these classes will be added in-line to the email that is sent out:

### Updating CSS With API
Alternatively, you can update the CSS with an API call.  the below `curl` command will update the CSS for your organization.

```{.copyWrapper}
curl -X PUT http://tyk-dashboard.com/api/portal/css \
  -H "authorization: 8f297c42596541034c37ea8dc9349fef" \
  -s \
  -H "Content-Type: application/json" \
  -d '{
    "email_css": "",
    "id":{CSS_BLOCK_ID},
    "org_id": "5cca0452817e000001c2a543",
    "page_css": ".btn-success {background-color: magenta}"
  }'
```

To get the CSS_BLOCK_ID, run this `curl` command:

```{.copyWrapper}
curl www.tyk-test.com:3000/api/portal/css \
-H "Authorization:8f297c42596541034c37ea8dc9349fef" | python -mjson.tool
```
Response:
```{.copyWrapper}
{
    "email_css": "",
    "id": "5d264778f56e1a89e7c47d7d",
    "org_id": "5d0290bff56e1a636ac540c0",
    "page_css": ".btn-success {background-color: magenta1}"
}
```
The `id` is the css_block_id to use in the update Curl above.

![Email CSS editor][3]

Once you have finished making your changes, click the "Update" button, the new CSS should be available almost immediately on your site.

 [1]: /docs/img/dashboard/portal-management/portal_man_css.png
 [2]: /docs/img/dashboard/portal-management/portal_site_css.png
 [3]: /docs/img/dashboard/portal-management/portal_email_css.png