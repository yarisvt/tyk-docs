---
title: Tyk Gateway v2.6 and more
menu:
  main:
    parent: "Release Notes"
weight: 0 
---

# <a name="new"></a>New in this Release:

## <a name="gateway"></a>Tyk Gateway v2.6.0

### Organization-level Rate Limiting

Endpoints [Create organisation keys](https://tyk.io/docs/tyk-rest-api/organisation-quotas/#create-organisation-keys) and 
[Add/update organisation keys](https://tyk.io/docs/tyk-rest-api/organisation-quotas/#add-update-organisation-keys) now 
allow to set rate limit on organizations level. You will need to provide these fields in payload:

- `"allowance"` and `"rate"` which needs to be set to the same value, this should be number of requests to be allowed 
in a time period
- `"per"` is the time period

So, if you want to restrict organization rate limit to 100 requests per second you will need to provide in payload:
```
    "allowance": 100,
    "rate": 100,
    "per": 5
```

NOTE: if you don't want to have organization-level rate limiting set `"rate"` or `"per"` to zero value
or just don't provide them in payload.

### New endpoint to get list of tokens generated for provided OAuth-client

`GET /oauth/clients/{apiID}/{oauthClientId}/tokens`

This endpoint allow to get list of all not expired tokens issued for provided API ID and OAuth-client ID with
reply format:
```
[
    {
        "code": "5a7d110be6355b0c071cc339327563cb45174ae387f52f87a80d2496",
        "expires": 1518158407
    },
    {
        "code": "5a7d110be6355b0c071cc33988884222b0cf436eba7979c6c51d6dbd",
        "expires": 1518158594
    },
    {
        "code": "5a7d110be6355b0c071cc33990bac8b5261041c5a7d585bff291fec4",
        "expires": 1518158638
    },
    {
        "code": "5a7d110be6355b0c071cc339a66afe75521f49388065a106ef45af54",
        "expires": 1518159792
    }
]
```

NOTE: list of tokens in this endpoint reply will be changing over time as tokens expire.


## <a name="dashboard"></a>Tyk Dashboard v1.6.0

### Key requests management API now supports OAuth

Developers can request access to an API protected with OAuth and get OAuth client credentials.

The endpoint `POST /api/portal/requests` now has optional field `"oauth_info"` which identifies the OAuth key request.

Example of OAuth key request payload:  
```
{
  "by_user": "5a3b2e7798b28f03a4b7b3f0",
  "date_created": "2018-01-15T04:49:20.992-04:00",
  "for_plan": "5a52dfce1c3b4802c10053c8",
  "version": "v2",
  "oauth_info": {
    "redirect_uri": "http://new1.com,http://new2.com"
  }
}
```

Where:

- `"by_user"` - contains ID of portal developer who is requesting OAuth access
- `"for_plan"` - subscription ID
- `"version"` is expected to have values `"v2"`
- `"oauth_info"` - simple structure witch contains a field with comma-separated list of redirect URI for OAuth flow

This new field `"oauth_info"` will be present in replies for endpoints `GET /api/portal/requests/{id}` and `GET /api/portal/requests`

When this kind of OAuth key request gets approved with using endpoint `PUT /api/portal/requests/approve/{id}` 
a new OAuth-client is generated for a developer specified in field `"by_user"` earlier.

Example of OAuth key request approval reply:
```
{
    "client_id": "203defa5162b42708c6bcafcfa28c9fb",
    "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw",
    "policy_id": "5a52dfce1c3b4802c10053c8",
    "redirect_uri": "http://new1.com,http://new2.com"
}
```

Where:

- `"client_id"` and `"secret"` are OAuth-client credentials used to request get token (they to be kept in secret)
- `"policy_id"` - subscription this OAuth-client provides access to
- `"redirect_uri"` - with comma-separated list of redirect URI for OAuth flow

Also, if you set email notifications in portal setting - email with OAuth-client credentials will be sent to developer 
who made that OAuth key request.

There is also one more change in reply of endpoint `GET /api/portal/developers` - developer object will have new field
`"oauth_clients"` which will contain mapping of subscription IDs to list of OAuth clients that developer requested and
got approved, i.e.:
```
"oauth_clients": {
                "5a52dfce1c3b4802c10053c8": [
                    {
                        "client_id": "203defa5162b42708c6bcafcfa28c9fb",
                        "redirect_uri": "http://new1.com,http://new2.com",
                        "secret": "YjUxZDJjNmYtMzgwMy00YzllLWI2YzctYTUxODQ4ODYwNWQw"
                    }
                ]
            },
```

### New endpoints to get tokens per OAuth-client

These endpoints allow to get list of all not expired tokens issued for provided OAuth client ID:

- `GET /apis/oauth/{apiId}/{oauthClientId}/tokens`
- `GET /apis/oauth/{oauthClientId}/tokens` when API ID is unknown or OAuth-client provides access to several APIs


## <a name="upgrade"></a>Upgrading all new Components

For details on upgrading all Tyk versions, see [Upgrading Tyk](https://tyk.io/docs/upgrading-tyk/).

## <a name="new"></a>Don't Have Tyk Yet?

Get started now, for free, or contact us with any questions.

* [Get Started](https://tyk.io/pricing/compare-api-management-platforms/#get-started)
* [Contact Us](https://tyk.io/about/contact/)




