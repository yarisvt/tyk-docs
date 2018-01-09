

* `enable_jwt`: Set JWT as the access method for this API.

* `jwt_signing_method`: Either HMAC or RSA - HMAC requires a shared secret while RSA requires a public key to use to verify against. Please see the section on JSON web tokens for more details on how to generate these.

* `jwt_source`: Must either be a base64 encoded valid RSA/HMAC key, this key will then be used to validate inbound JWT and throttle them according to the centralised JWT options and fields set in the configuration.

* `jwt_identity_base_field`: Identifies the user or identity to be used in the Claims of the JWT. This will fallback to `sub` if not found. This field forms the basis of a new "virtual" token that gets used after validation. It means policy attributes are carried forward through Tyk for attribution purposes.
    
Centralised JWTs add a `TykJWTSessionID` to the session meta data on create to enable upstream hosts to work with the internalised token should things need changing.

* `jwt_policy_field_name`: The policy ID to apply to the virtual token generated for a JWT.

See [JSON Web Tokens](https://tyk.io/docs/security/your-apis/json-web-tokens/) for more details.