---
title: Tyk Enterprise Developer Portal v1.8.1
description: Release notes documenting updates, enhancements and changes for Tyk Enterprise Developer Portal v1.8.2
tags: ["Developer Portal", "Release notes", "changelog", "v1.8.2"]
menu:
main:
parent: "Release Notes"
weight: 7
---

**Licensed Protected Product**

### Support Lifetime
We strive to avoid any long-term support arrangements for our enterprise portal. We run a regular 6-week release cadence which delivers new capability, extension of existing capability, and bug fixes. Our policy is that we aim to avoid any breaking changes, so in effect, the entire enterprise portal is supported. Here we'd increment our version as a minor version - 1.3.0, 1.4.0, 1.5.0 etc.

Occasionally, we may see a need to issue a critical fix if there is a system down or a critical security defect. Here we would release this as soon as is physically possible and the semantic versioning would reflect a patch (1.3.1, 1.4.1 etc).

The only exception to this policy is if we ever need to release a breaking change. This would mean that we have to release a new major version (i.e. releasing version 2.0). In this exceptional circumstance we would support both the old major version and the new one concurrently for six months - please note that the old version only gets supported in terms of critical fixes, not new functionality. After six months, the previous major version falls out of support.

##### Release Date 22 Dec 2023

#### Breaking Changes
This release has no breaking changes.

#### Future breaking changes
This release doesn't introduce future breaking changes.

#### Deprecations
There are no deprecations in this release.

#### Upgrade instructions
If you are on 1.8.1 or an older version we advise you to upgrade ASAP directly to this release.

To upgrade the portal's theme please follow the [upgrade instructions]({{< ref "product-stack/tyk-enterprise-developer-portal/upgrading/theme-upgrades" >}}) for the portal's themes.


# Release Highlights
The 1.8.2 release addresses multiple high-priority bugs:
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.

# Download
- [Docker image to pull](https://hub.docker.com/layers/tykio/portal/v1.8.0/images/sha256-d93fcfbbcc4a72d3f6abf49ce65f234e6e65915a43cca3a30d5376e5fab2d644?context=explore)
- [The default theme package](https://github.com/TykTechnologies/portal-themes/blob/main/v1.8.0/default.zip)

# Changelog

## Fixed
- Fixed the bug where an API Consumer could add incompatible products to a cart making its state inconsistent.
- Fixed the bug where it was possible to use the same session cookie from different IP addresses making the portal vulnerable to the [Cross-Site Request Forgery (CSRF) attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery).
- Fixed the bug where an admin user couldn't create a new team in Kubernetes environment.
- Fixed the bug where the navigation in the API documentation was broken when Redoc is selected as a documentation rendering engine.


# Further Information

## Upgrading Tyk
Please refer to the [upgrading Tyk]({{< ref "upgrading-tyk" >}}) page for further guidance with respect to the upgrade strategy.

## FAQ
Please visit our [Developer Support]({{< ref "frequently-asked-questions/faq" >}}) page for further information relating to reporting bugs, upgrading Tyk, technical support and how to contribute.
