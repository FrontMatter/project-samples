---
title: How to design a Notification System
tags:
  - AWS
categories:
  - Work_仕事
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
display_tag_onHome: true
recommendedSection: false
donate: false
geolocation: 'Chiba, Japan'
mathjax: false
share: false
copyright: true
sourceUrl: >-
  https://leandrofranchi.medium.com/how-to-design-a-notification-system-23f381cdeb00
sourceAuthor: Leandro Franchi
sourceAuthorImg: 'https://miro.medium.com/fit/c/176/176/1*mHe6httsl56vKWN494vF0g.jpeg'
img: /2022/0515/Work_仕事/How-to-design-a-Notification-System/email_notify.svg
openGraph_img: /2022/0515/Work_仕事/How-to-design-a-Notification-System/email_notify.png
excerpt: >-
  A notification system has become a mandatory feature of any system that helps
  touch users, collect analytics data, etc. It's more than a mobile push. There
  are different types of notification formats like push, SMS, email & software
  badge.
sourcePublishDate: 2022-04-14 00:00:00
date: 2022-05-15 15:03:12
updated: 2022-05-15 15:03:12
---

 A notification system has become a mandatory feature of any system that helps touch users, collect analytics data, *etc*. It's more than a mobile push and there are some different types of notification formats like push, SMS, email and software badge (not covered here).

 In this article, we will skim the surface on Notification System Design for Push, SMS and email formats in near real time, average of 10 million of notifications per day triggered by a secure API Endpoint respecting an unsubscribe list control.


## Notification Types
### iOS Push
 ![Notification for iOS Devices.](./How-to-design-a-Notification-System/iOS_push.png)

 A provider sends notifications do Apple Push Notification Service, a remote service provided by Apple do push notifications do iOS devies.


### Android Push
 ![Notification for Android Devices.](./How-to-design-a-Notification-System/android_push.png)

 The android notification is similar of IOS notification flow, but, instead using de APNs we will use Firebase Cloud Messaging do tens android push notifications.


### SMS Message
 ![Notification using SMS Message.](./How-to-design-a-Notification-System/SMS_Message.png)

 Same above, but, using a SMS Service provider like Twilio. Some providers like Twilio has features to send message using WhatsApp telephony and mail marketing.


### Email Message
 ![Notification using Email Message.](./How-to-design-a-Notification-System/email_Message.png)

 Same above, but, using a email service provider like Sendgrid (or AWS SES with SQS).


## Complete Notification System Design
 Important to say, it's a high-level design and we will have a lot of not covered details in this article when we focus on each point of this picture.

 ![](./How-to-design-a-Notification-System/notification_system_design.png)

 1. External software sends JSON message through https with message data, like address, type, message, etc.
 2. Rate limiter validate internal rules to protect system overload and security issues.
 3. Notification Service receives the message, deliver to correct message queue and writes some log to data store over a Data Cache cluster.
 4. Some workers consumes the messages from queue and connect with third part software to send a message to defined device type ou message format.
 5. Third part software calls back using Web Hooks to give status and analytics information about message.
 6. More workers running gets these informations and stores on data store layer.
 7. Status and analytics data are available for Notification Status & Analytics Service giving these data to external Service back.

 Using these system design the software we gain the following benefits:
 * Reliability: mechanisms to minimize the failure rate and SPOF.
 * Security: running over https using AppKey/appSecret pair to ensure only authorized users can send messages.
 * Tracking and Monitoring: logs, status and analytics data are stored.
 * Rate Limiting: protect system overload, unexpected burst and security issues.
 * This design works very well and should be replicated in other regions to increase the SLA, inserting new components like Load balancers, Big IPs, etc.

 More about balance and reliability [here](https://leandrofranchi.medium.com/system-design-for-bam-application-28b009bc9b92).

