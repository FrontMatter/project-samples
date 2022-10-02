---
title: Calculate MD5 Checksums
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
date: 2011-04-20 13:15:52
---

 http://www.robvanderwoude.com/vbstech_files_md5.php


## crccheck.vbs
``` vb
WScript.Echo "Comparing 2 strings:"
strString = "Meet John Doe"
WScript.Echo "MD5 Checksum for "\"" & strString & "\"": " & GetStringCheckSum( strString )
strString = "meet John Doe"
WScript.Echo "MD5 Checksum for "\"" & strString & "\"": " & GetStringCheckSum( strString )
WScript.Echo
WScript.Echo "Comparing 2 files:"
strFile1 = "C:\\WINDOWS\\System32\\wmpcore.dll"
strFile2 = "C:\\WINDOWS\\System32\\dllcache\\wmpcore.dll"
WScript.Echo "MD5 Checksum for " & strFile1 & ":          " & GetFileCheckSum( strFile1 )
WScript.Echo "MD5 Checksum for " & strFile2 & ": " & GetFileCheckSum( strFile2 )


Function GetFileCheckSum( myFile )
' This function uses X-standards.com's X-MD5 component to calculate
' the MD5 checksum of a file.
'
' Argument:
' myFile [string] the file name whose checksum is to be calculated
'
' Written by Rob van der Woude
' http://www.robvanderwoude.com
'
' The X-MD5 component is available at:
' http://www.xstandard.com/page.asp?p=C8AACBA3-702F-4BF0-894A-B6679AA949E6
' For more information on available functionality read:
' http://www.xstandard.com/printer-friendly.asp?id=44AFBB03-EDC1-49FE-94CC-333AE728331E
    Dim objMD5
    Set objMD5 = CreateObject( "XStandard.MD5" )
    GetFileCheckSum = objMD5.GetCheckSumFromFile( myFile )
    Set objMD5 = Nothing
End Function



Function GetStringCheckSum( myString )
' This function uses X-standards.com's X-MD5 component to calculate
' the MD5 checksum of a string.
'
' Argument:
' myString [string] the string whose checksum is to be calculated
'
' Written by Rob van der Woude
' http://www.robvanderwoude.com
'
' The X-MD5 component is available at:
' http://www.xstandard.com/page.asp?p=C8AACBA3-702F-4BF0-894A-B6679AA949E6
' For more information on available functionality read:
' http://www.xstandard.com/printer-friendly.asp?id=44AFBB03-EDC1-49FE-94CC-333AE728331E
    Dim objMD5
    Set objMD5 = CreateObject( "XStandard.MD5" )
    GetStringCheckSum = objMD5.GetCheckSumFromString( myString )
    Set objMD5 = Nothing
End Function

```