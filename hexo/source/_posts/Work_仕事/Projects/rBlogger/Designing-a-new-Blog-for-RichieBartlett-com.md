---
title: Building a new Blog for RichieBartlett.com
excerpt: Relearning web design through my blog.
sticky: 3
recommendedSection: true
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
indexing: true
display_tag_onHome: true
tags:
  - Blog
  - Hexo
  - Web design
  - AWS
categories:
  - Work_仕事
  - Projects
  - rBlogger
img: >-
  /2021/0527/Work_仕事/Projects/rBlogger/Designing-a-new-Blog-for-RichieBartlett-com/Blog_Design.svg
openGraph_img: >-
  /2021/0527/Work_仕事/Projects/rBlogger/Designing-a-new-Blog-for-RichieBartlett-com/Blog_Design.png
date: 2021-05-27 20:15:34
---

## Ol'dog, same old (& new) tricks
 It has been a few years since I needed to build a website. While I remember building an SPA (single page app) website with the EXTjs (javascript) framework, I didn't really need to design the graphics. I used a tool to mock up the layout and got on with my work. And, the backend was built in pure PHP. As an ancient coder, I know what it's like to see your favorite language fade from popularity. I started writing code with GW-Basic in the 1990s on an Apple 2e.

 I've watched more languages pop-up with each new graduating class. There was Java. Then javascript (not the same as Java). And now, we have Python. The common thread to the popularity of these programming lanuages is salary. If the big banks were paying good money for Java programmers, there would be a lot of Java coders graduating shortly thereafter. Now a lot of A.I. (artifical intelligence) built on machine learning is the craze. All the big financial companies are looking for people with Python experience. So, naturally people are going to gravitate to whatever pays the most. 


## Back in the game
 Personally... I am not really worried about the latest craze in programming. However, I do care a lot about how people experience my website and skills. So, after getting tired of looking at my old website, I've decided to get back into it all. Started by researching the best design practices for blogs. Now being an IT pro with over 20 years experience and knowing a lot of industry best practices, I know what to look for. A "simple" WordPress site won't cut it for me. Nor do I want to host my blog on some other company's infra like Medium.com. And, the site **must** be fast to load. This means I cannot use the old paradigm of a physical server where I build a LAMP stack with PHP. It must be serverless (aka FaaS). And, all the advance features must be client side. This means JavaScript and CSS. So, I design a _static_ site that runs on AWS. 


## Best Practice - automation
 I need the development cycle to be as painfree as possible. This means building the CI/CD processes on GitHub and AWS. I've configured the webhooks on AWS CodePipeline to grab the code committed to GitHub.com. Then AWS CodeDeploy pushes the code to an S3 bucket with updated ACL permissions along with updated cache metadata. AWS CloudFront reads the updated metadata and pushes out the latest copies to the edge servers that serve the site. AWS CloudFront is not without it's flaws, however. I still need to write some NodeJS code to manage the routing of all incoming HTTP requests. This is because CloudFront won't serve the webpage of a folder unless you explicitly requested the website page file (_e.g._ `index.html`). If you ask for ` RichieBartlett.com/js/`, you will get an error page. The same if you don't type the final '/' slash. So, to get around this "design feature," you have to roll your own URI parser and return the `index.html` file in the event trigger. This requires that you build an AWS Lambda script in NodeJS to handle these events. Then push to edgeLambda on CloudFront.

 So, all I have to do is update my code and commit to GitHub. The rest is automated. Update the code, commit, and wait a few minutes for the website to update. Then browse around. This is far more efficient than the old process of manually uploading the files to AWS S3 along with manually changing the object permissions for web viewing and invalidating the cache on CloudFront. Anything I can automate that frees up my mental bandwidth is worth my time to setup.

 AWS has a lot of great features around the full stack of online technologies. If you know your way around that tech-stack, you can easily build a website and service that is very affordable. Otherwise, AWS will happily charge you thousands of dollars until you learn how to do it right. Of all the services I've used, I have grown great fondness for AWS. I'm even certified in their architecture. 


## New Blog
 Now that I've prepared the infrastructure of the website, it's time to research how to best deploy [HEXO](https://hexo.io) to match my redesigned theme for the main site www.RichieBartlett.com. I must admit that I'm no wizard at drawing art. I can use the Adobe CC suite, but have never spent enough time to become a master at Adobe tools. I've started looking at several interesting designs and documented them on my [GitHub repo](https://github.com/lorezyra/Richie2.com/issues/28). But none of the existing HEXO theme designs have everything I want. I found [12 Blog Layout Examples (and Best Practices to Follow) in 2021](https://www.ryrob.com/blog-layout/) article and started from there. My blog needs to look good on both the small and large screen devices. So my iPhone will have a different layout compared to my MacBookPro and large 4K screens.

 If I do all the work alone, it will take me months to complete. And, I'm not that intested in graphics design. So, I have enlisted the help of some great talent that should help me complete this project by the end of June 2021. Meanwhile, I will focus on the UX design while the graphics guy will draw out the UI. During all this time, this blog site will likely get broken several times until I get it where I want it.