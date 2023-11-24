---
title: Latest Releases And Dependencies
description: This page summarises latest Tyk Releases and Dependencies
---

This page provides the latest releases and dependencies for Tyk Open Source and licensed components, in addition to Helm Charts. Furthermore, the following information is linked:
- Tags for patch and LTS releases.
- Docker images for patch and LTS releases.

## Latest Releases

### Open Source

| Component   | Release  | LTS   | Docker  |
|-------------|----------|-------|---------|
| Gateway     | [5.2.3](https://github.com/TykTechnologies/tyk/releases/tag/v5.2.3)| [5.0.8](https://github.com/TykTechnologies/tyk/releases/tag/v5.0.8) | [image](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=1&name=5.2.3) and [LTS](https://hub.docker.com/r/tykio/tyk-gateway/tags?page=1&name=5.0.8) |
| Pump        | [1.8.3](https://github.com/TykTechnologies/tyk-pump/releases/tag/v1.8.3) | | [image](https://hub.docker.com/r/tykio/tyk-pump-docker-pub/tags?page=1&name=1.8.3) |
| TIB         | [1.4.3](https://github.com/TykTechnologies/tyk-identity-broker/releases/tag/v1.4.3)  |  | [image](https://hub.docker.com/r/tykio/tyk-identity-broker/tags?page=1&name=1.4.3)           |
| Operator    | [0.15.1](https://github.com/TykTechnologies/tyk-operator/releases/tag/v0.15.1)   |       | [image](https://hub.docker.com/r/tykio/tyk-operator/tags?page=1&name=0.15.1)         |


### Licensed

| Component   | Release | LTS   | Docker |
|-------------|--------|-------|---------|
| Dashboard   | 5.2.3  | 5.0.8 | [image](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=1&name=5.2.3) and [LTS](https://hub.docker.com/r/tykio/tyk-dashboard/tags?page=1&name=5.0.8)     |
| MDCB        | 2.4.1  |       | [image](https://hub.docker.com/r/tykio/tyk-mdcb-docker/tags?page=1&name=2.4.1)      |
| Portal      | 1.8.0  |       | [image](https://hub.docker.com/r/tykio/portal/tags?page=1&name=1.8)        |


### Helm Charts

| Component   | Patch  |
|-------------|--------|
| Helm Charts | [1.1.0](https://github.com/TykTechnologies/tyk-charts/releases/tag/v1.1.0)  |


## Dependencies

| Dependency      | Supported Version(s) | Tested Version(s) | Website |
| --------------- | -------------------- | ----------------- | ------- |
| Golang          |                      | 1.19              | [website](https://go.dev/) |
| Redis           |                      | 6.2.x and 7       | [website](https://redis.io/) |
| MongoDB         |                      | 4.4.x, 5.0.x and 6.0.x | [website](https://www.mongodb.com/) |
| DocumentDB      |                      | 3.6 and 4 | [website](https://aws.amazon.com/documentdb/) |
| CosmosDB(SQL)   |                      | 3.6 and 4 | [website](https://azure.microsoft.com/en-gb/products/cosmos-db/) |
| CosmosDB(NoSQL) |                      | 3.6 and 4 | [website](https://azure.microsoft.com/en-gb/products/cosmos-db/) |
| MySQL           |                      | 4+ | [website](https://www.mysql.com/) |
| SQLite          |                      | 4+ | [website](https://www.sqlite.org/index.html) |
| PostgreSQL      |                      | 11.x - 15.x LTS | [website](https://www.postgresql.org/) | 

