---
date: 2017-03-22T15:27:06Z
Title: Installation
menu:
  main:
    parent: "Tyk On Premise"
weight: 0 
---

## Install Tyk on-premise: Managed releases and package options

Tyk can be installed on almost any Linux environment, we've also created Docker containers that can be deployed and configured easily. Supported by the Tyk team, you can get Tyk for:

* [Ubuntu][1] (x86, ARM and AMD64)
* [Redhat][2] / CentOS (x86, ARM and AMD64)
* [Tarballs][3] for any other Linux variant (x86, ARM and AMD64)

We distribute Tyk via Packagecloud.io APT and Yum repositories, as well as via our [Github repository for the Tarballs][3]. We also provide nightly builds which are available for all major Tyk Components:


## Nightly Builds

In order to ensure that Community Edition contributors and Pro users get the most out of Tyk and for those seeking out bleeding-edge features (for example if you've contributed to Tyk CE and we've added those features to Tyk Pro Dashboard), we build the `development` branch Tyk Gateway, Tyk Pump and Tyk Dashboard nightly and make them available for download as tarballs.

This means that if we merge a pull request, fix a bug, or update our Trello board saying a feature has been integrated into the dashboard, it is very likely to appear in the nightly build. Which means you can get your features, faster.

### Usage

These builds are vanilla tarballs and are not meant to be used as a quickstart - they are for more experienced users that have already installed and configured Tyk themselves.

In 99.9% of cases, the tarball can be extracted and *only the binary needs replacing* in your production setup.

### Caveats and warnings

These builds are from our development branch and are purged / updated nightly, so there are *absolutely no guarantees* with these builds.

### Download nightly builds

*   [Tyk Gateway nightlies][4]
*   [Tyk Dashboard nightlies][5]
*   [Tyk Pump nightlies][6]



[1]: /get-started/with-tyk-on-premise/installation/on-ubuntu/
[2]: /get-started/with-tyk-on-premise/installation/redhat-rhel-centos/
[3]: https://github.com/TykTechnologies/tyk/releases
[4]: http://tyk-nightlies.s3-website-us-east-1.amazonaws.com/
[5]: http://tyk-dashboard-nightly.s3-website-us-east-1.amazonaws.com/
[6]: http://tyk-pump-nightly.s3-website-us-east-1.amazonaws.com/