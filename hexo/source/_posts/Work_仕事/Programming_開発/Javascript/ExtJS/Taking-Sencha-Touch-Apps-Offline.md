---
title: Taking Sencha Touch Apps Offline
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
  - Sencha
categories:
  - Work_仕事
  - Programming_開発
  - Javascript
  - ExtJS
date: 2011-04-14 09:17:49
---

 From: http://www.sencha.com/learn/Tutorial:Taking_Sencha_Touch_Apps_Offline?mkt_tok=3RkMMJWWfF9wsRonu6TBZKXonjHpfsX56uUsXqSwlMI/0ER3fOvrPUfGjI4AS9QhcOuuEwcWGog80wlWGeiU

 You'll have noticed that we have quite deliberately worked through examples above where the data was being pulled from a server, and was read-only. For many types of application, taking a snapshot of recent data offline is quite reasonable.

 But the Sencha Touch stores and proxies are also designed to allow applications to write data and send it back to a server. Think of a REST-ful API through which records can be fetched to the device. Their details can be examined, changes made - or perhaps new records can be created and old ones deleted. These changes can then be updated back to the server through the same API. (Take a look at the [RestProxy documentation](http://dev.sencha.com/deploy/touch/docs/?class=Ext.data.RestProxy) for examples.)

 If the device is online, this process is relatively straightforward - the proxy can sync the data back to the server immediately and there is little danger that the server dataset and client dataset will diverge.

 If the device is offline, we have shown that the user can be presented with a snapshot of the data from when they last connected. This at least makes it possible for them to review those records when offline: reading semi-fresh email on a plane, for example.

 But many applications will involve the user adding, changing, or creating records. Should this functionality be disabled when the device is offline. That's certainly one option, but there's a good chance that a user would prefer to work with the data when offline, knowing that these changes will propogate back to the server when they reconnect. Allowing a user to read email offline but not compose replies, for example, seems draconian.

 This may add significant extra complexity to your application, since you are now responsible for keeping track of the changes made to the records in the offline state, and then ensuring that those get applied later. To a certain extent, the existing store and proxy sync() technique eases this process on the client, but server-side, you will need to think carefully about reconciliation. If an offline user has made changes to a record on their client, and an online user has made changes to the same record (syncing immediately to the server), your server application is now responsible for merging those changes together, dealing with any likely conflicts, and ensuring those changes are sent back to each user.

 As well as batching all the changes, you might need to start time-stamping updates, so they can be applied on the definitive server store in the right order. If ultiple users are offline, this could get even trickier of course. You might choose to use a queue pattern (like an 'outbox' for those offline emails) which the clients can flush at their earliest opportunity.

 It may seem as though we are finishing this article with a list of challenging hurdles, and there is no doubt that multi-directional synchronization between occasionally-connected devices can be a daunting subject. But synchronization is a computer science problem that has been  solved in other arenas - disk mirroring for just one simple example - and it is to be expected that stable and common patterns will emerge for in the web realm too. Sencha will continue to endeavor to make it as easy as possible for you to create such applications in a modern, mobile web app world.