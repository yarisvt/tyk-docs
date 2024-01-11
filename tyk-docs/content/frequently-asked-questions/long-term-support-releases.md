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

## What Makes Long-Term Support (LTS) So Valuable to Our Customers?

Long Term Support describes a release of our Gateway and Dashboard which offers our customers, stability over a 1-2 year period. It also means we are committed to ensure you have uninterrupted service for the lifetime of the long term release. There are many customer benefits in keeping pace with our long term release:

1. **Stability**: Tyk will always strive to avoid issuing its latest release as a long term support release. Instead we prefer to let the release be proven in a production setting before it becomes LTS so we can iron out any rare issues.
2. **Security**: Tyk commits that the latest LTS will be secure at the point of release by containing the latest available Go version. This ensures Go related security issues are minimised.
3. **Functional Richness**: There will always be great capability contained in out latest LTS which moves your game on in terms of workflows.
4. **Continuation of Service**: We will patch the LTS version every 7 weeks for the period it remains in full support.

In summary, LTS releases are stable minor or patch releases that are suitable for production use.

{{< note success >}}
Our current Long Term Support release is version 5.0 LTS, which is in full support until April 2024 and then enters maintenance support until April 2025. Our next Long Term Support Release will be announced end of April 2024.
{{</ note >}}

---

## What Is Our LTS Offering?

We provide full support for the first 12 months, including regular maintenance intervals every seven weeks. Following this period, we transition to maintenance support for an additional 12 months, focusing on critical fixes and essential security patching as needed.

We offer a 24 month long term support offering for our Gateway LTS version. For the first 12 months we offer **full support** which means that we will fix every 7 weeks. After this 12 months period is up, we will revert to **maintenance support** for a further 12 months, which offers critical fixes and critical security patching only, with the cadence being on an 'as needed' basis.

We release a new Gateway LTS version every 12 months which includes the [latest stable Golang version](https://go.dev/dl/).

The advantages of a 12-month Long-Term Support (LTS) window include:

1. It allows us to keep pace with Golang versions and other key dependency upgrades, which kees both our customers and your customers safe (low CVE).
2. It allows us to bring you the best capability whilst offering stability.
3. It allows us to get great product insight and use that to improve the product.

In case there's a need to operate on a version beyond the established LTS policy, potential assistance may be available. However, this requires a discussion with your designated Account Manager."

| Version | Full Support Window | Maintenance Support Window | Completely Unsupported From |
| ---- | ---- | ---- | ---- |
| 4.0 LTS | April 2022 - April 2023 | May 2023 - April 2024 | May 2024 |
| 5.0 LTS | April 2023 - April 2024 | May 2024 - April 2025 | May 2025 |
| LTS+1 (version TBC) | April 2024 - April 2025 | May 2025 - April 2026 | May 2026 |
| LTS+2 (version TBC) | April 2025 - April 2026 | May 2026 - April 2027 | May 2027 |

---

## What About Non LTS Gateway Releases?

While we maintain a regular release schedule, it's important to clarify that these releases do not fall under the Long-Term Support (LTS) category. They introduce new capabilities, appealing to teams seeking the latest features upon release. However, these specific features become part of the subsequent LTS release.

Although these releases receive support, it's essential to note their limited support duration, extending only until the arrival of the subsequent release that supersedes them. For users prioritizing stability and consistent patching, the LTS releases offer a more suitable choice.

---

## Major / Minor / Patch - How Do We Decide?

We know that an LTS release which has a major semantic version is not a desirable practice.

So, we will always endeavour to avoid shipping major versions, especially major versions as LTS releases. However, sometimes it is unavoidable and we have to ship a major version. 

Our first commitment to you is to make our definitions of major / minor / patch transparent:

#### Major Version

The major version is designated as X.0 and is defined by one or more of the following:

1. Breaking changes to Tyk Gateway API, Tyk Dashboard API or Tyk custom plugins interfaces. Tyk Gateway and Tyk Dashboard APIs include not just the endpoints, but also return error codes and messages, in addition to logging details. In summary, breaking changes involves anything where a user interacts with a Tyk product and might have to make changes to maintain functionality in response to a change we implement.
2. Deprecation of existing functionality or engines that breaks a key business process.
3. Breaking changes in the Go plugin compiler for users' Go plugins after plugins have been recompiled.
4. Crypto deprecations.
5. Changes to common names in certficates.
6. A change which amends behaviour of a configuration setting.

Our default setting is NOT to introduce breaking changes, but sometimes it is necessary. If we do introduce breaking changes we have a collective choice to make; if we document the breaking change well and offer migration scripts, we may be able to classify as a minor. If we cannot do that, then it should be a major version.

#### Minor Version

According to the *Semantic Versioning* [specification](https://semver.org/), a MINOR version is incremented when you add functionality in a backwards compatible manner. In other words, if Tyk makes changes to your software that do not break any existing functionality, you can increment the MINOR version number. For example, if you add new features or capabilities to your software without changing any existing functionality, you can increase the MINOR version number.

#### Patch Version

A patch, sometimes just called a fix, is a small piece of code that's used to correct a problem, usually called a bug, with an operating system or software program.

Patches are software and Operating System (OS) updates that address security vulnerabilities within a program or product. Tyk may choose to release updates to fix performance bugs, as well as to provide enhanced security features.

---

## Compatibility

Tyk has a few different components which can drive questions on what version of X goes with what version of Y.

When we release a new Gateway version, it triggers us to be clear on version compatibility with other areas of the Tyk stack.

As part of the release for the new Gateway LTS version we will commit to show everyone 2 compatibility dimensions:

1. What component versions would you require to fully utilise the latest Tyk experience across the entire stack
2. What components and versions remain backwards compatible with the new Gateway version.

The table below is an illustrative example, but shows the intent:

| Gateway Version | Recommended Compatibility | Backwards Compatibility |
|----    |---- |---- |
| 5.3 LTS | Helm v2.2     | Helm vX - vY |
|         | MDCB v2.5     | MDCB v1.7 - v2.4 |
|         | Operator v1.8 | Operator vX - vY |
|         | Sync v2.4.1   | Sync vX - vY |
| | | EDP vX - vY |
| | | Pump vX - vY |
| | | TIB vX - vY |

The compatibility matrix table shown above will be part of upcoming [Gateway release notes]({{< ref "product-stack/tyk-gateway/release-notes/overview" >}}) for versions 5.3 and beyond. Additionally, these release notes will list tested third-party dependencies like *PostgreSQL, MongoDB, Redis*, and more.

--- 

## How Do I Upgrade and How Can Tyk Help?

We have step by step install guides for various architectures and installation types. Refer to [upgrading tyk]({{< ref "upgrading-tyk" >}}) for further details.

And don't forget, our brilliant Customer Success Teams and Account Managers are here to assist you with any issues - pleases refer to your SLA on the specifics of how we can help!

---

## Keep Me Informed!

To receive updates on our upcoming Long-Term Support (LTS) release schedule and its contents, feel free to subscribe to our [mailing list]()

---

## Support Arrangements For Other Tyk Components

The Tyk product is comprised of various components, such as Tyk Sync, Tyk Pump and Tyk Operator. Some of these components are more standalone than others, which allows us to operate different release cadences. Consequently, we strive to avoid long term support policies for any component, except Tyk Gateway and Tyk Dashboard.

Tyk Gateway and Tyk Dashboard represent the core product and contain the majority of our workflows. Subsequently, these have a long term support policy.

#### Enterprise Portal

We strive to avoid any long term support arrangements for our Enterprise Portal. We run a regular 6 week release cadence which delivers new capability, extension of existing capability and bug fixes. Our policy is that we aim to avoid any breaking changes, so in effect the entire Enterprise Portal is supported. Here we'd increment out version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

We support our release cadence with a critical fix process. This is invoked when a severity one incident is declared, usually defined as systems down time, no workaround or a critical security issue.

Our critical fix process commits to release as soon as possible and we issue a standalone fix outside of our normal cadence.

The only exception to this policy is if we every need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After the six months is up, the previous major version falls out of support.

If you are using Enterprise Portal on Tyk Cloud, we keep you safe, secure and up to date with the latest features by auto upgrading you to the latest version. When a new release is launched, older versions are immediately deprecated. If a customer wants to use a previous version, this is possible via rollback. However, if an issue arises on an older version our advice would be to upgrade to the latest version.

#### Tyk Pump, Tyk Identity Broker, MDCB and Tyk Operator

Minor updates to Tyk Pump, Tyk Identity Broker (TIB), MDCB and Tyk Operator are deployable swiftly with minimal risk and no breaking changes. Tyk will provide support for the latest *major.minor* version (e.g. Tyk Pump v1.7) until the subsequent *major.minor* version (e.g. Tyk Pump v1.8) is released, at which point support for the newer version will commence."

To ensure backward compatibility, we confirm that each Pump release and other components are compatible with the Long-Term Support (LTS) versions of the Gateway and Dashboard. For instance, *Tyk Pump* v1.7 undergoes validation to ensure compatibility with release v4 of *Tyk Gateway* and *Tyk Dashboard*. This alignment persists under the LTS model. Following the semantic versioning convention, if there's a need for a fix in the *Tyk Pump* version, it will be labelled as a patch version (e.g., v1.7.1).
