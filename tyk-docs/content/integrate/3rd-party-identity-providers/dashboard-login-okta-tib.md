# Login to your Dashboard using LDAP via Okta

## An end-to-end working example of login to the *Dashboard* using Okta as IdP.

### Okta's side:
1. Create developer account on Okta 
   You'll get a domain such as `https://dev-XXXXX.oktapreview.com/app/UserHome`.
2. Login and create Application 
   Under `Aplication`, click `Add Application`, Choose `Web`, Change the name of the app, Tick `Authorization Code`and Click `Done` .
Note: These instruction are for the new Okta's `Developer Console`, for the `Classic UI` instructions are slightly different.
3. Under `General` (still in Okta), click `Edit` and update `Login redirect URIs` field with the callback endpoint on TIB `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect/callback`.
`{PROFILE-NAME-IN-TIB}` - Can be any string you choose, as long as you use the same one for the profile in TIB.
4. Under `Assignments` tab, make sure group assignments is set to *everyone* (for now, you will change this later!).

### TIB Side:
5. Set the profile in `profile.json` as follows:
   - Copy from your Okta client the `cliend ID`     to `ProviderConfig.UseProviders[].key`
   - Copy from your Okta client the `Client secret` to `ProviderConfig.UseProviders[].secret`
   - Add Okta's discovery url `"https://dev-XXXXX.oktapreview.com/oauth2/default/.well-known/openid-configuration"` to  `ProviderConfig.UseProviders[].DiscoverURL` 
  
   Example of a profiles.json:
   ```{
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
    ```  
6. Start TIB by running the binary (`profiles.json` is in the same CWD)
   Follow this [link](https://tyk.io/docs/integrate/3rd-party-identity-providers/#tib) for detailed instruction to install TIB 
7. Test that it works: 
   From the broswer call `http://localhost:3010/auth/{PROFILE-NAME-IN-TIB}/openid-connect`
    - If it's working you'll be redirected to Okta's web page and will be asked to enter your Okta's user and password.
    - If you were successfully authenticated by Okta then you'll be redirected to the dashboard and login into it without going through the login page. Job's done!
    
 ### Behind the scenes:
 1. The initial call to the endpoint on TIB was redirected to Okta and 
 2. Okta identified the user
 3. Okta redirected the call back to TIB endpoint (according to the callback you set up on the client earlier in step 3) and from TIB
 4. TIB, via REST API call to the dashboard, created a nonce and a special session attached to it. 
 5. TIB redirected the call to the dashboard to a special endpoint `/tap` ( it was defined on the profile under `ReturnURL`) with the nonce that was created.
 6. The Dashboard on the `/tap` endpoint finds the session that is attached to the `nonce`, login the user and redirect to the dashboard first page

## Once it's working you can also add two more enhancements: 
1. *SSO login into the dashboard via a login page:*
   You will need to
    	- set up webserver with a login page and a form for `user` and `password` 
    	- Update `tyk_analytics.conf` to redirect logins to that url 
    Explicit details can be in [steps 6-7](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/#6-create-a-login-page)
2. *Supporting MFA:*
   MFA works out-of-the-box in Tyk since luckinly Okta supports it. you would need to add it to the configuration of the account holder. Under `Security --> Multifactor --> Factor types` you can choose the types you want. For instance I chose Google Authenticator.
   1. While trying to login to the dashboard, Okta enforced the MFA and asked me to get the Google Authenticator:
   ![image](https://user-images.githubusercontent.com/3155222/35405172-3e7f7bc4-01fd-11e8-9de5-6ad141d42f32.png)
   2. I had to download the Google Authenticatior and identify with the generated code
   ![image](https://2.png)
   3. I successfully authenticated with Google Authenticatior 
   ![image](https://3.png)
