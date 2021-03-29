---
title: "Managing Hybrid Gateways"
date: 2021-03-29
tags: ["Tyk Cloud", "Hybrid", "Gateways"]
description: "How to configure Hybrid Gateways with our 14 Day Free Trial or Enterprise Global plans"
menu:
  main:
    parent: "Environments & Deployments"
weight: 5
---

## Introduction

Hybrid Gateways are available on our [14 Day Free Trial](/docs/tyk-cloud/account-billing/plans/#14-day-trial) and [Enterprise Global](/docs/tyk-cloud/account-billing/plans/#enterprise-global-plan) plans. There are some settings you need to be aware of when adding a Hybrid Gateway to a Tyk Cloud installation:

## Configuration

* The MDCB endpoint URL is unique for each control plane
* The TLS certificate is also unique and currently self-signed (i.e. not globally trusted), so you need to place it in the host trust store or by setting the Tyk Gateway config option `slave_options.ssl_insecure_skip_verify` to `true`.
* The Hybrid Gateway should not bind to slugs. In the Hybrid Gateway config, set `slave_options.bind_to_slugs` to `false`.
* Any [monitor](/docs/tyk-oss-gateway/configuration/#monitor) configuration settings with calling back to the old Tyk Cloud should be removed.

### Sample Hybrid Gateway Configuration File

```.copyWrapper
{
    "listen_port": 8081,
    "template_path": "./templates",
    "tyk_js_path": "./js/tyk.js",
    "middleware_path": "./middleware",
    "use_db_app_configs": false,
    "app_path": "./apps/",
    "storage": {
        "type": "redis",
        "host": "localhost",
        "port": 6379,
        "enable_cluster": false,
        "username": "",
        "password": "",
        "database": 0,
        "optimisation_max_idle": 1000
    },
    "enable_analytics": true,
    "analytics_config": {
        "type": "rpc",
```