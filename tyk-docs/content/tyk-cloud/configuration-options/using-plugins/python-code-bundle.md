---
title: "Create a Python Code Bundle"
date: 2020-05-15
menu:
  main:
    parent: "Python Custom Authentication"
weight: 2
aliases:
    - /python-custom-auth-plugin/python-code-bundle/
---

## Introduction

This page demonstrates how to create a Python code bundle as part of the custom authentication process for Tyk Cloud, so that you can ensure your API management solution is as effective as possible.


## What do I need to do to create my Plugin?

* You need to create the Python code bundle on your locally installed Gateway (not an Tyk Cloud Edge stack).
* You will create 2 files, a manifest file (`manifest.json`) and the python file (`middleware.py`)
* You then create a zipped bundle via our Tyk CLI tool that is built in to your local Gateway instance.
  
## Creating the Plugin bundle

### Create your working directory

The first step is to create a directory for your plugin bundle files:

```.copyWrapper
mkdir ~/my-tyk-plugin
cd ~/my-tyk-plugin
```

### Creating the Manifest File

The manifest file contains information about your plugin file structure and how we expect it to interact with the API that will load it. This file should be named `manifest.json` and needs to have the following contents:

```.json
{
  "checksum": "09fee45261b5a0c7ca94adf8ec3de624",
  "custom_middleware": {
    "auth_check": {
      "name": "MyAuthMiddleware",
      "path": "",
      "raw_body_only": false,
      "require_session": false
    },
    "driver": "python",
    "id_extractor": {
      "extract_from": "",
      "extract_with": "",
      "extractor_config": null
    },
    "post": [
      {
        "name": "MyPostMiddleware",
        "path": "",
        "raw_body_only": false,
        "require_session": false
      }
    ],
    "post_key_auth": null,
    "pre": null,
    "response": null
  },
  "file_list": [
    "middleware.py"
  ],
  "signature": ""
}
```
### File description


* The `custom_middleware` block contains the middleware settings like the plugin driver you want to use (driver) and the hooks that your plugin will expose. We use the `auth_check` for this tutorial. For other hooks see [here](/docs/plugins/rich-plugins/rich-plugins-work/#coprocess-dispatcher---hooks).
* The `file_list` block contains the list of files to be included in the bundle. The CLI tool expects to find these files in the current working directory.
* The name field references the name of the function that you implement in your plugin code: `MyAuthMiddleware`.
* You add an additional file called `middleware.py`, this contains the main implementation of our middleware.

### Creating the middleware.py file

You import decorators from the Tyk module that gives us the Hook decorator, and we import [Tyk Python API helpers](/docs/plugins/rich-plugins/python/tyk-python-api-methods/)

You implement a middleware function and register it as a hook. The input includes the request object, the session object, the API meta data and its specification. The hook checks the authorization header for a specified value. In this tutorial we have called it `Authorization`.

```.python
from tyk.decorators import *
from gateway import TykGateway as tyk

@Hook
def MyAuthMiddleware(request, session, metadata, spec):
    auth = request.get_header('Authorization')
    if not auth:
        auth = request.object.params.get('authorization', None)

    if auth == '47a0c79c427728b3df4af62b9228c8ae':
        session.rate = 1000.0
        session.per = 1.0
        metadata["token"] = auth
    return request, session, metadata

@Hook
def MyPostMiddleware(request, session, spec):
    tyk.log("This is my post middleware", "info")
    request.object.set_headers["x-tyk-request"] = "something"
    return request, session
  ```

### File description

The `MyAuthMiddleware` @hook checks for a value. If it is found it is treated as your authentication token.

The `MyPostMiddleware` @hook adds a header to the request. In this tutorial `something`.


## Create the Plugin Bundle

You create a bundle to cater for a number of plugins connected to the one API, and using a bundle makes this more manageable.

To bundle your plugin we run the following command in your working directory. Check your Tyk CLI tool install path first. The default location is:

```.bash
/opt/tyk-gateway/utils/tyk-cli
```
Then run the following to build your bundle
```.bash
/opt/tyk-gateway/bin/tyk bundle build -y
```
A plugin bundle is a packaged version of the plugin, it may also contain a cryptographic signature of its contents. The -y flag tells the Tyk CLI tool to skip the signing process in order to simplify this tutorial. For more information on the Tyk CLI tool, see [here](/docs/plugins/rich-plugins/plugin-bundles/#bundler-tool).

You should now have a `bundle.zip` file in the plugin working directory.

Next you will configure uploading your plugin bundle file to your Amazon S3 bucket