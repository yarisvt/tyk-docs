---
date: 2017-03-08T18:15:57+13:00
title: Tyk Cloud
menu:
  main:
    parent: 'Get started with Tyk'
weight: 5
---

# What is Tyk Cloud?
 
The Tyk Cloud API Management Platform is a simple, scalable way for developers, startups and large companies to get started with the Tyk platform, offering an easy, hosted way to add an API management layer to your services.

## How it works
Tyk Cloud acts as a proxy (or “gateway”) to your API services, these services need to be viewable by Tyk, and so need to be exposed to the internet, but they do not need to be public.

You set up Tyk to send traffic from your dedicated service endpoint (`your_organisation.cloud.tyk.io/{api-slug}`) to your underlying service URL. On the way, you can modify the request any way you please, for example, by injecting a Tyk-specific access header so only Tyk Cloud can access your service.

You can then start issuing tokens, either manually or via the developer portal, that give developers access to your Tyk proxy, which then meters, manages and secures your upstream service.
