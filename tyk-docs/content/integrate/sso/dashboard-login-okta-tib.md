---
date: 2018-01-24T17:02:11Z
title: Login into the Dashboard using Okta - Guide
menu:
   main:
      parent: "Single Sign On"
weight: 0
---


This is an end-to-end worked example of how you can use [Okta](https://www.okta.com/) and our Tyk Identity Broker (TIB) to log in to your Dashboard.
This guide assumes the following:
- You already have authorised access to Tyk's Dashboard. If you don't, [get the authorisation key with this doc](https://tyk.io/docs/security/dashboard/create-users/#a-name-with-api-a-create-a-dashboard-user-with-the-api).
- For simplicity, you are running TIB locally on port 3010
- You are able to edit TIB's configuration file.


## <a name="okta"></a>Okta's side
1. Create developer account on the [Okta Developer site](https://developer.okta.com/).
   You'll get a domain such as `{.copyWrapper} https://dev-XXXXX.oktapreview.com/app/UserHome`
2. Login and create Web Application as follows:
   - Under `Application`, click `Add Application`
   - Choose `Web`
   - Change the name of the app
   - Tick `Authorization Code`
   - Click `Done`

    Note: These instruction are for the new Okta's `Developer Console`, for the `Classic UI` instructions are slightly different.


3. Add a callback to TIB in your application:
   - Under `General`, click `Edit` and update the `Login redirect URIs` field with the endpoint on TIB `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
   - `{PROFILE-NAME-IN-TIB}` - Can be any string you choose, as long as you use the same one for the profile in TIB.

4. Permissions to login via Okta:
   Under `Assignments` tab, make sure group assignments is set to *everyone* (for now, you will change this later!).

5. This is how it should look like after step #4
![okta-create-app][1]
## <a name="tib"></a>TIB's Side
6. Set the profile in `profile.json` as follows:
   - Copy from your Okta client the `cliend ID`     to `ProviderConfig.UseProviders[].key`
   - Copy from your Okta client the `Client secret` to `ProviderConfig.UseProviders[].secret`
   - Add Okta's discovery url `"https://dev-XXXXX.oktapreview.com/oauth2/default/.well-known/openid-configuration"` to `ProviderConfig.UseProviders[].DiscoverURL`

   Example of a profiles.json:
```{.copyWrapper}
   {
      "ActionType": "GenerateOrLoginUserProfile",
      "ID": "{PROFILE-NAME-IN-TIB}",
      "OrgID": "5a54a74550200d0001975584",
      "IdentityHandlerConfig": {
          "DashboardCredential": "{DASHBOARD-SECRET}"
      },
      "ProviderConfig": {
          "CallbackBaseURL": "http://{TIB-DOMAIN}:{TIB-PORT}",
          "FailureRedirect": "http://{DASHBOARD-DOMAIN}:{DASHBOARD-PORT}/?fail=true",
          "UseProviders": [
          {
              "Key": "{Okta-App-Client-ID}",
              "Secret": "{Okta-App-Client-SECRET}",
              "DiscoverURL": "https://{IdP-DOMAIN}.oktapreview.com/oauth2/default/.well-known/openid-configuration",
              "Name": "openid-connect"
          }
      ]
      },
      "ProviderName": "SocialProvider",
      "ReturnURL": "http://{DASHBOARD-DOMAIN}:{DASHBOARD-PORT}/tap",
      "Type": "redirect"
  }
```

7. Start TIB by running the binary (`profiles.json` is in the same CWD)
   Follow this [link](https://tyk.io/docs/integrate/3rd-party-identity-providers/#tib) for detailed instruction to install TIB
8. Test that it works:
   From the broswer call `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
    - If it's working you'll be redirected to Okta's web page and will be asked to enter your Okta's user and password.
    - If you were successfully authenticated by Okta then you'll be redirected to the dashboard and login into it without going through the login page. Job's done!
9. If you need to update your profile then you can use TIB's REST API as follows:
``` curl http://{TIB-DOMAIN}:{TIB-PORT}/api/profiles/{PROFILE-NAME-IN-TIB} -H "Authorization: {MY-SECRET}" -H "Content-type: application/json" -X PUT --data "@./my-new-dashboard-profile.json" | prettyjson
```
   - POST and DELETE calls apply as normal
   - You can post a few profiles to TIB.
   - The full docs for [TIB REST APIs](https://tyk.io/docs/integrate/3rd-party-identity-providers/tib-rest-api/)

## <a name="flow"></a>The magic - The flow behind the scenes:
 1. The initial call to the endpoint on TIB was redirected to Okta and
 2. Okta identified the user
 3. Okta redirected the call back to TIB endpoint (according to the callback you set up on the client earlier in step 3) and from TIB
 4. TIB, via REST API call to the dashboard, created a nonce and a special session attached to it.
 5. TIB redirected the call to the dashboard to a special endpoint `/tap` ( it was defined on the profile under `ReturnURL`) with the nonce that was created.
 6. The Dashboard on the `/tap` endpoint finds the session that is attached to the `nonce`, login the user and redirect to the dashboard first page


## <a name="enhace"></a>Once it's working you can also add two more enhancements

### SSO login into the dashboard via a login page

You will need to
	- set up webserver with a login page and a form for `user` and `password`
	- Update `tyk_analytics.conf` to redirect logins to that url
    Explicit details can be in [steps 6-7](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/#6-create-a-login-page)

## <a name="mfa-support"></a> Multi Factor Authentication (MFA) Support
   MFA works out-of-the-box in Tyk since luckinly Okta supports it. you would need to add it to the configuration of the account holder. Under `Security --> Multifactor --> Factor types` you can choose the types you want. For instance I chose Google Authenticator.

   1. While trying to login to the dashboard, Okta enforced the MFA and asked me to get the Google Authenticator:
   ![okta-mfa-setup-1][2]

   2. I had to download the Google Authenticatior and identify with the generated code
   ![okta-mfa-download-google-authenticator-2][3]
   3. I successfully authenticated with Google Authenticatior
   ![okta-mfa-google-auth-approved-3][4]

## <a name="error"></a> Common Error
If you get `400 Bad Request` it means the profile name in the login endpoint is not identical to the profile name in the callback that you set up on Okta's app:

- On Okta's app - `Login redirect URIs:` http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback.
- The endpoint to test - http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect

![okta-bad-request-wrong-callback][5]

[1]: /docs/img/okta-sso/Okta-create-app.png
[2]: /docs/img/okta-sso/okta-mfa-setup-1.png
[3]: /docs/img/okta-sso/okta-mfa-download-google-authenticator-2.png
[4]: /docs/img/okta-sso/okta-mfa-google-auth-approved-3.png
[5]: /docs/img/okta-sso/okta-bad-request-wrong-callback.png
