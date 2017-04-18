---
date: 2017-03-24T17:33:13Z
title: Developer Profiles
menu:
  main:
    parent: "Publish"
weight: 0 
---

Users that are signed up to your portal are called "Developers", these users have access to a Dashboard page which show them their API usage over the past 7 days as well as the policy and quota limits on their relevant keys.

Developers can sign up to multiple APIs using the API catalogue.

Developer accounts belong to an organisation ID, so accounts cannot be shared across organisations in a Tyk Dashboard setup.

### Navigate to the developers section

![Developer Navigate][1]

#### Select *Add Developer*

![Developer Profile Create][2]

### Add the developer's basic details

![Developer Profile Create Details][3]

### Developer Profile Overview

The first panel in a developer profile will show you an avatar (if they have a Gravatar-enabled email address), as well as the basic fields of their signup:

![Developer profile detail][4]

### Developer usage

The next panel will show you their apI usage as an aggregate for all the tokens that they have generated with their developer access:

![Developer usage graph][5]

### Developer subscriptions

In this panel, you will be able to see the various policies that the developer has signed up to, and enable you to revoke or update their access to a different policy (e.g. upgrade them to a higher policy tier).

Should you wish to drill down into the specific usage patterns for each token, you can do this by selecting the analytics button beside the subscription.

![Developer subscriptions][6]

### Edit the developer profile

All fields in the profile are editable, in this section you can select a field and modify that data for the developer - this will not affect any tokens they may have, but it will affect how it appears in their developer Dashboard in you Portal.

![Developer edit form][7]

Developers can edit this data themselves in their accounts section.

### Search for a developer

You can search for a developer simply by start typing in the search field.

This option is only available from Dashboard v1.3.1.2 and onwards.

![Developer Profile Search][8]

 [1]: /docs/img/dashboard/portal-management/developersNav.png
 [2]: /docs/img/dashboard/portal-management/addDeveloperButton.png
 [3]: /docs/img/dashboard/portal-management/developerDetails.png
 [4]: /docs/img/dashboard/portal-management/developerProfileOverview.png
 [5]: /docs/img/dashboard/portal-management/developerUsage.png
 [6]: /docs/img/dashboard/portal-management/developerSubscriptions.png
 [7]: /docs/img/dashboard/portal-management/developerEdit.png
 [8]: /docs/img/dashboard/portal-management/developerSearch.png

