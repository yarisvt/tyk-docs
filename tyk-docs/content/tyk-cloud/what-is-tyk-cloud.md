---
title: "What Is Tyk Cloud?"
date: 2023-07-24
tags: ["Tyk Stack", "Tyk Cloud", "SaaS"]
description: "What is the Tyk Cloud SaaS solution?"
weight: 1
menu:
  main:
    parent: "Tyk Cloud"
---


Tyk cloud is a fully managed service that makes it easy for API teams to create, secure, publish and maintain APIs at any scale, anywhere in the world. Tyk Cloud includes everything you need to manage your global API ecosystem: [Tyk Gateways]({{< ref "tyk-oss-gateway" >}}), [Tyk Dashboard]({{< ref "tyk-dashboard" >}}), [Tyk Developer Portal]({{< ref "tyk-developer-portal" >}}) and [Universal Data Graph]({{< ref "universal-data-graph" >}}). 

The control plane is hosted by Tyk in the cloud, in one of the 5 regions available. Meanwhile, the data planes, composed of Tyk Gateways and Redis for temporary storage, can be either hosted by Tyk or managed by you on your own infrastructure.

{{< button_left href="https://tyk.io/sign-up/#cloud" color="green" content="Try for free" >}}

## Why Tyk Cloud?

- **No need to wrestle with infrastructure:** You can be up and running within a few clicks. No need for complex deployments or large infrastructure teams.
- **Flexible deployment options:** Whether you're a startup or a large enterprise, Tyk Cloud has deployment options to suit your needs. You can scale and manage your API ecosystem easily and efficiently. You can choose between deploying data planes in Tyk cloud or in your own infrastructure.
- **Geographical freedom:** Tyk Cloud allows you to select your preferred AWS location as your home region, ensuring your data and Tyk Gateways are live and secured in the region that suits you best.
- **Designed for platform teams:** With Tyk Cloud, you can use [role-based access control (RBAC)](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/) to manage your team structure, as well as [multiple environments and multiple organisations](https://tyk.io/blog/how-to-manage-multiple-teams-with-tyk-cloud/). 

## Where is Tyk Cloud hosted?

Users can select one of 5 available locations as their home region for the control planes as well as select the locations of their cloud data planes. The 5 available AWS regions are:

- aws-ap-southeast-1, Singapore
- aws-eu-central-1, Frankfurt, Germany
- aws-eu-west-2, London, UK
- aws-us-east-1, N. Virginia, USA
- aws-us-west-2, Oregon, USA
