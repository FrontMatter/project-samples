---
title: 5 rules to manage technical debt
tags:
  - Programming
  - YouTube
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
  https://medium.com/analysts-corner/five-rules-to-manage-technical-debt-2831c88bb1c1
sourceAuthor: 'David Rodenas, Ph. D.'
sourceAuthorImg: 'https://miro.medium.com/fit/c/176/176/1*6dwaxm2q7mQGLyRAMb455w.jpeg'
img: /2022/0515/Work_仕事/5-rules-to-manage-technical-debt/technical-debt.jpg
openGraph_img: /2022/0515/Work_仕事/5-rules-to-manage-technical-debt/technical-debt.jpg
excerpt: >-
  How can we manage technical debt when developers do not give us the right
  information?
sourcePublishDate: 2022-01-05 00:00:00
date: 2022-05-15 14:32:27
updated: 2022-05-15 14:32:27
---
 *Technical Debt can kill your product, learn 5 simple rules to deal with it.*

 ![Photo by Calvin fitra Anggara on Unsplash](./5-rules-to-manage-technical-debt/0_V0i7a03jUc1XyqOf.jpeg)


 *Developers are hard to understand: they live inside the code, and their priorities focus the code. If you give them complete freedom, they will work and rework the code over and over. But, if you ask them to rush on delivery, they lose velocity; each new functionality becomes more and more costly. So, how can we manage technical debt when developers do not give us the right information?*

 
## 📝 Rule 1: Involve developers with customers.
 Developers need to know the value of their work. Letting them feel how the customer reacts to the product makes them focus more on the product and less on the code. Developers gain objectivity about their own technical debt and their reporting become more reliable.

 *I have found recently that involving the developers improves their commitment and engagement. If we make developers part of the decision, as simple as asking them about how, they acquire better ownership of the features.*


## 📝 Rule 2: Track story point inflation.
 Technical debt is more than something that you borrow that you might need to repay in the future, it is also paying interests in each feature. Compare the cost of current features with the past ones, if similar tasks are getting bigger, probably you are accumulating too much technical debt.


## 📝 Rule 3: Reduce architecture runaway to the minimum.
 Developers have fear to change. They are afraid that any change, does not matter how small it is, could break the product and introduce unpredictable bugs. To avoid change, developers try to guess future requirements and foresee all required code architecture to support it. But it is a guess, not a certainty, and they fail. Once it is created, the fear to change makes it difficult to adapt it to real needs. The bigger is the architecture runaway, the bigger are the chances of creating technical debt.

 *Corollary*: Do not let developers advance too much future needs.


## 📝 Rule 4: No large refactors; do not stop delivering.
Developers that work with technical debt feel trapped. Every new feature increases the effort. Until one day that they decide that it is enough, and they ask for a great refactor: spend some time reworking code without delivering new features. And probably at that point you are wishing for it, new features are becoming harder to deliver. Do not let them stop delivering.

Propose developers to do a progressive refactor feature by feature. Let them think in the code that will solve their problem, how to adjust the existing one, and how make it coexist with the previous one. Let them spend an extra time to refactor a bit of the code at each feature, but, without stopping delivery.


## 📝 Rule 5: Ask developers to be Boy Scouts
Technical debt always accumulate. If it accumulates too much, interests compound and the cost is too big. The best return of investment is doing it as soon as possible, but not too much, just a bit.

Ask developers to behave like Boy Scouts, to leave the code cleaner than they found it.


## Conclusion
 That is all that it takes to keep technical debt under control.

 If you want to know more about the Technical Debt, how it is created, and what are its implications, please read [What is Technical Debt?](https://drpicox.medium.com/what-is-technical-debt-55aa366ff68a)


## Bonus
 Ward Cunninghan explains the origin of the metaphor Technical Debt. It is not about delaying part of the work so may be one day we will repay it, but about interest and how they make each feature more and more costly. Ward Cunninghan coined the “Technical Debt” metaphor in 1992.

### Debt Metaphor | video (04:43 minutes)
 Ward Cunningham reflects on the history, motivation and common misunderstanding of the "debt metaphor" as motivation for refactoring.

{% youtuber video pqeJFYwnkjE %}
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

## Reference:
* [The CIO-CFO Conversation: Technical Debt—An Apt Term?](https://aws.amazon.com/blogs/enterprise-strategy/the-cio-cfo-conversation-technical-debt-an-apt-term/)