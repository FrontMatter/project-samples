---
title: >-
  NTP's Fate Hinges On 'Father Time'
tags:
  - migrated from FaceBook
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
geolocation: Chiba, Japan
mathjax: false
share: false
copyright: true
sourceUrl: false
sourceAuthor: Charles BABCOCK
sourceAuthorImg: https://eu-images.contentstack.com/v3/assets/blt66983808af36a8ef/blt55a2034b39665f86/60d4566c90ef0d39a2f43d6f/Charles_Babcock125x125.jpg?quality=80&format=webply&width=100
sourcePublishDate: 2015-03-11T18:06:00-05:00
date: 2015-03-16 14:59:00
updated: 2022-09-10 00:06:18
img: /2015/0316/Science_科学/Technology_技術/NTPs-Fate-Hinges-On-Father-Time/9056601793133950510.jpeg
---
{% noteblock quote, Richie Bartlett %}
They say, "Yes, we need you, but we can't give you any money.'"
{% endnoteblock %}

*The Network Time Protocol provides a foundation to modern computing. So why does NTP's support hinge so much on the shaky finances of one 59-year-old developer?*

![Geralt via Pixabay](./NTPs-Fate-Hinges-On-Father-Time/question-clock.webp)


The Release Before Christmas
Stenn told us his workload got a little heavier in October 2014, when Google security team member Chris Ries notified him that he had discovered a security risk in NTP. It was a buffer overflow in NTP autokey, the public key/private key authentication system used to verify downloaded code. Although no one was known to have used it yet, the vulnerability had the potential to let a hacker launch malicious code remotely through an NTP server.

![Geralt via Pixabay](./NTPs-Fate-Hinges-On-Father-Time/Christmas.webp)

Stenn said Google previously had made clear to him that it will publish vulnerabilities 90 days after notifying the party responsible for the code. Stenn felt the clock had started ticking, and he didn't ask for a waiver. He set to work, putting in 16 to 18 hours a day for 10 weeks to correct the defect and get a new release out before the 90 days were up. It would be upsetting to all NTP users to have a vulnerability aired with no fix in hand.

On Dec. 18, he posted news of the vulnerability on the support Web site, sent notices out on the NTP email list, and posted a fixed version of the code. For this effort, Stenn said he got a lot of feedback -- and not in a good way.

As best he can estimate, "I pissed off over a hundred thousand folks by announcing this fix" seven days before Christmas, he recalled. "Yow." People wanted more warning, and they accused him of favoritism and letting some people know about it sooner. It was tough, but also offered a deeper realization of the true position he was in.

One of Stenn's main pillars of support is the originator of NTP, Professor David Mills, "who knows more about NTP code than any other human being," said Stenn. In many cases, he checks with Mills before making changes to the code, in part because Mills has embedded comments in the code that should be checked with before the code is altered.

The core functionality of NTP is described as simple and straightforward. But Mills, in an interview with InformationWeek, said that other parts having to do with monitoring and control "are so complex that the whole thing falls apart if you change something."

Mills, 76, is long retired from teaching computer and electrical engineering at the University of Delaware, where he originated the first version of NTP. At this point, he is also blind and can't help Stenn review code. To Mills, NTP "was kind of a hobby" for many years, and Stenn got in early with good patches as he worked with NTP in his contract jobs, and did some of the thankless tasks like release manager. Asked if Stenn should get more support, Mills responded, "I didn't realize he was working on it full time."

"Dave never saw the need for the type of end-user support that we offer," said Stenn. "He has no patience to deal with people who need that sort of handholding."

Independent, outside contributors do still submit code to NTP, though they tend to focus on the single operating system version they like to work with. One expert, Poul-Henning Kamp, is working in Denmark "with great plans for a future implementation," said Stenn.

When it comes to fixing existing bugs and vulnerabilities, there's Stenn as the sole full-time code committer and a few volunteers he can coax into looking at specific problems.

Stenn clearly likes the work, though. He described himself as an introvert who loves resolving issues of time. At his home lab in Talent, he has four GPS receivers on the roof collecting the combined wisdom of 12 atomic clocks. When the question of taking vacations came up in our discussion, his wife Margaret, who's listening in in the background, issued a hearty laugh. Stenn said vacations are a trip to the movies a few times a year. "My wife thinks I'm insane," he said as an aside in a later email.

As Stenn looks to the future, he sees NTP undergoing further development, including possible coordination with PTP, so that NTP "could speak PTP" for those who need more precise time than NTP can deliver. Such a move will take lots of work, though, and Stenn says he'll need to cut back his hours drastically, and start consulting full time, unless the Linux Foundation and other donors support NTP's work.

"There is a need for support for the free public infrastructure," Stenn said. "But there's just no revenue stream around time right now. People scream if their clocks are off by a second. They say, "Yes, we need you, but we can't give you any money.'"

