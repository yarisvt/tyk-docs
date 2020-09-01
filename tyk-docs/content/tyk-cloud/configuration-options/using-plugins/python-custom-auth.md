---
title: "Python Custom Authentication"
date: 2020-04-28
menu:
  main:
    parent: "Using Plugins"
weight: 1
aliases:
    - /using-plugins/python-custom-auth-plugin/
---

## Introduction

This page introduces the process of configuring a custom authentication plugin, so that you can override the default Tyk authentication mechanism with your own authentication logic. 

## What are we going to do?

We are going to configure an Tyk Cloud Control Plane to use a custom authentication plugin built in Python.

## What do I need in advance?

Firstly you will need a local Tyk Gateway installation that allows you to create your Python plugin bundle. We recommend [installing our On-Premises version on Ubuntu Bionic 18.04](/docs/getting-started/installation/with-tyk-on-premises/on-ubuntu/).

### Further Python Requirements

1. Ensure you have a currently stable [Python 3.x version](https://www.python.org/downloads/) installed 
2. You need install the build tools `apt-get install -y build-essential`
3. Install our required modules:

```{.copyWrapper}
apt install python3 python3-dev python3-pip
pip3 install protobuf grpcio
```

Next you'll set up an Control Plane to support plugins
