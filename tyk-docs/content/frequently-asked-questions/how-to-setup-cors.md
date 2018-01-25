
- If your upstream service doe CORS already, then Tyk should ignore *OPTIONS* methods as these are pre-flights sent by the browser. In order to do that you should select "Options passthrough", and *NOT CHECK* CORS in Tyk. 
If you do, it will cause Tyk to dump the options request upstream and reply with the service's response so you'll get an error similar to `no 'access-control-allow-origin' header is present on the requested resource`. 

- If your upstream *does not* handle CORS, then you sghuold let tyk manage all CORS related headers and responses. In order to do that you should *enable CORS* in Tyk and *NOT ENABLE Options pass through*. 
If you do you'll get an error similar to `Failed to load https://ORG_NAME.cloud.tyk.io/YOUR_API: The ‘Access-Control-Allow-Origin’ header contains multiple values ‘http://UPSTREAM, *’, but only one is allowed. Origin ‘http://UPSTREAM’ is therefore not allowed access. Have the server send the header with a valid value, or, if an opaque response serves your needs, set the request’s mode to ‘no-cors’ to fetch the resource with CORS disabled.` and it's  because you have enabled CORS on the Api Definition and the upstream *also* supports CORS and so both add the header.

Check `CORS.options_passthrough` on our docs https://tyk.io/docs/tyk-rest-api/api-definition-objects/cors/
