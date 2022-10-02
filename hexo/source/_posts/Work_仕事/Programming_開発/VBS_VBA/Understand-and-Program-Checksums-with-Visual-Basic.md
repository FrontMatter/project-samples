---
title: Understand and Program Checksums with Visual Basic
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
swiper: false
geolocation: 'Tokyo, Japan'
copyright: true
mathjax: false
share: true
tags:
  - migrated from rBlogger.2009
categories:
  - Work_仕事
  - Programming_開発
  - VBS_VBA
date: 2011-04-20 13:19:26
---

 http://visualbasic.about.com/od/usingvbnet/a/chksum.htm

# Understand and Program Checksums with Visual Basic
## Checksum is widely misunderstood
By [Dan Mabbutt](http://visualbasic.about.com/bio/Dan-Mabbutt-5296.htm), About.com Guide

Filed In: [Using VB.NET](http://visualbasic.about.com/od/usingvbnet)
Nov 29 2008


Checksum is a method or finding, and sometimes fixing, errors in files, message packets, strings, or any set of bits that has to be accurate. It's used most often in data communications where getting a bit scrambled here and there happens a lot.


You can find a lot of libraries and "algorithms" for calculating a checksum. In fact, there are a lot of different things that are all called 'checksum'. In the Microsoft world, for example, the term "hash" or "hashvalue" is used instead of checksum. In my survey of the checksum literature for this article, it seemed to me that what was missing was a basic explanation of what a checksum actually is. That's what this article is all about.


There's no direct support for **Checksum** in Visual Basic. That is, there's no string.checksum method or checksum(file) function even though you need a checksum a lot in various programming problems.


Why not? They've taken the trouble to provide functions and methods for a lot of things that are used much less than checksum.


I haven't been able to find any kind of 'official' answer to this question. (Microsoft usually avoids questions that include the word, "why". They focus on "how".) But my answer is that there just isn't a consistent and accepted definition of just what a 'checksum' is. There *are* very standardized definitions of the things that you use to create a checksum (like CRC and MD5 for example - more about these later) but checksum is more of a concept than an exact process.


So ... what's the concept?


The idea is that you calculate a single number that is the result of a calculation done over a much longer bit string. The bit string is usually something like a file or a message packet, but since everything in programming is a 'bit string' at some level, you can verify the accuracy of 'everything' this way. You could, for example, verify that no file names in a directory have changed or that a web page hasn't been altered.


It also helps to describe what checksum is *not*.

 * It's *not* the sum of the bits in the bit string.

`10101` sums to `3`. But so does `11100` and `00111`. Early (*really* early) checksum calculations were often simple modulo sums. But they're not anymore.

 * It's *not* completely reliable.

A CRC32 checksum, for example, allows for about four billion numbers. So the 'best case' probability of two different bit strings giving the same checksum is one in four billion. But that's good enough for everything we're likely to need.

 * It's *not* a way to encrypt or protect information.

Communications message packets usually include the checksum along with the packet. You could change the packet and escape detection by simply recalculating a new checksum and substituting it for the old one.

 * It's *not* the same calculation for all checksums.

There are a lot of formulas that can be used as a checksum. It mainly depends on how reliable you want it to be versus how fast.

On the next page, we dive into exactly how a CRC checksum works! 



One of the most common types of checksum is called a **CRC checksum**.  This is slightly redundant since "CRC" expands to Cyclic Redundancy Check. This is the way most data transmission checksums are calculated and it's also the method used by PKZip. The basic method is simply to divide the bit string by another fixed binary number that is selected in advance. The remainder after dividing is the checksum. But there are some mathematical twists that are part of the method too!


To give you an idea about the math, lets do a very simple example.***** The goal here is to gain just a basic understanding of what is happening "behind the scenes". I hate doing things that are "like magic". I want to know something about why they work. To keep the calculation short, I'm going to use a very short bit string, the ASCII value of: 


**VB**

The hex values for the ASCII code for this message are . . .

`56 42`

. . . and the bit string is . . .

`0101011001000010`


This is a good place to mention just one variations in checksum algorithms to illustrate why there are lots of versions. Notice that the bit string above starts with a zero. CRC checksums are not normally able to distinguish between . . .


`0101011001`

and

`101011001`


Some algorithms add a constant value beginning with a '1' to the front of the bit string to be checked to solve this problem. In this example, we won't do that, however.


The next step is to pick a value to divide into our bit string. This is a critical step, but for now let's pick one at random. I picked the ASCII value of the "dot" in VB.NET: hex `2E` or binary `00101110`. I'll have more to say about why picking this number is important after we go through a trial calculation. I really did pick these numbers at random because after I got into the details of this article, I realized that they're not very good numbers. But they *do* illustrate the process.


Now we perform "a" calculation. (Not "the" calculation. This isn't the way CRC checksums are normally calculated. Remember that the goal is to understand the method behind checksums a little better.) This can be a complicated process since it's all done in binary and it's not even the normal binary math that you're used to. 


To start with, let's do the binary math "old style" using the long division method we learned in grade school. It might help to do a few regular decimal long division problems on a sheet of paper just to make sure you remember the process. 


The illustration below shows the calculation (leading zeros are all dropped):


![Click Here to display the illustration](http://0.tqn.com/d/visualbasic/1/0/W/Q/chksum-1.gif)


In decimal, this is "22082 divided by 46 is 480 with a remainder of 2". We don't care about the quotient (480). That's never used in checksums. The checksum is the remainder (2). This makes a "good" (but not a "great") checksum because the remainder will change if any bit in the dividend changes. If you doubt this, change a few and see. (If you actually repeat this calculation a few times, you'll understand long division a lot better when you finish.)


But since there are a lot of cases where this method fails to detect changes in the bit string, mathematicians (specifically, W. Wesley Peterson in 1961) invented a better way. This new method is based on assuming that each bit is a "coefficient" of a "polynomial". Those words are in quotes because I'm not going to explain them here. All you have to know is that essentially the same operation takes place as in binary long division, but "CRC polynomial math" is used instead. 


The big difference is that in CRC polynomial math, they don't do any "carries". In binary math, 1 plus 1 is 10 - that is, 0 carry the 1. This is what they *don't* do in polynomial calculations. 1 plus 1 is just 0. This not only makes the result a lot more bulletproof, it also makes the practical problems of doing the calculation easier because both addition and subtraction in binary become exactly the same as the XOR operation. This is why you will see some web pages which claim that CRC checksums *are* just a binary XOR. They're not, but you have to get into the underlying math to understand why. In any case,
 here's the same calculation above, but this time, it's done with CRC polynomial math:


![Click Here to display the illustration](http://0.tqn.com/d/visualbasic/1/0/U/Q/chksum-2.gif)


You can see that the quotient and remainder are completely different than in the first (simple binary) calculation.


To verify the checksum, just checksum again. This is shown on the next page.


---
***** I'm indebted to "A Painless Guide to CRC Error Detection Algorithms" by Ross N. Williams for this explanation.

To do a correct CRC checksum, XOR is indeed involved (since that's the way addition *and* subtraction are both done with CRC math) but it's a good deal more complicated.


The "width" of the CRC checksum is the final concept that needs to be be mentioned before actually doing a real calculation. The width is the number of binary digits of the checksum and it's always 1 less than the number of digits in the divisor. 


One way to verify that a bitstring is the same is to concatenate the checksum to the original bit string and calculate a new checksum over this new number. This should give you a new checksum of 0. If it doesn't, then something has changed from the original bit string - within the capacity of the divisor to catch particular kinds of errors. In addition to picking a "good" divisor, we should also use a reasonably long number. 32 bit checksums are considered long enough for PKZip and Ethernet checksums.


The illustration below shows the verification.


![illustration](http://0.tqn.com/d/visualbasic/1/0/V/Q/chksum-3.gif)


The "choice" of a specific number to use for a divisor is critical too. Some authors suggest that any number can be used.  Any number will "work" in the sense that you can calculate the checksum, but more errors will go undetected with some values than with others. (Tim Patrick's [Visual Basic 2005 Cookbook](http://visualbasic.about.com/b/2006/10/07/visual-basic-2005-cookbook.htm) is one source I consulted to write this article. He uses the ASCII value of the text string "Cookbook" in his example. *This is not a good idea.*!)


The math to prove that some divisors work better than others is fairly difficult, but here's just one example to give you a flavor of the problem. To detect all "two bit" errors (that is, two bits are both changed from the original to the error bit string) choose a divisor that does not have multiples that are 11, 101, 1001, 10001, 100001.


How do you choose a number like that? Beats me. The simple answer is, "Use one chosen by professional cryptologists who do this sort of thing for a living." The one used for Ethernet 32 bit checksums is:

`00000100110000010001110110110111`

or

`04 C1 1D B7` in hex. 

If you're interested in learning more about this, google the phrase, "designing CRC polynomials". Or, google that specific hex number. On the next page, we actually calculate the checksum. Here's the algorithm. Our example is in parenthesis and I'm using exactly the same numbers as before.


**1** - Add the "width" zero bits to the bit string. In our example, we're using **00101110** as the divisor. The high order zeros can't be used, so the actual length is 6 minus 1 or 5. 


`(010101100100001000000)`


**2** - Pick a divisor to use. This is called "the polynomial" in CRC math.


`(101110)`


**3** - Start out with a zero binary number equal in size to the divisor. This is called "the register" in CRC math so we'll use that term too.


`(000000)`


**4** - Shift the register left by one bit. Notice whether a 1 or a zero is "popped" into the high order bit as a result.


`(0 000000)`


**5** - Proceeding from high to low in the bit string, copy the "current" bit from the bit string into the low order bit in the register. The next "current" bit in the bit string is the next one to the right.


`(Current bit - 0, Register 0 000000, Current bit for next iteration - 0)`


**6** - If the high order bit in the register is 1, then XOR the register with the divisor.


**7** - If all bits in the bit string have been copied, then the number in the register is the remainder. Otherwise, go to step 5. (Yeah, I know. "Go To" is taboo. So sue me.)


This kind of "descriptive algorithm" can be difficult for old programmers like me to really understand. I understand Visual Basic code a lot better, so I've written a VB.NET program that implements it. (Note ... This is *not* suggested as an efficient way to calculate a checksum that you can copy and use in your program. This is an illustration of the algorithm and nothing more.) 


To make sure you understand what's happening, you can download the entire program and step through it, one instruction at a time, with Visual Studio. The link is at the end of the article.


The main calculation step of the algorithm is shown below. `M` ("message") is the bit string to be checksummed, `P` ("polynomial") is the divisor, and `R` ("register") is the checksum calculated. `MyXOR` is an internal function that just returns the XOR of two bitstrings passed to it. `cnt` counts through the bit string to be checksummed.

```vb
If Microsoft.VisualBasic.Left(R.Text, 1) = "1" Then
   R.Text = MyXOR( Microsoft.VisualBasic.Left( R.Text, Len(P.Text)), P.Text )
End If

R.Text &= Mid(M.Text, cnt, 1)
R.Text = Microsoft.VisualBasic.Right( R.Text, Len(R.Text) - 1)

If cnt > Len(M.Text) Then
   endFunc = True
   MsgBox("CheckSum is: " & R.Text)
Else
   cnt  = 1
End If
```


In the real world, checksums are calculated by either hardware (an Ethernet adapter does it) or library functions that are simply called. SHA-1 and MD5 are alternative algorithms that can be used to calculate checksums (and are used a lot in cryptography as well). The term "hash" or "hashvalue" is almost synonymous with checksum. These *are* supported directly by .NET library functions.


Here's an example of code to create a 'hash' (checksum) using the .NET SHA-1 and MD5 library functions. The hash of both a file and an internal declared byte array are calculated to show how to calculate a hash for both.

```vb
Dim instream As IO.Stream
Dim hashingbase As Byte() = {4, 193, 29, 183}
Dim invalue As Byte() = {86, 66}
Dim hashvalue1, hashvalue2 As Byte()
instream = New IO.FileStream( "test.txt", IO.FileMode.Open, IO.FileAccess.Read)


Dim hashingfunction = New HMACSHA1(hashingbase, True)
hashvalue1 = hashingfunction.ComputeHash(instream)
hashvalue2 = hashingfunction.ComputeHash(invalue)


Dim md5 As New MD5CryptoServiceProvider()
hashvalue1 = md5.ComputeHash(instream)
hashvalue2 = md5.ComputeHash(invalue)**
```
[Download the demonstration program here](http://visualbasic.about.com/library/download/CRCEx1.zip)
