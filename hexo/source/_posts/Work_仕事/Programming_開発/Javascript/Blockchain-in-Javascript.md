---
title: Blockchain in Javascript?
tags:
  - Javascript
  - Blockchain
  - Cryptocurrency
  - YouTube
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
recommendedSection: true
donate: false
geolocation: 'Chiba, Japan'
copyright: true
mathjax: false
share: false
img: >-
  /2021/1130/Work_仕事/Programming_開発/Javascript/Blockchain-in-Javascript/AdobeStock_431583373.svg
openGraph_img: >-
  /2021/1130/Work_仕事/Programming_開発/Javascript/Blockchain-in-Javascript/AdobeStock_431583373.png
categories:
  - Work_仕事
  - Programming_開発
  - Javascript
date: 2021-11-30 13:57:05
---
 I've been an enthusist of blockchain technology since I originally discovered it in 2013. Sadly, I didn't start investing in cryptocurrencies until 2017. Nevertheless, I've been curious about how one could build a blockchain using Javascript. As it turns out, someone has already done that. Granted they only built the bare minimum of the foundation, it's far from robust and definitely not secure. It does, however, present a great starting place to not only understand blockchain better, but easily customize it towards one's own goals. 


☞ Source code is available on GitHub: 
* https://github.com/Savjee/savjeecoin
* https://github.com/Savjee/savjeecoin-frontend

 {% ghcard Savjee %}


## Creating blockchain in Javascript (part 1)
 Learn how to write your own Blockchain with JavaScript. In this video I'll show you what is behind a blockchain by using simple code. It's not a complete implementation, but enough to understand how blockchains work and how they guarantee that blocks can never be changed.

### Video (50 minutes)
{% youtuber video zVqczFZr124 %} 
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}



## Blockchain Proof-of-Work (part 2)
 Adding the proof-of-work mechanism to our homemade Javascript blockchain.
 Proof-of-work will secure our blockchain against spammers and people trying to tamper with our blocks.

### Video (50 minutes)
{% youtuber video HneatE69814 %} 
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}



## Blockchain Mining rewards (part 3)
 Implementing miner rewards and basic transactions in our Javascript based blockchain.
 Mining rewards steadily introduce new coins into the system.
 OOPS, I made a small mistake! In the minePendingTransactions() method, you have to pass the hash of the previous block when you're creating a new Block() instance. This was fixed on GitHub: 

### Video (50 minutes)
{% youtuber video fRV6cGXVQ4I %} 
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}

## Blockchain - Signing transactions (part 4)
 Transactions on a blockchain have to be signed with a private key. This makes sure that people can only spend coins if they have the private key of their wallet.
 In this video we will refactor our Javascript blockchain so that it will only accept signed transactions.
 We'll use the secp256k1 elliptic curve to generate a keypair. The same algorithm used in Bitcoin. But you can use other algorithms as well.

### Video (50 minutes)
{% youtuber video kWQ84S13-hw %} 
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}

## Angular frontend - Blockchain in Javascript (part 5)
 Blockchains are hard to understand, so let's visualize their inner workings by building a front-end application in Angular. I'll show you how to visualize blocks on the chain and the transactions inside them. We'll also make a UI to create new transactions and to mine new blocks.

### Video (50 minutes)
{% youtuber video AQV0WNpE_3g %} 
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}
