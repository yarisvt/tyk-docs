---
date: 2017-03-27T12:28:24+01:00
title: Portal Keys
menu:
  main:
    parent: "Tyk Portal API"
weight: 1
---

### List All Key Requests

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/requests`   |
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
Response here
}
```

### List a Single Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | GET                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/requests/KEYID HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
Response here
}
```

### Update a Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | UPDATE                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
UPDATE /api/portal/requests/KEYID HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
Response here
}
```

### Delete a Key Request

| **Property** | **Description**            |
| ------------ | -------------------------- |
| Resource URL | `/api/portal/requests/{id}`|
| Method       | DELETE                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE /api/portal/requests/KEYID HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
Response here
}
```

### Create Key Requests

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/requests`        |
| Method       | POST                          |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
POST /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
 Response here
}
```

### Approve Key Requests

| **Property** | **Description**               |
| ------------ | ----------------------------- |
| Resource URL | `/api/portal/requests/approve/{id}`|
| Method       | PUT                           |
| Type         | None                          |
| Body         | Developer Object              |
| Param        | None                          |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/requests HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
 Response here
}
```
