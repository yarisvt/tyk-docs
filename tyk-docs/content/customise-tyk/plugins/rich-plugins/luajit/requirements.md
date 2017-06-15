---
date: 2017-03-24T13:43:51Z
title: Requirements
menu:
  main:
    parent: "LuaJIT"
weight: 0 
---

Tyk uses [LuaJIT][1]. The main requirement is the LuaJIT shared library, you may find this as `libluajit-x` in most distros.

For Ubuntu 14.04 you may use:

`$ apt-get install libluajit-5.1-2
$ apt-get install luarocks`

The LuaJIT required modules are as follows:

*   [lua-cjson][2]: in case you have `luarocks`, run: `$ luarocks install lua-cjson`
*   From v1.3.6 You can also use override response code, headers and body using ReturnOverrides. See the [Extend ReturnOverides][3] sample for details.

 [1]: http://luajit.org/
 [2]: https://github.com/mpx/lua-cjson
 [3]: https://github.com/TykTechnologies/tyk/pull/763

