---
title: API for holidays
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
swiper: false
swiperDesc: Minor pain of keeping up with holidays
swiperImg: /img/12.jpg
img: /img/12.jpg
openGraph_img: /img/12.jpg
recommendedSection: false
bgImg: ''
bgImgTransition: fade
bgImgDelay: 180000
donate: false
geolocation: Japan
copyright: true
mathjax: false
share: true
excerpt: Minor pain of keeping up with holidays
tags:
  - API
categories:
  - Work_仕事
  - Programming_開発
date: 2021-06-02 16:55:02
header-img:
---

## Minor pain
I've never gave it enough thought, but in retrospect, I have acknowledged a minor pain of having to keep up with the changes to holidays each year. Often related to my timesheets or other software that I write. As I've noticed this becoming a regular event, I've decided to see if someone has created an API service to make this one less task I have to think about every year.

## Solution
Quickly found the solution provided by [Holiday API](https://holidayapi.com/countries/jp/2021). It seems they provide the response in English only. That's okay. I can build a mapping function to translate the English to Japanese. But this does make life ever so slightly better. And, that is the goal. To enable my focus on the higher value tasks.

{% sitegroup %}
{% site "Holiday API", url=https://holidayapi.com/countries/, description="API for all Country's Holidays", screenshot=https://holidayapi.com/images/calendar.svg, avatar=https://holidayapi.com/images/calendar.svg %}
{% endsitegroup %}