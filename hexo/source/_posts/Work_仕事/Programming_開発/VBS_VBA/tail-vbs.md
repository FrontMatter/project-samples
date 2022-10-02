---
title: tail.vbs
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: false
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
date: 2011-06-23 16:35:48
---

 ## Reading a Text File from the Bottom Up
 Demonstration script that uses the FileSystemObject to read a text file, and then to echo the text file in inverse order (that is, beginning with the last line in the text file and ending with the first line).

```vb
Dim arrFileLines()
i = 0
Set objFSO = CreateObject("Scripting.FileSystemObject")
Set objFile = objFSO.OpenTextFile("C:\FSO\ScriptLog.txt", 1)
Do Until objFile.AtEndOfStream
     Redim Preserve arrFileLines(i)
     arrFileLines(i) = objFile.ReadLine
     i = i + 1
Loop
objFile.Close
For l = Ubound(arrFileLines) to LBound(arrFileLines) Step -1
    Wscript.Echo arrFileLines(l)
Next
```