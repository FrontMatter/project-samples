---
title: Apple refers to iOS back doors as 'diagnostic capabilities'
tags:
  - migrated from FaceBook
  - Apple
categories:
  - Science_科学
  - Technology_技術
sticky: 999
comments: true
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
sourceUrl: https://www.zdnet.com/article/apple-refers-to-ios-back-doors-as-diagnostic-capabilities/
sourceAuthor: Jason D. O'Grady
sourceAuthorImg: https://www.zdnet.com/a/img/resize/ba4098374c6704d106f2d675e8042fc0795666e4/2014/07/22/59e04b7a-1175-11e4-9732-00505685119a/jason-d-ogrady.jpg?width=270&height=270&fit=crop&auto=webp
sourcePublishDate: 2014-07-23
date: 2014-07-23 19:00:00
updated: 2022-05-15 16:24:45
---
{% noteblock quote, Richie Bartlett %}
Looks like "awesome" security...
{% endnoteblock %}

![(Photo: Jonathan Zdziarski)](./Apple-refers-to-iOS-back-doors-as-diagnostic-capabilities/bad_security.webp)

Yesterday I wrote about Forensic Scientist [Jonathan Zdziarski](https://twitter.com/JZdziarski)'s presentation at [HOPE/X](http://www.hope.net) where he demonstrated "a number of undocumented high-value forensic services running on every iOS device" and "suspicious design omissions in iOS that make collection easier." 

Apple today addressed some of his concerns with a new knowledgebase article called [iOS: About diagnostic capabilities](http://support.apple.com/kb/HT6331). In it Apple refers to the services identified by Zdziarski (including "pcapd," "file_relay," and "house_arrest") as "diagnostic capabilities to help enterprise IT departments, developers, and AppleCare troubleshoot issues."

The Apple kb article notes that the services require the iOS device to be unlocked and in trusting relationship with another computer. It also notes that data transmitted between the iOS device and trusted computer is encrypted with keys not shared with Apple.

The document justifies three of the services as follows:

1. com.apple.mobile.pcapd
{% noteblock quote, developer.apple.com, https://developer.apple.com/library/ios/qa/qa1176 %}
pcapd supports diagnostic packet capture from an iOS device to a trusted computer. This is useful for troubleshooting and diagnosing issues with apps on the device as well as enterprise VPN connections.
{% endnoteblock %}

2. com.apple.mobile.file_relay
{% noteblock quote, developer.apple.com %}
file_relay supports limited copying of diagnostic data from a device. This service is separate from user-generated backups, does not have access to all data on the device, and respects iOS Data Protection. Apple engineering uses file_relay on internal devices to qualify customer configurations. AppleCare, with user consent, can also use this tool to gather relevant diagnostic data from users' devices.
{% endnoteblock %}

3. com.apple.mobile.house_arrest
{% noteblock quote, developer.apple.com %}
house_arrest is used by iTunes to transfer documents to and from an iOS device for apps that support this functionality. This is also used by Xcode to assist in the transfer of test data to a device while an app is in development.
{% endnoteblock %}

In his "theories" slides about why Apple may have included these services in iOS, Zdziarski concludes that they're not for Genius Bar or Apple support:

![(Slide: Jonathan Zdziarski)](./Apple-refers-to-iOS-back-doors-as-diagnostic-capabilities/theories.webp)

...nor are they for Engineering/Debugging:

![(Slide: Jonathan Zdziarski)](./Apple-refers-to-iOS-back-doors-as-diagnostic-capabilities/debug.webp)

Zdziarski's HOPE/X presentation also provides a number of "design suggestions" that Apple should include in the next version of iOS:

![(Slide: Jonathan Zdziarski)](./Apple-refers-to-iOS-back-doors-as-diagnostic-capabilities/design_suggestions.webp)

[Jonathan Zdziarski](https://twitter.com/JZdziarski) has yet to respond to Apple's response.

{% link `Suspicious "back doors" running on every iOS device`, /2014/0722/Science_科学/Technology_技術/suspicious-back-doors-running-on-every-iOS-device.html %}