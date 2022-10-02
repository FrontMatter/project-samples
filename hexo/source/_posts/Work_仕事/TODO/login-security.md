---
title: login security
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
  - Sencha
categories:
  - Work_仕事
  - TODO
date: 2011-04-22 11:58:39
---

 Add session expire time to local vars... When session ends, check for last activity. 

 If last activity was within previous hour, update DB with new sessionID and expire time. Otherwise, auto logout with message.

 Upon init, create a timer that triggers a function call that verifies recent activity. IF none, then auto logout...
---

 This requires an update of the logout php. Add message for logout type.
 If normal logout, then a thank you message.
 Otherwise, state: "Session has timed out and your console was closed..."