---
title: 5 Weird Signs of a Mediocre Self-Taught Programmer
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
geolocation: 'Niseko, Hokkaido, Japan'
copyright: true
mathjax: false
share: false
img: >-
  /2022/0227/Work_仕事/Programming_開発/5-Weird-Signs-of-a-Mediocre-Self-Taught-Programmer/AdobeStock_278374738.svg
openGraph_img: >-
  /2022/0227/Work_仕事/Programming_開発/5-Weird-Signs-of-a-Mediocre-Self-Taught-Programmer/AdobeStock_278374738.png
categories:
  - Work_仕事
  - Programming_開発
date: 2022-02-27 21:07:48
excerpt: >-
  A good developer is always ready to go back to the whiteboard. They are ready to explore their own thought process. They never run away from giving an explanation on a subject.
---
 
 SOURCE: https://javascript.plainenglish.io/5-weird-signs-of-a-mediocre-self-taught-programmer-d374c666fca3

 Sanjay Priyadarshi
 2022-02-15

---

 We Are Surrounded by Miserable Mediocre Programmers

 ![Photo by Andrea Piacquadio from Pexels](./5-Weird-Signs-of-a-Mediocre-Self-Taught-Programmer/1_bBsWHDSS0-UTQz6pO_Z6yw.jpeg)

 Programmers hate being called mediocre. No programmer wants to be called a mediocre programmer. Every programmer wants to be called an expert in their domain.

 But the reality is that we are surrounded by mediocre developers who claim to be experts. Also, mediocrity is contagious.

 If you, as a developer, are surrounded by mediocre developers, you will eventually become one of them.

 It becomes very important for you to identify if you are surrounded by mediocre developers or not. Mediocre developers aren’t just average at writing code, they’re mediocre at life.

 Here are five strange signs of mediocre developers.


## They write clever code

 Clever code is good for showing off your skills. But clever code is highly unreadable. The tricks you’ve learned while learning to code don’t work professionally.

 In the professional world, a code reviewer has to review your code. If you start using one-line tricks, the code reviewer will have a hard time understanding your code.

 If the reviewer cannot understand your code. They will ask you to rewrite the code.

 Mediocre self-taught developers think they could impress the reviewer with their cool tricks. But the reality is that a developer couldn’t impress a reviewer by writing clever code.

 The reviewer may be impressed when you make things easy for them.

 If you write code that is highly readable and has proper comments. They will appreciate that more than clever code.

 The mediocre developer goes after the wrong metrics to impress the reviewer. What they should really care about is writing maintainable code, not smart code.

 Let’s take a simple example to understand why you shouldn’t write clever code.

 **Find the maximum number among three numbers x, y, and z**

 ```javascript
   max = (x > y) ? (x > z? x : z) : (y > z? y : z);
 ```

 Don’t use the ternary operator in your code base to find the maximum value. It’s obviously a one-line code. But not everyone will understand this at first.

 Use the old if-else statement to find a maximum value. It is easy to read and understand.

 ```javascript
   if (a>b && a>c)
    max = a;
   else if (b>a && b>c)
    max = b;
   else
    max = c;
 ```


## They keep repeating themselves

 After going through the code of many self-taught, I can say that they have a habit of repeating the code.

 They don’t do it knowingly.

 Most of them do not know the principle of not repeating themselves. They finish their assigned tasks with code repetition and assume themselves as geniuses.

 Suppose you have written code that opens a file and reads its contents.

 Now, while building the app in the future, you again need to open a file and read its content. As a good programmer, you will never write the same code again to open a file and read it.

 To fix this problem of opening a file and reading it. You need to write a function whose job is to open a file and read the content present in it.

 Now whenever you need to open a file and read it, you can call the existing function.

 A mediocre developer is someone who will repeat code written before. They will either copy and paste the above code or rewrite it.

 Mediocre developers may think they’ve been productive after writing repetitive code. But their code remains a complete mess. The quality of the entire code base go down that way.


## They don’t stick to fix code style

 Mediocre developers don’t care about code style.

 When asked why they didn’t follow a code style. They argue why they should care about the style of the code. Isn’t it enough that their code works completely fine?

 Code style is important in a large code base.

 A large code base that has multiple developers working on it should appear to have been written by a single developer.

 The consistency must be maintained.

 If the team has agreed to follow a code style, sticking to it is the best option available. If everyone on the team follows the same code style, any changes in the near future will be easy.

 If the team has decided to write the code like this:

 ```C
   public void car()
   {
    // do what you want
   }
 ```

 A mediocre developer will write code like this:

 ```C
   public void car(){
    // do what you want
   }
 ```

 This will definitely make the large code base inconsistent.


## They overcomplicate simple things

 They overcomplicate simple things

 KISS stands for <b>K</b>eep <b>i</b>t <b>s</b>imple & _<b>s</b>ensible_.

 A mediocre developer never tries to simplify things. The code written by them contains sections containing complex algorithms for simple problems.

 They don’t strive for simplicity. They strive for complexity.

 If you know that the codebase will need changes in the future. You should write code that is easy to understand. It will be easy for your future self to make the necessary changes.

 When the contexts around your software change like libraries, the applications that use them will have to change.

 In the future, the developer involved in updating the project will bless you if you keep things simple. Even you will be blessing yourself because you kept things light and easy.

 Nobody likes to work with complex code.

 When you, as a developer, start working with complex code. Your energy level goes down and your anger level goes up. You start to curse the developer family and their upcoming generations.

 If an entire codebase is kept complex, it will take a long time to add a new feature. Developer time is pretty expensive these days.

 Companies have to spend a huge of money to buy developer time.

 Even from a business perspective, it is important to keep all things simple. Overcomplicating simple things will make things difficult for both organizations and developer teams.


## They hate to teach

 Rockstar developers are great teachers.

 A mediocre self-taught don’t want to explain anything to other developers.

 They find the idea of teaching others boring. Many times you will find them saying:

 {% noteblock info %}

    I’m not a good teacher, so I don’t want to explain this code.

 {% endnoteblock %}

 But the reality is that they themselves do not understand the code or the concepts properly. Their thought process is not clear on the concept. They actually use “I’m not a good teacher” as an excuse.

 They fear that if they start to explain a topic and find that their thought process is broken. They have to understand that topic again in detail.

 Also, they fear follow-up questions from other developers.

 So to avoid all this mess, they easily say:

 {% noteblock info %}

    Hey, listen, I’m not a good teacher. That’s why I can’t explain.

 {% endnoteblock %}

 A good developer, on the other hand, blogs about difficult topics. Whenever they find other developers stuck on a problem, they try to help them.

 If they understand the concepts, they will explain them or provide the correct resources that could help them.

 A good developer is always ready to go back to the whiteboard. They are ready to explore their own thought process. They never run away from giving an explanation on a subject.


## Summary

 1. They write "clever" code.
 2. They don’t know how to use the DRY principle in a large codebase.
 3. Don’t stick to one code style.
 4. Complicates even the simplest things.
 5. Avoid teaching others.