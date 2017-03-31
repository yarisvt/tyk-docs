# tyk-docs

Contains tickets and content for new pipeline-based docs site.

## How to use

This pipeline currenlty uses [hugo](http://gohugo.io/) to generate a basic bootstrap-based documentation site.

**To use:**

1. Install Hugo 
2. Clone this repo 
3. Run `hugo server --theme=tykio --buildDrafts`
4. Go to  http://localhost:1313/get-started to visit the first page (there is no index yet).


## Adding and editing content

In the directory `tyk-docs/content` there is currently a baseline heirarchy to show how nested content works, it mimics the first three pages in our current docs site.

To create a new page, you need to run:

`hugo new get-started/with-tyk-cloud/create-an-account/index.md`

Notice how we have the full path we want there: `get-started/with-tyk-cloud/create-an-account/` and we use `index.md` as if it were an `index.html` file.

In each file there is a "front matter": in hugo-speak:

```
---
date: 2017-03-08T18:15:57+13:00
title: Create an Account
menu:
  main:
    parent: 'Tyk Cloud'
weight: 5
---
```

You can create a dynamic, nested navigation heirarchy simply by changing the `parent` field to the name of the parent page (note,m these names *must be unique*)

To create a new top-level page, the front matter just looks like this:

```
--- 
date: 2017-03-08T18:15:30+13:00
title: Get started with Tyk
menu: "main"
weight: 0
---
```

Notice that we just define the `menu` field as a simple string. 

## Content

The content itself is just markdown that follows the front matter block. When you add and edit new content, hugo should auto-reload and you should be able to see the changes live in your browser (if not, refresh). Sometimes hugo gets confused and you need to re-run it.

### But martin, this template look slike sh*t, what gives?

Well, it's as simple as possible on purpose, because we want a new docs site and we want it to be easy to style, so once we have content and heirarchy sorted out, we can style and make it match our sitge by fixing the theme in the `tykio/` folder.

### Navigation

The template currently supports 3 levels of navigation, it's easy to add more - just see the `menu.html` file in the `layouts/` folder

## The pipeline

If you push to this repository, Buddy Works will compile and push the static site to our dev server (details in slack).