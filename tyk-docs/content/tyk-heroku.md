---
title: Deploy Tyk to Heroku Walkthrough
notoc: true
---
## <a name="deploy"></a>Deploy Tyk to Heroku

1. After signing up to Tyk, click the "Reclaim the Invite" button.
2. Click the The "Deploy to Heroku" Button that is displayed. 
![Deploy to Heroku][1]
3. The Heroku Account Login page will be displayed.
![Heroku login][2]
4. Enter your existing Heroku account details, or click "Sign Up" to create an account.
5. After logging in, a Create App page is displayed.
![Create App][3]
6. Give it a suitable name and click "Deploy App", (you may need to provide Heroku with a Credit Card to proceed past this point, depending on your account setup).
7. Your Heroku app is deployed. Click "Manage App" to  manage the app from Heroku or click "View" to follow the Tyk Hybrid tutorials to get your first API set up with Tyk.
![Manage App][4]

## <a name="manage"></a>Heroku Dashboard

When you click "Manage App", the Heroku Dashboard is displayed:
![Heroku Dashboard][5]

The Heroku dashboard contains information and settings about your deployed Tyk App.

> **NOTE**: Before you can click "Open app" from the Heroku Dashboard, you must have an API configured in Tyk. You can log in to your Tyk Dashboard from https://admin.cloud.tyk.io/#/. For tutorials on creating APIs, Keys and Policies, see [here](/docs/get-started/with-tyk-cloud/tutorials/).

### Overview
The Overview screen displays information about your Heroku add-ons and the latest activity for your deployed app.
### Resources
The Resources screen lists Any Heroku dynos that are available to you. The dynos available may depend on the level of account you have.
### Deploy
The Deploy screen displays the various deployment methods and pipelines you can use with your app.
### Metrics
Depending on your account, you can see various metrics for your Tyk deployed app.



[1]: /docs/img/cloud/deploy_to_heroku.png
[2]: /docs/img/cloud/heroku_login.png
[3]: /docs/img/cloud/deploy_heroku_app.png
[4]: /docs/img/cloud/manage_heroku_app.png
[5]: /docs/img/cloud/heroku-dashboard.png