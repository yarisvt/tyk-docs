---
title: "Solutions comparison"
date: 2023-07-12
weight: 4
menu: "main"
linkTitle: Tyk Solutions comparison
tags: ["Tyk API Management", "Licencing", "Open Source", "Self-Managed", "Tyk Cloud", "API Gateway"]
description: "How to decide on which Tyk deployment option is best for you"
aliases:
    - /getting-started/deployment-options/
---

Tyk API Management deployment options are comprised of the various [open and closed source]({{< ref "tyk-stack" >}}) components.

Which one is right for your organisation depends on your requirements and preferences. Please contact us for help and guidance: 
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}

|                                                                                                                                                            | [Open Source]({{< ref "apim/open-source" >}})  |   [Self-Managed]({{< ref "tyk-on-premises" >}})      |  [Cloud](https://account.cloud-ara.tyk.io/signup)
|------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|--------------------|---------
| API Gateway Capabilities <br> <ul><li>Rate Limiting</li><li>Authentication</li> <li>API Versioning</li><li>Granular Access Control</li><li>GraphQL</li>  <li>and [much more]({{< ref "apim/open-source#tyk-gateway" >}})</li></ul> | ✅              |✅	                |✅      
| [Version Control]({{< ref "tyk-sync" >}}) Integration                                                                                                      | ✅		  |✅	              |✅	 
| [API Analytics Exporter]({{< ref "tyk-pump" >}})                                                                                                                           | ✅		      |✅	              |✅	 
| [Tyk Manager]({{< ref "tyk-dashboard" >}})                                                                                                                                     | -	          |✅	              |✅	 
| [Single Sign On (SSO)]({{< ref "advanced-configuration/integrate/sso" >}})                                                                                                                                      | -	          |✅	              |✅	      
| [RBAC and API Teams]({{< ref "tyk-dashboard/rbac" >}})                                                                                                                                    | -	          |✅	              |✅	      
| [Universal Data Graph]({{< ref "universal-data-graph" >}})                                                                                                                                  | -	          |✅	              |✅	      
| [Multi-Tenant]({{< ref "basic-config-and-security/security/dashboard/organisations" >}})                                                                                                                                            | -	          |✅	              |✅	      
| [Multi-Data Center]({{< ref "tyk-multi-data-centre" >}})                                                                                                                                      | -	          |✅	              |✅	      
| [Developer Portal]({{< ref "tyk-developer-portal" >}})                                                                                                                                      | -		      |✅	              |✅	 
| [Developer API Analytics]({{< ref "tyk-dashboard-analytics" >}})                                                                                                                                 | -		      |✅	              |✅	   
| Hybrid Deployments                                                                                                                                         | -		      |-	              |✅
| Fully-Managed SaaS                                                                                                                                         | -		      |-	              |✅
| [HIPAA, SOC2, PCI](https://tyk.io/governance-and-auditing/)| ✅		      |✅	              | -


# Licensing
### Open Source (OSS)
The *Tyk Gateway* is the backbone of all our solutions. Fully functional gateway, batteries included. You can deploy it for free, forever.

Head on over to the [OSS section]({{< ref "apim/open-source" >}}) for more information on it and the other open-source components.

### Self-managed (On-Prem)

*Tyk Self-Managed* is the easiest way to install Tyk Full Lifecycle API Management solution in your infrastructure. There is no calling home, and there are no usage limits. You have full control. 

Register here to get a 14-day licenses for Full API management solution which includes the Tyk Dashboard & Developer Portal:
{{< button_left href="https://tyk.io/sign-up/" color="green" content="Free trial" >}}

For longer duration trials, or to request trials of the other proprietary software please contact the Tyk Team and tell us about your plans:
{{< button_left href="https://tyk.io/contact/" color="green" content="Contact us" >}}


See [licensing and deployment models]({{< ref "licensing" >}}) to learn about the different deployment options for *Tyk Self-Managed*.


### Cloud SaaS (Software as a Service)
With Tyk Cloud all of the above closed and open source components are available. Get your free account [here](https://account.cloud-ara.tyk.io/signup).


Head over to [Tyk Stack]({{< ref "tyk-stack" >}}) to learn about all the open and close source component that make up the various solutions.
