---
date: 2017-03-24T16:40:31Z
title: Single Sign On (SSO)
menu:
  main:
    parent: "Integration Options"
weight: 0 
---

## <a name="intro"></a>Introduction

Tyk Supports Single Sign On (SSO) with various methods.

*  Login to the Tyk Dashboard via the Tyk Identity Broker (TIB) and LDAP
*  Via third party Identity Providers (IDPs)
*  Via the Tyk Dashboard Admin API
*  Using OpenID Connect OIDC

## <a name="tib_ldap"></a>TIB and LDAP

For more information on the Tyk Identity Broker, see [here](https://tyk.io/docs/integrate/3rd-party-identity-providers/#tib/)

To enable the Tyk Identity Broker to apply LDAP filters to user search see [here](https://tyk.io/docs/integrate/3rd-party-identity-providers/dashboard-login-ldap-tib/).

## <a name="idp"></a>Third Party Identity Providers (IDPs)

For an overview of using a third party Identity Provider, see [here](https://tyk.io/docs/integrate/3rd-party-identity-providers/)

## <a name="adminapi"></a> Tyk Dashboard Admin API

Our SSO API allows you to implement custom authentication schemes for the Dashboard and Portal. Our Tyk Identity Broker (TIB) internally also uses this API. See [here](https://tyk.io/docs/dashboard-admin-api/sso/) for more details.

## <a name="oidc"></a> Using OpenID Connect (OIDC)

Tyk supports tokens supplied by any standards OIDC compliant provider. See [here](https://tyk.io/docs/security/your-apis/openid-connect/) for more details.








