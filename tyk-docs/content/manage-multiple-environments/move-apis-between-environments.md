---
date: 2017-03-24T12:23:18Z
title: Move APIs between environments
menu:
  main:
    parent: "Manage Multiple Environments"
weight: 0 
---

It is possible to move APIs between Tyk environments in two ways:

1.  If the environments are both On-Premises installations and are sharing a Tyk Dashboard (and optionally an MDCB instance) then you can use API and Gateway tagging to transparently and effortlessly move an API from one environment to another.

2.  If the API dashboards are separate and you wish to migrate API Definitions between two completely segregated environments (e.g. migrating to new hardware or a new DC), then you can use the Export functionality of the Dashboard to download the API definition as JSON and import it into your new installation.

The second option is described here as API Sharding, and Tagging is described in detail elsewhere under *Managing multiple environments*.

### Step 1: Go to the API designer

Visit the API Designer and select your API:

![API designer][1]

### Step 2: Export the API

Select the "Export" button in the top right:

![Export button location][2]

### Step 3: Save the API

Save and rename the JSON file:

![Save JSON file][3]

### Step 4: Import into new environment

In your new environment, select *Import*:

![Select import][4]

### Step 5: Generate the new API

Paste the contents of the file into the window and click the "Generate API" button:

![Generate API button][5]

This will now import the API Definition into your new environment, if you have kept the API ID in the JSON document as is, the ID will remain the same.

> **Important**: The ID you use in with any Dashboard API integrations will change as the documents physical ID will have changed with the import.

[1]: /docs/img/dashboard/system-management/registeredAPIs.png
[2]: /docs/img/dashboard/system-management/exportAPI.png
[3]: /docs/img/dashboard/system-management/exportSaveAPI.png
[4]: /docs/img/dashboard/system-management/importAPI.png
[5]: /docs/img/dashboard/system-management/generateAPI.png