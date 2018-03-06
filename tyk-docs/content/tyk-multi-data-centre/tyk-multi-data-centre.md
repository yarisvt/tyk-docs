---
date: 2017-03-24T16:39:31Z
title: Tyk Multi Data Centre
weight: 95
menu: "main"

---

## <a name="introduction"></a>Introduction
Tyk has On-Premises installation functionality to allow you to control geographically dispersed Tyk installations from a "Master Data Centre" installation.

## <a name="use-case"></a>Use Case 

You are company ABC with the following Data Centre Locations:

* Chicago
* New York
* San Francisco

You want to have your Master Data Centre installation based in Chicago, with further Tyk Gateway installations in New York and San Francisco.

To do this requires the use of our Tyk **Multi Data Centre Bridge (MDCB)**. MDCB is a separately licensed product that allows you to set up Tyk in the above manner.

## <a name="more-mdsb-info"></a>More Information on MDCB

### How MDCB Works

See [here](https://tyk.io/docs/manage-multiple-environments/with-on-premise/multi-data-center-bridge/#how-tyk-mdcb-works) for an overview of MDCB

### MDCB Architecture
See [here](https://tyk.io/docs/manage-multiple-environments/with-on-premise/multi-data-center-bridge/#logical-architecture) for a diagram of the MDCB Architecture and how the Master and Local Data Centres work together.

### How to Setup MDCB

See [here](https://tyk.io/docs/manage-multiple-environments/with-on-premise/multi-data-center-bridge/mdcb-setup/) for details of how to configure MDCB with the `tyk_sink.conf` file.




