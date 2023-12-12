---
title: "Long Term Support Releases"
date: 2023-12-11
tags: ["FAQ", "Long Term Support", "LTS"]
description: "Long Term Releases and how we support them"
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0
---

Welcome to Tyk's Long Term Support (LTS) Releases page. Here, we'll walk you through the practical aspects of how LTS benefits your business. Explore our approach to stability, understand semantic versioning and learn about our compatibility policies. We'll also cover support for non-LTS components and provide links on upgrading and staying informed about new LTS releases.

## Why Customers Love Long Term Support (LTS)?

Long Term Support describes a release of our Gateway and Dashboard which offers our customers, stability over a 1-2 year period. It also means we are committed to ensure you have uninterrupted service for the lifetime of the long term release. There are many customer benefits in keeping pace with our long term release:

1. **Stability**: Tyk will always strive to avoid issuing its latest release as a long term support release. Instead we prefer to let the release be proven in a production setting before it becomes LTS so we can iron out any rare issues.
2. **Security**: Tyk commits that the latest LTS will be secure at the point of release by containing the latest available Go version. This ensures Go related security issues are minimised.
3. **Functional Richness**: There will always be great capability contained in out latest LTS which moves your game on in terms of workflows.
4. **Continuation of Service**: We will patch the LTS version every 7 weeks for the period it remains in full support.

{{< note success >}}
Our current Long Term Support release is version 5.0 LTS, which is in full support until April 2024 and then enters maintenance support until April 2025. Our next Long Term Support Release will be announced end of April 2024.
{{</ note >}}

---

## What Is Our LTS Offering?

We offer a 24 month long term support offering for our Gateway LTS version. For the first 12 months we offer **full support** which means that we will fix every 7 weeks. After this 12 months period is up, we will revert to **maintenance support** for a further 12 months, which offers critical fixes and critical security patching only, with the cadence being on an 'as needed' basis.

We will release a new LTS Gateway version every 12 months which is upgraded to latest Golang version by default.

Let's just remind ourselves of the benefits to a 12 month LTS window:

1. It allows us to keep pace with Golang versions and other key dependency upgrades, which kees both our customers and your customers safe (low CVE).
2. It allows us to bring you the best capability whilst offering stability.
3. It allows us to get great product insight and use that to improve the product.

If you have a requirement to run on a non supported version for longer than the LTS policy, we may be able to help - but this would require a discussion with your Account Manager.

| Version | Full Support Window | Maintenance Support Window | Completely Unsupported From |
| ---- | ---- | ---- | ---- |
| 4.0 LTS | April 2022 - April 2023 | May 2023 - April 2024 | May 2024 |
| 5.0 LTS | April 2023 - April 2024 | May 2024 - April 2025 | May 2025 |
| LTS+1 (version TBC) | April 2024 - April 2025 | May 2025 - April 2026 | May 2026 |
| LTS+2 (version TBC) | April 2025 - April 2026 | May 2026 - April 2027 | May 2027 |

---

## What About Non LTS Gateway Releases?

As we release regularly, there will of course be other release issues throughout the year. These are NOT long term support releases. These releases offer new capability and are designed to appeal to teams who want the latest capability as soon as it lands. This capability will be subsumed into the next LTS release, however.

These releases are supported, but the support windows is small - they are supported only until the next release comes out and supersedes it. So if you want stabilty and regular patching then LTS releases are for you.

---

## Major / Minor / Patch - How Do We Decide?

We know that an LTS release which has a major semantic version is not a desirable practice.

So, we will always endeavour to avoid shipping major versions, especially major versions as LTS releases. However, sometimes it is unavoidable and we have to ship a major version. 

Our first commitment to you is to make our definitions of major / minor / patch transparent:

#### Major Version

The major version is designated as X.0 and is defined by one or more of the following:

1. Breaking changes to Tyk Gateway or Tyk Dashboard APIs. Tyk APIs include not just the endpoints, but also return error codes and messages, logging details - basically anything were a user interacts with a Tyk product and might have to make changes to maintain functionality in response to a change we implement.
2. Deprecation of existing functionality or engines that breaks a key business process.
3. Breaking plugin compiler for customer Go plugins after plugins have been recompiled.
4. Crypto deprecations.
5. Changes to common names in certficates.
6. Breaking public function calls.
7. A change which amends behaviour of a configuration setting.

Our default setting is NOT to introduce breaking changes, but sometimes it is necessary. If we do introduce breaking changes we have a collective choice to make; if we document the breaking change well and offer migration scripts, we may be able to classify as a minor. If we cannot do that, then it should be a major version.

#### Minor Version

According the the **Semantic Versioning** specification, a **MINOR** version is incremented when you add functionality in a backward compatible manner. In other words, if Tyk make changes to your software that do not break any existing functionality, you can increment the **MINOR** version number. For example, if you add new features or capabilities to your software without changing any existing functionality, you can increase the **MINOR** version number.

#### Patch Version

A patch, sometimes just called a fix, is a small piece of software that's used to correct a problem, usually called a bug, with an operating system or software program.

Patches are software and Operating System (OS) updates that address security vulnerabilities within a program or product. Tyk may choose to release updates to fix performance bugs, as well as to provide enhanced security features.

---

## Compatibility

Tyk has a few different component which can drive questions on what version of X goes with what version of Y.

When we release a new Gateway version, it triggers us to be clear on version compatibility with other areas of the Tyk stack.

As part of the release for the new Gateway LTS version we will commit to show everyone 2 compatibility dimensions:

1. What component versions might you need to leverage the very latest Tyk experience across the entire stack.
2. What components and versions remain backwards compatible with the new Gateway version.

The table below is illustrative, but shows the intent:

| Gateway Version | Compatibility versions for best experience | Backwards Compatibility - MDCB | Backwards Compatibility - Operator | Backwards Compatibility - Helm | Backwards Compatibility - EDP | Backwards Compatibility - Pump | Backwards Compatibility - Sync | Backwards Compatibility - TIB |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 5.3 LTS | MDCB 2.5 Operator 1.8 Helm 2.2 Sync 2.4.1 | Version 1.7 to 2.4 inclusive | Versions X to Y | Versions X to Y | Versions X to Y | Versions X to Y | Versions X to Y | Versions X to Y |

--- 

## How Do I Upgrade and How Can Tyk Help?

We have step by step install guides for various architectures and installation types.

Head [here]({{< ref "upgrading-tyk" >}}) to find them!

And don't forgeth, our brilliant Customer Success Teams and Account Managers are here to assist you with any issues - pleases refer to your SLA on the specifics of how we can help!

---

## Keep Me Informed!

Do you want to know when our next LTS is? And what might be in it? Subscribe to our mailing list [here]()!

---

## Support Arrangements For Other Tyk Components

#### Enterprise Portal

We strive to avoid any long term support arrangements for our Enterprise Portal. We run a regular 6 week release cadence which delivers new capability, extension of existing capability and bug fixes. Our poliocy is that we aim to avoid any breaking changes, so in effect the entie Enterprise Portal is supported. Here we'd increment out version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

Occasionally, we may see a need to issue a critical fix if there is a systems down time or a criticial security defect. Here would release this as as soon as physically possible and the semantic versioning would reflect a patch (1.3.1, 1.4.1. etc).

The only exception to this policy is if we every need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After the six months is up, the previous major version falls out of support.

If you are using the Enterprise Portal on Tyk Cloud, we recommend you use the latest version at all times and we auto upgrade to that version on TYk Cloud. When a new release is launched, older versions are immediately deprecated . This gives you the best, latest and most secure capability. If a customer wants to use a previous version, this is possible via rollback; but if an issue arises on an older version our advice would be simply to upgrade to the latest version.

#### Other Components

Minor updates to Tyk Pump, Tyk Identity Broker (TIB), MDCB and Operator are deployable quickly with low risk and no breaking changes. Tyk will support the latest major.minor version (e.g. Pump 1.7) until the next major.minor version (1.8) is released. Then we'd support that version.

To help assure backward compatibility we ensure that each version of Pump and other components we release works with the Gateway and Dashboard versions which are under Long Term Support (LTS) at that time. For example, we'd ensure Pump v1.7 is compatible with release v4 of Tyk Gateway and Tyk Dashboard, and this increments with the LTS model.Following semver convention, if we need to patch a minor Pump version, we would number that as a patch version (e.g. 1.7.1).
