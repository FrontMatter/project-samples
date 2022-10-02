---
title: 'VBA: inject a macro into new workbook from existing workbook'
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
date: 2011-04-20 14:34:35
---

 ```vb
 Sub CopyAModule(wkbFrom As String, wkbTo As String, strFromMod As String)
    Dim wkb As Workbook
    Dim strFile As String
    
    Set wkb = Workbooks(wkbFrom)
    
    strFile = wkb.Path & "\\vbCode.bas"
    wkb.VBProject.VBComponents(strFromMod).Export strFile
    
    On Error Resume Next
    Set wkb = Workbooks(wkbTo)
    If Err.Number <> 0 Then
        Workbooks.Open wkbTo
        Set wkb = Workbooks(wkbTo)
    End If
    
    wkb.VBProject.VBComponents.Import strFile
    wkb.Save
    
    Set wkb = Nothing
End Sub
```