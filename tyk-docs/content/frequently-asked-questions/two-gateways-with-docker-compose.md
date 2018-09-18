---
date: 2017-03-27T16:13:15+01:00
title: How to run two gateways with docker-compose
menu:
  main:
    parent: "Frequently Asked Questions"
weight: 0 
---


Spinning up another gateway with our [pro-demo-repo](https://github.com/TykTechnologies/tyk-pro-docker-demo) is very simple. 
All you need to do is add a few lines to docker-compose.yml and docker-compose.yml and `up` your docker-compose as usual.

> **Please note**: This will only work with an appropriate license. The free license is for development purposes and would allow running Tyk's platform with one gateway. If you want to test Tyk with more please contact us here  info@tyk.io and we will be happy to discuss your case and PoC requirements.



1. Add the following to docker-local.yml
    ```yml
     tyk-gateway2:
        volumes:
        - ./confs/tyk.conf:/opt/tyk-gateway/tyk.conf
    ```

2. Add the following to docker-compose.yml (after _tyk-gateway2_ definition):
```yml
  tyk-gateway2:
     image: tykio/tyk-gateway:latest
     ports:
     - "8081:8080"
     networks:
     - tyk
     depends_on:
     - tyk-redis
```

3. In docker-compose.yml, under tyk-pump section, _depends_on_ add the gateway's name:
```yml
  tyk-pump:
     image: tykio/tyk-pump-docker-pub:latest
     networks:
     - tyk
     depends_on:
     - tyk-redis
     - tyk-mongo
     - tyk-gateway
     - tyk-gateway2
```
