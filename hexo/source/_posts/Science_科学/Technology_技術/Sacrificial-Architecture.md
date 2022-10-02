---
title: Sacrificial Architecture
tags:
  - migrated from FaceBook
  - Web design
categories:
  - Science_科学
  - Technology_技術
sticky: 999
comments: false
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
tocOpen: true
indexing: true
display_tag_onHome: false
recommendedSection: false
donate: false
geolocation: 'Chiba, Japan'
mathjax: false
share: false
copyright: true
sourceUrl: 'https://martinfowler.com/bliki/SacrificialArchitecture.html'
sourceAuthor: Martin Fowler
sourceAuthorImg: false
sourcePublishDate: 2014-10-20 09:39:00
date: 2014-12-16 19:47:00
updated: 2022-07-29 15:14:42
---
{% noteblock quote, Richie Bartlett %}
Knowing to build your software architecture and that it will eventually be thrown away. 
(For something that better fits the demands of the more matured business.)
{% endnoteblock %}

*Sometimes it's a good thing to be writing code that you expect to throw away in a couple of years time.*

You're sitting in a meeting, contemplating the code that your team has been working on for the last couple of years. You've come to the decision that the best thing you can do now is to throw away all that code, and rebuild on a totally new architecture. How does that make you feel about that doomed code, about the time you spent working on it, about the decisions you made all that time ago?

For many people throwing away a code base is a sign of failure, perhaps understandable given the inherent exploratory nature of software development, but still failure.

But often the best code you can write now is code you'll discard in a couple of years time.

![](./Sacrificial-Architecture/sketch.png)

Often we think of great code as long-lived software. I'm writing this article in an editor which dates back to the 1980's. Much thinking on software architecture is how to facilitate that kind of longevity. Yet success can also be built on the top of code long since sent to `/dev/null`.

Consider the story of eBay, one of the web's most successful large businesses. It started as a set of perl scripts built over a weekend in 1995. In 1997 it was all torn down and replaced with a system written in C++ on top of the windows tools of the time. Then in 2002 the application was rewritten again in Java. Were these early versions an error because the were replaced? Hardly. Ebay is one of the great successes of the web so far, but much of that success was built on the discarded software of the 90's. Like many successful websites, ebay has seen exponential growth - and exponential growth isn't kind to architectural decisions. The right architecture to support 1996-ebay isn't going to be the right architecture for 2006-ebay. The 1996 one won't handle 2006's load but the 2006 version is too complex to build, maintain, and evolve for the needs of 1996.

Indeed this guideline can be baked into an organization's way of working. At Google, the explicit rule is to design a system for ten times its current needs, with the implication that if the needs exceed an order of magnitude then it's often better to throw away and replace from scratch [1]. It's common for subsystems to be redesigned and thrown away every few years.

Indeed it's a common pattern to see people coming into a maturing code base denigrating its lack of performance or scalability. But often in the early period of a software system you're less sure of what it really needs to do, so it's important to put more focus on flexibility for changing features rather than performance or availability. Later on you need to switch priorities as you get more users, but getting too many users on an unperforment code base is usually the better problem than its inverse. Jeff Atwood coined the phrase "performance is a feature", which some people read as saying the performance is always priority number 1. But any feature is something you have to choose versus other features. That's not saying you should ignore things like performance - software can get sufficiently slow and unreliable to kill a business - but the team has to make the difficult trade-offs with other needs. Often these are more business decisions rather than technology ones.

So what does it mean to deliberately choose a sacrificial architecture? Essentially it means accepting now that in a few years time you'll (hopefully) need to throw away what you're currently building. This can mean accepting limits to the cross-functional needs of what you're putting together. It can mean thinking now about things that can make it easier to replace when the time comes - software designers rarely think about how to design their creation to support its graceful replacement. It also means recognizing that software that's thrown away in a relatively short time can still deliver plenty of value.

Knowing your architecture is sacrificial doesn't mean abandoning the internal quality of the software. Usually sacrificing internal quality will bite you more rapidly than the replacement time, unless you're already working on retiring the code base. Good modularity is a vital part of a healthy code base, and modularity is usually a big help when replacing a system. Indeed one of the best things to do with an early version of a system is to explore what the best modular structure should be so that you can build on that knowledge for the replacement. While it can be reasonable to sacrifice an entire system in its early days, as a system grows it's more effective to sacrifice individual modules - which you can only do if you have good module boundaries.

One thing that's easily missed when it comes to handling this problem is accounting. Yes, really — we've run into situations where people have been reluctant to replace a clearly unviable system because of the way they were amortizing the codebase. This is more likely to be an issue for big enterprises, but don't forget to check it if you live in that world.

You can also apply this principle to features within an existing system. If you're building a new feature it's often wise to make it available to only a subset of your users, so you can get feedback on whether it's a good idea. To do that you may initially build it in a sacrificial way, so that you don't invest the full effort on a feature that you find isn't worth full deployment.

Modular replaceability is a principal argument in favor of a microservices architecture, but I'm wary to recommend that for a sacrificial architecture. Microservices imply distribution and asynchrony, which are both complexity boosters. I've already run into a couple of projects that took the microservice path without really needing to — seriously slowing down their feature pipeline as a result. So a monolith is often a good sacrificial architecture, with microservices introduced later to gradually pull it apart.

The team that writes the sacrificial architecture is the team that decides it's time to sacrifice it. This is a different case to a new team coming in, hating the existing code, and wanting to rewrite it. It's easy to hate code you didn't write, without an understanding of the context in which it was written. Knowingly sacrificing your own code is a very different dynamic, and knowing you going to be sacrificing the code you're about to write is a useful variant on that.

## Acknowledgements
Conversations with Randy Shoup encouraged and helped me formulate this post, in particular describing the history of eBay (and some similar stories from Google). Jonny Leroy pointed out the accounting issue. Keif Morris, Jason Yip, Mahendra Kariya, Jessica Kerr, Rahul Jain, Andrew Kiellor, Fabio Pereira, Pramod Sadalage, Jen Smith, Charles Haynes, Scott Robinson and Paul Hammant provided useful comments.

## Footnote
[1]: As [Jeff Dean puts it](http://static.googleusercontent.com/media/research.google.com/en//people/jeff/WSDM09-keynote.pdf) "design for ~10X growth, but plan to rewrite before ~100X"