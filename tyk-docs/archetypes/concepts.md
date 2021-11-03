---
title: "{{ replace .Name "-" " " | title }}"
date: {{ dateFormat "2006-01-02" .Date }}
tags: [""]
description: ""
weight: 0
draft: true
---

## Content of your overview

### Who is this overview for

* Are you writing for developers or for managers?
* Are you writing for people who have a certain problem to solve?
* Are you writing for a particular industry or market segment?

### Body of the overview

Contains information that helps the reader get oriented to the API. Answers these questions:

* What is it supposed to do? (What problem does it solve, and for whom?)
* What exact capabilities are available to the user? What services does it offer?
* What does it not do that developers should know about?
* What are the typical use cases?
* How does it work? (What do users need to know about architecture an internal components?)
* What dependencies does the developer need to know about before installing?
* What technical requirements do readers need? Include development environment and licensing requirements.
* What knowledge prerequisites does the developer need to know about before using the API?

### Post-requisites

* What comes next? Do you want to direct users to the Quick Start to try it out?
* How to get started with the API?

## More information

### Overview examples

* **Chrome Native Client**. [The Native Client Technical Overview](https://developer.chrome.com/native-client/overview) explains an engine that allows C++ to run in the browser, including why it's a good solution for engineers who want to rework a desktop app and make it usable as a web app.

* **The Jira Platform**. [This overview of the Jira Platform](https://www.atlassian.com/software/jira/guides/getting-started/overview#about-the-jira-platform) does a good job of explaining products and the associated use cases, third-party integrations, hosting options, and licensing.
