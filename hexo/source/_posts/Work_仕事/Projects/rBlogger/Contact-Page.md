---
title: Contact Page
sticky: 999
comments: true
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
geolocation: 'Itabashi, Tokyo, Japan'
copyright: true
mathjax: false
share: true
tags:
  - migrated from rBlogger.2009
  - Blog
  - Web design
categories:
  - Work_仕事
  - Projects
  - rBlogger
date: 2009-11-23 02:17:09
---

I have revamped my Contact page due to issues with EXTjs 3.0 library's Window.hide() function bugs.


While all works great in Firefox, IE chokes on javascript...


<i>Update</i>:

&nbsp;&nbsp;&nbsp;I have resolved the bugs related to the Ext.Window().hide() function. I found that my scoping was lost due to the way I instantiated the function. So, while I am able to once again have the Contact form open up in a "Window," I feel that most users will appreciate a separate page more... In any case, this method improves load time of my home page since it doesn't require any javascript...
