---
title: 'A Beginner''s Guide to Using the Application Cache [Mobile WebApp]'
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
geolocation: 'Tokyo, Japan'
copyright: true
mathjax: false
share: true
tags:
  - migrated from rBlogger.2009
categories:
  - Work_仕事
  - Programming_開発
  - PHP
date: 2011-03-10 08:59:31
---

 http://www.html5rocks.com/tutorials/appcache/beginner/

This can point to a dynamic, server-side script (PHP) that modifies the comments section with current TimeStamp. In the PHP script, we can manually define the required header information:

```content type: text/cache-manifest```

Additionally, we can add logic to add required resources depending on the referrer or some variable.