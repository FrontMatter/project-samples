---
title: '(DONE) Forum: new forum'
sticky: 999
comments: false
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
swiper: false
geolocation: 'Tokyo, Japan'
copyright: true
mathjax: false
share: false
tags:
  - migrated from rBlogger.2009
categories:
  - Work_仕事
  - TODO
date: 2011-01-28 12:04:57
---

 <ul><li>pre-populate the parent with the current selected forum!​</li><li>add viewType to blogForum table (int)</li><li>If viewType is gallery, then show the <u>blogIMGbox</u> component</li></ul>
Reorganize the ext.include_once function calls so that the callbacks from the UI will call the appLogic.
Update include_once to display a mask, or just manually call ext.mask for the load and remove mask on the callback.