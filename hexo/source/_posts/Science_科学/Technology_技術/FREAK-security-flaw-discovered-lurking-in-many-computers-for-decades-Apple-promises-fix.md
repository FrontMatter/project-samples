---
title: >-
  "FREAK" security flaw discovered lurking in many computers for decades, Apple
  promises fix
tags:
  - migrated from FaceBook
  - Apple
  - Security
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
sourceUrl: >-
  https://techcrunch.com/2015/03/03/freak-security-flaw-discovered-lurking-in-many-computers-for-decades-apple-promises-fix-next-week/
sourceAuthor: Greg KUMPARAK
sourceAuthorImg: false
sourcePublishDate: 2015-03-03 20:49:55
date: 2015-03-04 19:00:00
updated: 2022-09-06 22:24:29
---
{% noteblock quote, Richie Bartlett %}
You've been PWNED!!! ⚠️
{% endnoteblock %}

![](./FREAK-security-flaw-discovered-lurking-in-many-computers-for-decades-Apple-promises-fix/flaw.webp)

Ugh — another week, another nasty widespread security bug to worry about. The twist this time: this one has apparently been around since the 90s.

Dubbed “FREAK” by the researchers [who discovered it](https://freakattack.com), the exploit allowed researchers (and potentially hackers) to sniff traffic going to and from many otherwise encrypted websites — including some government sites — thanks to some stuff left behind from the 90s.

Here’s the issue, as I understand it:
* Up until 1999 or so, the US government forbade companies from shipping any products overseas that contained strong encryption. “Export-grade” (that is, weak and breakable) encryption was okay, though.
* In the 90s, this encryption was more than enough to evade anyone who didn’t have access to a supercomputer. Nowadays, [as Ed Felten points out](https://freedom-to-tinker.com/blog/felten/freak-attack-the-chickens-of-90s-crypto-restriction-come-home-to-roost/), that’s anyone who knows their way around Amazon’s EC2.
* These restrictions were lifted around 1999 — but somehow these weaker “export-grade” encryption modes were left in “many Google and Apple” devices (and other devices that use unpatched OpenSSL), unused and mostly forgotten… until now
* With a cleverly executed man-in-the-middle attack, researchers were able to force a victim’s connection to use this now quite-crackable weaker encryption cipher.
* Once the connection is on that weaker cipher, any “encrypted” communication the attacker can sniff out — passwords, messages, etc. — can be decrypted in a matter of hours.


**The short version:** hackers force a victim’s connection to use long-forgotten encryption ciphers left behind in popular products (Android, Apple’s Safari) instead of today’s stronger stuff, then decrypt the data.

As of this morning at 1 a.m., researchers were able to coax a good chunk of the web’s most popular sites into accepting the now-obsolete encryption request.

They’ve [put up a list of some of the sites here](https://freakattack.com), and it’s a doozy. Banking sites, quite a few retail sites, and even a few U.S. government sites make an appearance.

Named by the researchers as one of the larger parties at risk here, Apple was quick to respond with a promise to fix things on their end. Writes an Apple spokesperson: “We have a fix in iOS and OS X that will be available in software updates next week.”

We’ve reached out to other companies involved for comment.

**Update:** Google says it has made a patch that has been “provided to partners”. That likely means it’s on device manufacturers to patch this on a phone-by-phone basis.

{% noteblock quote %}
We encourage all websites to disable support for export certificates. Android’s connections to most websites – which include Google sites, and others without export certificates – are not subject to this vulnerability. We have also developed a patch to protect Android’s connection to sites that do expose export certs and that patch has been provided to partners.
{% endnoteblock %}