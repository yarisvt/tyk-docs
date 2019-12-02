---
date: 2018-05-18T15:46:41Z
Title: Install Tyk On-Premises on AWS
menu:
  main:
    parent: "Installation"
weight: 6
url: "/get-started/with-tyk-on-premise/installation/on-aws"
---


## CloudFormation
To get started easily with deployment on AWS, Tyk offers AWS CloudFormation products which run and bootstrap the entire stack.

It uses Elasticache for in-memory, and a Mongo Master/Slave setup with two slaves.

There are three CloudFormation products to get you started. 

- [**PoC**][2]
- [**High Availability (2-node)**][4]
- [**AutoScaling (3+ node)**][3]

### Pricing / Licensing
The license for these products is baked into the product as an hourly cost.

### Example
Here's a video to walk you through how to set up a PoC environment:


## CloudFormation BYOL (Bring Your Own License)
You may already have a license, and simply want help launching a Tyk Stack on AWS.  For you, there is a BYOL CloudFormation product that will get you started with a 2 Gateway node stack:

[Tyk Pro High Availability][1]

[1]: https://aws.amazon.com/marketplace/pp/prodview-nphqjavwaqes6?qid=1575313064731&sr=0-2&ref_=srh_res_product_title
[2]: https://aws.amazon.com/marketplace/pp/prodview-elvk5mxxlkueu?qid=1575313242174&sr=0-4&ref_=srh_res_product_title
[3]: https://aws.amazon.com/marketplace/pp/prodview-2bgdxbpeygf5w?qid=1575313242174&sr=0-5&ref_=srh_res_product_title
[4]: https://aws.amazon.com/marketplace/pp/prodview-nempvlrcr4fq4?qid=1575313242174&sr=0-3&ref_=srh_res_product_title