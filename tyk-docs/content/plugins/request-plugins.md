---
date: 2017-03-24T15:45:13Z
title: Request Plugins
menu:
  main:
    parent: "Custom Plugins"
weight: 10
---

There are 3 different phases in the [request lifecycle](/docs/getting-started/key-concepts/middleware-execution-order/) you can inject custom plugins, 4 if you include [Authentication plugins](/docs/plugins/auth-plugins/).  There are performance advantages to picking the correct phase, and of course that depends on your use case and what functionality you need.

### Hook Capabilities
| Functionality           |   Pre    |  Auth       | Post-Auth |    Post   |
|-------------------------|----------|-------------|-----------|-----------|
| Can modify the Header   | ✅       | ✅          | ✅       | ✅  
| Can modify the Body     | ✅       | ✅          | ✅       |✅
| Can modify Query Params | ✅       | ✅          | ✅       |✅
| Can view Token Details  |          | ✅          |✅          |✅
| Can modify Token (metadata, quota, context-vars, tags, etc)|          | ✅          |          |


### Return Overrides / ReturnOverrides  
You can have your plugin finish the request lifecycle and return a response to the requestor.

[Read more here](/docs/plugins/supported-languages/rich-plugins/rich-plugins-data-structures/#returnoverrides-coprocess_return_overridesproto)

##### Python Example

```{.copyWrapper}
from tyk.decorators import *

@Hook
def MyCustomMiddleware(request, session, spec):
    print("my_middleware: MyCustomMiddleware")
    request.object.return_overrides.headers['content-type'] = 'application/json'
    request.object.return_overrides.response_code = 200
    request.object.return_overrides.response_error = "{\"key\": \"value\"}\n"
    return request, session
```

##### JavaScript Example
```{.copyWrapper}
var testJSVMData = new TykJS.TykMiddleware.NewMiddleware({});

testJSVMData.NewProcessRequest(function(request, session, config) {
	request.ReturnOverrides.ResponseError = "Foobarbaz"
    request.ReturnOverrides.ResponseBody = "Foobar"
	request.ReturnOverrides.ResponseCode = 200
	request.ReturnOverrides.ResponseHeaders = {
		"X-Foo": "Bar",
		"X-Baz": "Qux"
	}
	return testJSVMData.ReturnData(request, {});
});
```