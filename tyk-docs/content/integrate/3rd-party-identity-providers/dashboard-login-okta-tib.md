# Login to your Dashboard using LDAP via Okta

## An end-to-end working example of login to the *Dashboard* using Okta as IdP.
1. Create developer account on Okta( you'll get a domain such as `https://dev-XXXXX.oktapreview.com/app/UserHome`).
2. Login and create Application (Under `Aplication` - click `Add Application` - click `create new App` - choose the app type -- choose OIDC as sign in method ).
3. Make sure "Authorization code" is selected as the grant type
4. Make sure group assignments is set to *everyone* (for now, you will change this later!)
5. Add *callback* function in the client's definitions
6. Copy from your Okta client the `cliend_id` and `password` to your `profiles.json`: 
    -  `cliend_id` to `ProviderConfig.UseProviders[].key`
    -  `password`  to `ProviderConfig.UseProviders[].secret`
7. Add Okta's discovery url under `ProviderConfig.UseProviders` 
   `DiscoverURL": "https://dev-XXXXX.oktapreview.com/oauth2/default/.well-known/openid-configuration"`.
   Example of an IdP profile can be found [here](THE PREVIOUS PAGE)
8. Start TIB by running the binary
   Detailed instruction in [here](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/#5-start-tib)
9. Test that it works: 
   From the broswer call `http://localhost:3010/auth/okta-dashboard/openid-connect`
    - If it's working you'll be redirected to Okta's web page and will be asked to enter your user and password.
    - If you were successfully authenticated by Okta then you'll be redirected to TIB (according to the callback you set up 
      earlier in step 4) 
    - TIB, via REST API call to the dashboard, will create a nonce and a special session attached to it. 
    - TIB will redirect the call to the dashboard to a special endpoint (`/tap`) with the nonce that was created.
    - You will get the main page in the dashboard.

Once it's working you can also add two more enhancements: 
1. Set the dashboard to redirect your users automatically to use TIB SSO endpoint.
    You will need to
    	- set up webserver with a login page and a form for `user` and `password` 
    	- Update `tyk_analytics.conf` to redirect logins to that url 
    Explicit details can be in [steps 6-7](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/#6-create-a-login-page)
2. Supporting MFA:
   MFA works out-of-the-box in Tyk since luckinly Okta supports it. you would need to add it to the configuration of the account holder. Under `Security --> Multifactor --> Factor types` you can choose the types you want. For instance I chose Google Authenticator.
   While trying to login to the dashboard Okta enforced the MFA and this is the login page I got:
   ![image](https://user-images.githubusercontent.com/3155222/35405172-3e7f7bc4-01fd-11e8-9de5-6ad141d42f32.png)

   I had to download the Google Authenticatior and identify with the generated code
   
	1. ...


 
