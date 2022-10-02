---
title: head.vbs
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
date: 2011-06-23 06:50:21
---

```vb
'//head.vbs
'// Written by Richie Bartlett
'// Purpose: Windows command supplement for the Linux "head" command
'// (quick little "dirty" version)

'// syntax: cscript /nologo /U head.vbs [lineCount] fileName.Ext
'// alternate syntax: type TextSplit.vbs | cscript /nologo /U head.vbs
'// 
'// This program also accepts piped data streams for processing.
'// HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows Script Host\\Settings\\DisplayLogo=0

On Error Resume Next

Const verStr = "v0.13"
Const ForReading = 1
Dim stdFlag 
Dim lines
Dim strRead
Dim filePath
Dim objFSO
Dim objFile

stdFlag=True 'assume stdIn pipe input
lines = CInt(WScript.Arguments(0))
If lines<1 And Len(WScript.Arguments(0))>1 Then
	lines =10 '// default to 10 lines
	filePath =WScript.Arguments(0)
	stdFlag =False
End If 'no lineCount
Err.Clear

If WScript.Arguments.length>1 And Len(filePath)<1 Then
	filePath=WScript.Arguments(1)
	stdFlag =False
End If ' arg

' WScript.Echo "lines= " & CStr(lines)
' WScript.Echo "filePath= " & filePath

If stdFlag Then strRead=WScript.StdIn.ReadLine

If Len(strRead)>0 Then
	stdFlag=True
	WScript.Echo strRead 'we echo here since readline increments to the next line on each read
	lines = lines-1
End If '// strRead
If Error<>0 Then stdFlag =False
Err.Clear


If stdFlag Then
	Do Until WScript.stdin.AtEndOfStream Or lines<1 Or Err.Number<>0
		strContents = WScript.stdin.ReadLine
		WScript.Echo strContents
		lines = lines-1
	Loop
Else
	Set objFSO = CreateObject("Scripting.FileSystemObject")
	If objFSO.FileExists(filePath) Then 
		Set objFile = objFSO.GetFile(filePath)
		If objFile.Size > 0 Then
		    Set objReadFile = objFSO.OpenTextFile(filePath, ForReading)
		    Do Until objreadfile.AtEndOfStream Or lines<1 Or Err.Number<>0
			    strContents = objReadFile.ReadLine
			    Wscript.Echo strContents
				lines = lines-1
			Loop
		    objReadFile.Close
		Else
		    Wscript.Echo "The file is empty."
		End If
	Else
		Wscript.Echo "File (" & filePath & ") is not found."
	End If 'file exist
End If '// stdFlag

```