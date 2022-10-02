---
title: '[Resolved] IE8 bug - ie error: system does not support the specified encoding'
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
date: 2011-03-08 07:02:06
---

 http://support.microsoft.com/kb/319200

 http://www.iana.org/assignments/character-sets<span class="pLink"> </span>

 change the header to send all the json responses in ```UTF-8``` and not ```utf-8```... <b>VERIFIED 2011/03/08.</b>

 2011/03/09 - problem persists!
 >Look at why the ajax request in the login.html works while all other requests fail in the admin console...
 

For IE, test using content-type: text/plain vs text/html (without <i>charset</i> param)


 For IE and IE ONLY, remove the charset parameter and keep content-type = text/html.
 For other browsers, send the charset param.