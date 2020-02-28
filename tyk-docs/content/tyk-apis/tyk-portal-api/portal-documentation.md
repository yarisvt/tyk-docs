---
date: 2017-03-27T12:28:24+01:00
title: Portal Documentation
menu:
  main:
    parent: "Tyk Portal API"
weight: 6
---
This section covers both documentation and catalogue endpoints

## Documentation

### Create Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation` |
| Method       | POST                     |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Delete Documentation

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/documentation` |
| Method       | DELETE                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
DELETE/api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

## Catalogue

### List Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | GET                    |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
GET /api/portal/documentation HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Create Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | POST                   |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
POST /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```

### Update Catalogue

| **Property** | **Description**          |
| ------------ | ------------------------ |
| Resource URL | `/api/portal/catalogue`  |
| Method       | PUT                      |
| Type         | None                     |
| Body         | None                     |
| Param        | None                     |

#### Sample Request

```{.copyWrapper}
PUT /api/portal/catalogue HTTP/1.1
Host: localhost
authorization:7a7b140f-2480-4d5a-4e78-24049e3ba7f8
```

#### Sample Response

```
{
  Response here
}
```