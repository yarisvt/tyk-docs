---
date: 2019-07-11
title: “Error initialising system couldnt unmarshal config“ error
menu:
  main:
    parent: "Tyk Installation"
weight: 5 
---

### Description

Users receive the error "Error initialising system: couldn't unmarshal config: invalid character” in their logs.

### Cause

Users may not have proper syntax in the Tyk configuration files.

### Solution

Copy the content from  Tyk configuration files and paste them on [JSONlint][1] to validate the JSON syntax.

 [1]: https://jsonlint.com/