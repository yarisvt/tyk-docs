---
date: 2019-07-06T12:16:10Z
title: Golang Plugins
menu:
  main:
    parent: "Plugins"
weight: 0 
---

# Golang Plugins

## Quick start
This quick start guide will help you to understand the idea behind Golang plugins in less than 5-10 minutes.\
You will look at:
- some simple example to see how to customize/extend Tyk with Golang plugins
- look at some code get some ideas where to go next
- process how to build Golang plugin and get it loaded by Tyk

Golang plugins is a very flexible and powerful way to extend functionality of Tyk. It is based on utilizing native Golang plugins API (please see https://golang.org/pkg/plugin).

Every HTTP request (to your API, protected and managed by Tyk) gets passed through chain of built-in middle-wares inside Tyk. These middle-wares perform tasks like authentication, rate limiting, white or black listing and many others - it depends on the particular API specification. In other words the chain of middle-wares is specific to API and gets created at API re-load time. The Golang plugins feature allows developers to create custom middle-wares in Golang and then they can be added to chain of middle-wares. So when Tyk does API re-load it also loads custom middle-wares and "injects" them into chain to be called at different stages of HTTP request's life cycle.

### Golang Plugin example

Let's create a plugin with a very basic functionality:
- we need to add custom header `"Foo: Bar"` to request 
- this needs to happen right before request gets passed to some upstream behind Tyk API gateway

The plugin code would look like this:
```go
package main

import (
	"net/http"
)

// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	r.Header.Add("Foo", "Bar")
}

func main() {}
```
We see that Golang plugin:
- is a Golang project with `main` package
- has empty `func main()`
- has one exported `func AddFooBarHeader` which must have the same method signature as `type HandlerFunc func(ResponseWriter, *Request)` from standard `"net/http"` Golang package

#### Building a plugin
Let's build plugin by running command in a folder with plugin project:
```bash
go build -buildmode=plugin -o /tmp/AddFooBarHeader.so
```

> **NOTE**: There is a special tool to build Tyk Golang plugins but we will look into it later. 

Here we build everything manually so you will understand what happens under the hood when you start using our building tool.

For now just make sure: 
- you have latest tyk repo (https://github.com/TykTechnologies/tyk) cloned from github and placed in `GOPATH`
- you will need to build Tyk gateway binary
- gateway binary is built with the same Golang version as you use to build example plugin in this tutorial

As a result of build command we get a shared library with plugin implementation placed at `/tmp/AddFooBarHeader.so`.

Now we need to instruct Tyk to load this shared library for some API so it will start processing traffic as part of chain of middle-wares. To do so we will need to edit our API spec with using raw JSON editor in Dashboard or directly in JSON file (in case of stand alone gateway running). This change needs to be done for `"custom_middleware"` field and it should look like look like this:
```json
"custom_middleware": {
  "pre": [],
  "post_key_auth": [],
  "auth_check": {},
  "post": [
    {
      "name": "AddFooBarHeader",
      "path": "/tmp/AddFooBarHeader.so"
    }
  ],
  "driver": "goplugin"
}
```
Here we have:
- field `"driver"` has a new value `"goplugin"` which says to Tyk that this custom middleware is a Golang native plugin
- we use middleware with type `"post"` because we want this custom middleware to process request right before it gets passed to upstream (we will look at other types a little bit later)
- in `"post"` section - field `"mame"` contains your function name from plugin project
- in `"post"` section - field `"path"` full or relative (to tyk binary) path to `.so` file with plugin implementation (make sure tyk has read access to this file)

Also, let's set fields `"use_keyless": true` and `"target_url": "http://httpbin.org/"` - for testing purposes (we need to see what request arrives to our upstream and `httpbin.org` is a perfect fit for that)

The API needs to be reloaded after that change (this happens automatically when you save updated API in dashboard).

Now your API with Golang plugin is ready to process traffic:
```bash
curl http://localhost:8181/my_api_name/get   

{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Foo": "Bar", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
} 
```
We see that upstream has received header `"Foo": "Bar"` which was added by our custom middle-ware implemented as native Golang plugin in Tyk.

### Types of custom middleware supported by Tyk Golang plugins
All four types of custom middle-wares are supported by Tyk Golang plugins. They represent different request's stages where Golang plugins can be added as part of the middleware chain. Let's recap the meaning of all four types:
- `"pre"` - contains array of middle-wares to be run before any others (i.e. before authentication)
- `"auth_check"` - contains only one middleware info, his middleware performs custom authentication and adds API key session info into request context
- `"post_auth_check"` - contains array of middle-wares to be run after authentication, at this point we have authenticated session API key for the given key (in request context) so we can perform any extra checks
- `"post"` - contains array of middle-wares to be run at the very end of middle-ware chain, at this point Tyk is about to do request round-trip to upstream

Golang plugin custom middle-wares with type `"auth_check"` can be used only if: 
- API is protected, API spec has field set as `"use_keyless": false`
- API spec has field set `"use_go_plugin_auth": true`

and `"post_auth_check"` can be used:
- when API is protected, API spec has field set as `"use_keyless": false`
- with any auth method specified in API spec

> **NOTE**: These fields are populated automatically with correct values when you change authentication method for API in Tyk Dashboard

### Sending HTTP-response from Tyk Golang plugin

It is possible to send response from Golang plugin custom middleware. So, in case HTTP response was sent:
- HTTP request processing is stopped and other middle-wares in chain won't be used
- HTTP request round-trip to upstream won't happen
- analytics records will still be created and sent to analytics processing flow

Let's look at example how to send HTTP-response from Tyk Golang plugin. Imagine we need middleware which would send JSON with current time if request contains parameter `get_time=1` in request's query string:
```go
package main

import (
	"encoding/json"
	"net/http"
	"time"
)

func SendCurrentTime(rw http.ResponseWriter, r *http.Request) {
	// check if we don't need to send reply
	if r.URL.Query().Get("get_time") != "1" {
		// allow request to be processed and sent to upstream
        return
	}

	// prepare data to send
	replyData := map[string]interface{}{
		"current_time": time.Now(),
	}

	jsonData, err := json.Marshal(replyData)
	if err != nil {
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	// send HTTP response from Golang plugin
	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	rw.Write(jsonData)
}

func main() {}
```

Let's build plugin by running command in a folder with plugin project:
```bash
go build -buildmode=plugin -o /tmp/SendCurrentTime.so
```

Then let's edit API spec to use this custom middleware:
```json
"custom_middleware": {
  "pre": [
    {
       "name": "SendCurrentTime",
       "path": "/tmp/SendCurrentTime.so"
    }
  ],
  "post_key_auth": [],
  "auth_check": {},
  "post": [],
  "driver": "goplugin"
}
```

Let's check that we still do round trip to upstream if request query string parameter `get_time` is not set:
```bash
curl http://localhost:8181/my_api_name/get
                 
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
}
```

Now let's check if our Golang plugin sends HTTP 200 response (with JSON containing current time) when we set `get_time=1` query string parameter:
```bash
curl -v http://localhost:8181/my_api_name/get?get_time=1
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get?get_time=1 HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> 
< HTTP/1.1 200 OK
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 03:44:10 GMT
< Content-Length: 51
< 
* Connection #0 to host localhost left intact
{"current_time":"2019-09-11T23:44:10.040878-04:00"}
```
Here we see that:
- we've got HTTP 200 response code
- response body has JSON payload with current time
- upstream was not reached, our Tyk Golang plugin served this request and stopped processing after response was sent

### Authentication with Golang plugin
You can implement your own authentication method with using Golang plugin and custom middle-ware type `"auth_check"`.
Please make sure that:
- API as protected, API spec has field set as `"use_keyless": false`
- API spec has field set `"use_go_plugin_auth": true`

Let's have a look at code example. Imagine we need to implement very trivial authentication method when only one key is supported (in real world you would want to store your keys in some storage or have some more complex logic).

```go
package main

import (
	"net/http"

	"github.com/TykTechnologies/tyk/ctx"
	"github.com/TykTechnologies/tyk/headers"
	"github.com/TykTechnologies/tyk/user"
)

func getSessionByKey(key string) *user.SessionState {
	// here goes our logic to check if passed API key is valid and appropriate key session can be retrieved

	// perform auth (only one token "abc" is allowed)
	if key != "abc" {
		return nil
	}

	// return session
	return &user.SessionState{
		OrgID: "default",
		Alias: "abc-session",
	}
}

func MyPluginAuthCheck(rw http.ResponseWriter, r *http.Request) {
	// try to get session by API key
	key := r.Header.Get(headers.Authorization)
	session := getSessionByKey(key)
	if session == nil {
		// auth failed, reply with 403
		rw.WriteHeader(http.StatusForbidden)
		return
	}

	// auth was successful, add session and key to request's context so other middle-wares can use it
	ctx.SetSession(r, session, key, true)
}

func main() {}
```
A couple of notes about this code:
- package `"github.com/TykTechnologies/tyk/ctx"` is used to set session in request context - this is something `"auth_check"`-type custome middle-ware is responsible for
- package `"github.com/TykTechnologies/tyk/user"` is used to operate with Tyk's key session structure
- our Golang plugin sends 403 HTTP response if authentication is failed
- our Golang plugin just adds session to request's context and returns if authentication was successful

Let's build plugin by running command in a folder with plugin project:
```bash
go build -buildmode=plugin -o /tmp/MyPluginAuthCheck.so
```

Now let's check if our custom authentication works as expected (only one key `"abc"` should work).

Authentication fails with wrong API key:
```bash
 curl -v -H "Authorization: xyz" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: xyz
> 
< HTTP/1.1 403 Forbidden
< Date: Wed, 11 Sep 2019 04:31:34 GMT
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```
here we see that our custom middleware replied with 403 and request processing was stopped at this point.

Authentication successful with right API key:
```bash
curl -v -H "Authorization: abc" http://localhost:8181/my_api_name/get
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 8181 (#0)
> GET /my_api_name/get HTTP/1.1
> Host: localhost:8181
> User-Agent: curl/7.54.0
> Accept: */*
> Authorization: abc
> 
< HTTP/1.1 200 OK
< Access-Control-Allow-Credentials: true
< Access-Control-Allow-Origin: *
< Content-Type: application/json
< Date: Wed, 11 Sep 2019 04:31:39 GMT
< Referrer-Policy: no-referrer-when-downgrade
< Server: nginx
< X-Content-Type-Options: nosniff
< X-Frame-Options: DENY
< X-Ratelimit-Limit: 0
< X-Ratelimit-Remaining: 0
< X-Ratelimit-Reset: 0
< X-Xss-Protection: 1; mode=block
< Content-Length: 257
< 
{
  "args": {}, 
  "headers": {
    "Accept": "*/*", 
    "Accept-Encoding": "gzip", 
    "Authorization": "abc", 
    "Host": "httpbin.org", 
    "User-Agent": "curl/7.54.0"
  }, 
  "url": "https://httpbin.org/get"
}
* Connection #0 to host localhost left intact
```
Here we see that our custom middleware successfully authenticated request and we received reply from actual upstream.

### Logging from Golang plugin
Your Golang plugin can write log entries as part of Tyk's logging system.

To do so you just need to import package `"github.com/TykTechnologies/tyk/log"` and use exported public method `Get()`:
```go
package main

import (
	"net/http"

	"github.com/TykTechnologies/tyk/log"
)

var logger = log.Get()

// AddFooBarHeader adds custom "Foo: Bar" header to the request
func AddFooBarHeader(rw http.ResponseWriter, r *http.Request) {
	logger.Info("Processing HTTP request in Golang plugin!!")
	r.Header.Add("Foo", "Bar")
}

func main() {}
```

### Monitoring instrumentation for Tyk Golang plugins
All custom middle-wares implemented as Golang plugins do support current Tyk's builtin instrumentation.

The format for event name with meta data is: `"GoPluginMiddleware:" + Path + ":" + SymbolName`. I.e. for our example the event name will be:
```go
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader"
```

The format for metric with execution time (in nanoseconds) will have the same format but with `.exec_time` suffix:
```go
"GoPluginMiddleware:/tmp/AddFooBarHeader.so:AddFooBarHeader.exec_time"
```

### Internal state of Tyk Golang plugin
Golang plugin can be treated as normal Golang package but:
- this package name has always to be `"main"` and this package cannot be imported
- this package loads at run-time by Tyk, it happens after all other Golang packages are already loaded
- this package always has to have empty `func main() {}`

Golang plugin as a package can have `func init()` and it gets called only once (when Tyk loads this plugin first time for some API).

It is possible to create some structures or open connections to 3d party service/storage and then share them within every call to exported function in your Golang plugin.

I.e. here is simple example of tyk Golang plugin with simple hit-counter:
```go
package main

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/TykTechnologies/tyk/ctx"
	"github.com/TykTechnologies/tyk/log"
	"github.com/TykTechnologies/tyk/user"
)

var logger = log.Get()

// plugin exported functionality
func MyProcessRequest(rw http.ResponseWriter, r *http.Request) {
	endPoint := r.Method + " " + r.URL.Path
	logger.Info("Custom middleware, new hit:", endPoint)

	hitCounter := recordHit(endPoint)
	logger.Debug("New hit counter value:", hitCounter)

	if hitCounter > 100 {
		logger.Warning("Hit counter to high")
	}

	reply := myReply{
		Session:    ctx.GetSession(r),
		Endpoint:   endPoint,
		HitCounter: hitCounter,
	}

	jsonData, err := json.Marshal(reply)
	if err != nil {
		logger.Error(err.Error())
		rw.WriteHeader(http.StatusInternalServerError)
		return
	}

	rw.Header().Set("Content-Type", "application/json")
	rw.WriteHeader(http.StatusOK)
	rw.Write(jsonData)
}

// called once plugin is loaded, this is where we put all initialization work for plugin
// i.e. setting exported functions, setting up connection pool to storage and etc.
func init() {
	hitCounter = make(map[string]uint64)
}

// plugin internal state and implementation
var (
	hitCounter   map[string]uint64
	hitCounterMu sync.Mutex
)

func recordHit(endpoint string) uint64 {
	hitCounterMu.Lock()
	defer hitCounterMu.Unlock()
	hitCounter[endpoint]++
	return hitCounter[endpoint]
}

type myReply struct {
	Session    *user.SessionState `json:"session"`
	Endpoint   string             `json:"endpoint"`
	HitCounter uint64             `json:"hit_counter"`
}

func main() {}
```
Here we see how internal state of Golang plugin is used by exported function `MyProcessRequest` (the one we set in API spec in `"custom_middleware"` section). Internal state used to count hits to different endpoints and reply back with stats for the called endpoint.
