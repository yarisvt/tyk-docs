---
date: 2017-03-24T17:14:16Z
title: Portal Tutorials
menu:
  main:
    parent: "Publish"
weight: 0 
---

Managing your portal is a key part of Tyk Dashboard, this section aims to provide some tutorials to help you get started working with your portal and publishing your API programmes to the public.

## Publish to your Developer Portal

### Step 1: Create your first API

If you haven't already, create an API in your Dashboard, your Portal will not be visible or live until you have at least one live API being managed by Tyk, this tutorial assumes you've created your first API using the Dashboard and called it "Test API".

> **Note for Tyk Cloud and Hybrid users**: If you are a Cloud or Hybrid user, then skip straight to step 4.

### Step 2: Initialise all your portal settings

By default there is no Portal configured, you need to configure it by visiting the Portal settings screen, **even if you don't want to change the options**. Simply click on "Portal Management" -> "Settings", the notification view on the right will say that no configuration was detected so it was created. Your Portal won't work without this step, so it's important.

That's it, now you need to create the home page.

### Step 3: Create the home page

Go to "Pages" and Add a new page, give it any title you like (e.g. "Welcome") and then, select the "Default Home Page Template" from the Page Type section and then, at the bottom of the page, ensure "Make this page the home page" is set.

Save the page.

### Step 4: Create a Policy

When you publish an API to the Portal, Tyk actually publishes a way for developers to enrol in a policy, not the API directly.

> **Why?**: A Tyk policy can grant access to multiple APIs (so long as they all use the same access control mechanism) and set a template for any keys that are generated for the portal for things such as Tags, Rate Limits and Quotas. Another useful feature with a policy and the Portal is that when the key is generated for a developer, it can be made to expire after a certain time - e.g. a trial key.

To create a policy for your test API, under the Policies menu item, select "New Policy", you can leave all the defaults as is, except:

1.  Name the policy "Default"
2.  Select the "Test API" API in the access control section and click "Add" so it appears in the list
3.  Check the box that says "Make this policy active"

Save the policy by clicking the "Create" button.

### Step 5: Publish the API to the Portal

The API that you defined earlier is active and will work as you've seen in the previous tutorial, this time we want to use the Portal to generate a token for a named developer.

Not all APIs are visible to the Portal, only the ones you tell it about, so under the "Catalogue" section, select "Add API", on the screen that appears, then:

1.  Select your "Default" policy
2.  Fill in the description fields
3.  Ensure the "Enable this API" checkbox is checked

Save the API Catalogue entry by clicking the "Update" button.

### Step 6: Set your Portal hostname

> **A note for Cloud and Hybrid users**: This step is not required unless you have the capability to add a custom CNAME.

When you set up your Tyk installation, you will have had to, at some point, define a hostname for your portal, either as a `/etc/hosts` file entry, or as a qualified hostname such as `portal.domain.com`. To make the Dashboard aware of this:

1.  Select "Your Developer portal"
2.  Select "Set Your Portal Domain"
3.  Enter the hostname here and wait for Tyk to refresh

This process will bind your organisations' Portal to the domain name you've specified.

### Step 7: Log into your Portal

If you select "Your developer portal" -> "Open your portal", a new page will open with your new (most likely empty) Portal home page.

> **A note for Docker users**: If you are using Docker, do not use the drop-down, instead, use the domain name you defined when you set up the forward proxy for your domains - if you followed the Docker setup guide, your Dashboard will be on: `www.tyk-portal-test.com`.