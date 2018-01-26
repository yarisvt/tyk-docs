---
date: 2017-03-24T16:40:31Z
title: Single Sign On (SSO)
menu:
  main:
    parent: "Integration Options"
weight: 0 
---

## <a name="intro"></a>Introduction to Single Sign On (SSO)

### SSO Overview - Use case
SSO gives users the ability to log in to multiple applications without the need to enter their password more than once. 
OIDC enables application to authenticate users of an organisation without the need to manage the users, their identification process and without exposing their passwords. Their lists of users and passwords are kept safe in one single place, the IdP the organisation has chosen to use and the Authorisation server identify the users for a pre-registered and approved application (`client` in OAuth and OIDC terminology. 

Using our Tyk-Identity-Broker we supports SSO to the *Dasgboard* and *Developer Portal* with various methods:
*  Login with LDAP authentication
*  Login with 3rd party social providers
*  Login with any IdP that supports ODIC


### <a name="sso-with-ldap"></a>SSO with LDAP integration
For information on the [Tyk-Identity-Broker](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview)

To enable the Tyk Identity Broker to apply [LDAP filters](https://tyk.io/docs/integrate/3rd-party-identity-providers/openldap/#a-name-ldap-search-filters-a-using-advanced-ldap-search).

Instruction on setting [SSO with LDAP](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib.md)

### <a name="tyk-dashboard-admin-rest-api-for-sso"></a> Tyk Dashboard Admin REST API for SSO
Our SSO REST API allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [here](https://tyk.io/docs/dashboard-admin-api/sso/) for more details.


### <a name="sso-with-oidc"></a> SSO with Open ID Connect or Social Providers
SSO is sometimes complicated to understand or set up but once you get it and learn to use our [Tyk-Identity-Broker](https://tyk.io/docs/integrate/3rd-party-identity-providers/#a-name-tib-a-tyk-identity-broker-tib-overview) it becomes easy. 
In short, all you need is as follow:
1. Get TIB from here https://github.com/TykTechnologies/tyk-identity-broker
2. Create a profile for your prefered IDP
3. Get the `client_id` + `secret` that are defined on your IDP
4. Set the `callback endpoint of TIB` on your IdP account under the `client_id` you used.
5. More Docs for the flow can be found on our GH TIB repo and on tyk.io/docs

#### <a name="sso-with-social-identity-providers"></a>SSo with Social Identity Providers
For an overview of using a social Identity Provider, see [here](https://tyk.io/docs/integrate/3rd-party-identity-providers/social-oauth/)


#### <a name="sso-with-openid-connect"></a> SSO with OpenID Connect (OIDC)
- Instruction on setting [SSO with Okta](https://github.com/TykTechnologies/tyk-docs/blob/sso-update-tidyup/tyk-docs/content/integrate/3rd-party-identity-providers/dashboard-login-okta-tib.md)











