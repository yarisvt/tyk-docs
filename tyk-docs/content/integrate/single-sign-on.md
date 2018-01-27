---
date: 2017-03-24T16:40:31Z
title: Single Sign On (SSO)
menu:
  main:
    parent: "Integration Options"
weight: 0 
---

## <a name="intro"></a>Introduction to Single Sign On (SSO)

### SSO - The generic use case
SSO gives users the ability to log in to multiple applications without the need to enter their password more than once. 
OIDC enables application to verify identity of users from an organisation without the need to self store and manage them, without doing the identification process and without exposing their passwords to that application. Their lists of users and passwords are kept safe in one single place, in the IdP that the organisation has chosen to use. The Authorisation server of the IdP identify the users for a pre-registered and approved application (`client` in OAuth and OIDC terminology).


### SSO in Tyk
SSO is sometimes complicated to understand or set up but once you get the basics and learn to set up our [TIB - Tyk-Identity-Broker](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) it becomes an easy task. 

Using our Tyk-Identity-Broker (TIB), you can do both - use your existing users directory to login to the **Dashboard** or **Developer Portal** and have it SSO. TIB, among other options, supports 3 methods for login to Tyk's UI:
1. Login with 3rd party social providers
2. Login with any IdP that supports ODIC
3. Login with LDAP (not using OIDC)

#### Tyk Identity Broker (TIB) 
TIB is an open-source project which can be used to integrate Tyk authentication with 3rd party identity providers (IDPs).TIB has been designed as a glue-code solution, so it can integrate with almost any identity provider (IDP) including all the know Social providers.
Please refer to this [TIB detailed overview](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) for further explanations about TIB and top level flow.


#### <a name="sso-with-oidc"></a> SSO with Open ID Connect or Social Providers
SSO is sometimes complicated to understand or set up but once you get it and learn to use our Tyk-Identity-Broker it becomes an easy task. 

In short, all you need is as follow:
1. Get TIB from its [repo](https://github.com/TykTechnologies/tyk-identity-broker)
2. Create a profile for your prefered IDP
3. Get the `client_id` + `secret` that are defined on your IDP
4. Set the `callback endpoint of TIB` on your IdP account under the `client_id` you used.
5. Call TIB endpoint to start the login
5. More Docs for the flow can be found on our [GH TIB repo](https://github.com/TykTechnologies/tyk-identity-broker) and  [Tyk's integration docs](https://tyk.io/docs/integrate/3rd-party-identity-providers)


### <a name="sso-with-social-identity-providers"></a>SSo with Social Identity Providers
For an overview of using a [social Identity Provider](https://tyk.io/docs/integrate/3rd-party-identity-providers/social-oauth/)
- Instructions on setting SSO with Google+   - will be added soon

### <a name="sso-with-openid-connect"></a> SSO with OpenID Connect (OIDC)
- Instruction on setting [SSO with Okta](https://github.com/TykTechnologies/tyk-docs/blob/sso-update-tidyup/tyk-docs/content/integrate/3rd-party-identity-providers/dashboard-login-okta-tib.md)
- Instructions on setting SSO with PingID   - will be added soon
- Instructions on setting SSO with Auth0    - will be added soon
- Instructions on setting SSO with keycloak - will be added soon

## <a name="tyk-dashboard-admin-rest-api-for-sso"></a> Tyk's Dashboard Admin REST API for SSO
Our SSO REST API allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [here](https://tyk.io/docs/dashboard-admin-api/sso/) for more details.

## <a name="sso-with-ldap"></a>SSO with LDAP integration
Detailed instruction on setting [SSO with LDAP](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib.md).

Read here if you need to apply [filters](https://tyk.io/docs/integrate/3rd-party-identity-providers/openldap/#a-name-ldap-search-filters-a-using-advanced-ldap-search) to your LDAP authentication.












