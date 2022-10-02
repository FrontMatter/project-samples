---
title: Ext.ux.window.Notification
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
  - Javascript
  - ExtJS
date: 2012-02-21 15:14:57
---

## Notification / Toastwindow extension for Ext JS 4.x

 I have created a 4.x rewrite of the Ext.ux.Notification plugin by _efattal_.



 New improved features include:
 - Multiple managers and notifications stacks
    The static manager object is eliminated completely, allowing notifications to attach to different components using their x and y coordinates to slide in the notifications.
 - All four corners of document/manager can be used: 'br', 'bl', 'tr', 'tl'.
 - Both x and y axis can be used. Notifications can slide in sideways.
 - When a notification is destroyed any notifications above it slide down automatically.
 - Hovering the mouse over the notification prevents autodestruction.
 - Easy customization of css, animations, delays, spacings/padding etc.
 - Demos and instructions can be found on this page:

http://www.eirik.net/Ext/ux/window/Notification.html
