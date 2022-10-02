---
title: TextSplit.vbs
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
date: 2011-06-23 06:49:05
---

```vb
'// TextSplit.vbs
'// http://neilkilbride.blogspot.com/2008/02/split-text-file-with-vbscript.html
'// Inspired by script Written by: Neil kilbride
'//
'// Completely reWritten by Richie Bartlett
'// 2011 June 23
'//
'// cmd: e: && cd "E:\\MaxMind.com - GeoIP DB\\GeoLiteCity_20110801" && cscript /nologo //u ..\\TextSplit.vbs GeoLiteCity-Blocks.csv

'OPTION EXPLICIT
On Error Resume Next


Const verStr = "v1.31"
CONST CONST_debug			=0	'0=false; 1=true -displays debug info to the console screen
CONST CONST_debug_file		=0	'0=false; 1=true -creates/writes debug info to a debug file

' Constants for isHostCscript
CONST CONST_ERROR           =0
CONST CONST_WSCRIPT         =1
CONST CONST_CSCRIPT         =2
' Constants for WShell.Run Window Style
'http://msdn.microsoft.com/library/default.asp?url=/library/en-us/script56/html/6f28899c-d653-4555-8a59-49640b0e32ea.asp
Const CONST_Window_hideBlur			=0
Const CONST_Window_Normal			=1
Const CONST_Window_MinFocus			=2
Const CONST_Window_MaxFocus			=3
Const CONST_Window_ActivateBlur		=4
Const CONST_Window_RestoreActive	=5
Const CONST_Window_Blur2next		=6
Const CONST_Window_MinBlur			=7
Const CONST_Window_RestoreBlur		=8
Const CONST_Window_RestoreFocus		=9
Const CONST_Window_SameAsParent		=10

' ================  Global Variables:  ==============================

Dim sourceFile
Dim fileEXT
Dim basename
Dim targetFolder
Dim lineCount : lineCount = 225000 '//1048575 '//2^20-1
Dim strTemp
Dim intHost, ws
Dim fileCount : fileCount=0
Dim fileSize
Dim strNewFile
Dim objFSO
Dim objFile, objFileWrite, objFileHandle





Set ws = WScript.CreateObject("WScript.Shell")
intHost=isHostCWscript()
If intHost<>CONST_ERROR then
	If CONST_debug=0 and intHost=CONST_WSCRIPT then
		intErrCode = ws.Run("CScript.exe //U " & chr(34) & WScript.ScriptFullName & " " & WScript.Arguments & chr(34), CONST_Window_RestoreFocus, False)
		WScript.Quit(intErrCode)
	end if ' debug & WScript
	If CONST_debug=1 and intHost=CONST_CSCRIPT then
    	WScript.Echo "Relaunching script(" & WScript.ScriptName & ") with correct Host (WScript.EXE)..."
		intErrCode = ws.Run("WScript.exe " & chr(34) & WScript.ScriptFullName & " " & WScript.Arguments & chr(34), CONST_Window_RestoreFocus, False)
		WScript.Quit(intErrCode)
	end if ' debug & WScript
else
	intErrCode = ws.Run("CScript.exe //U " & chr(34) & WScript.ScriptFullName & " " & WScript.Arguments & chr(34), CONST_Window_RestoreFocus, False)
	WScript.Quit(intErrCode)
end if 'isHostCscrip
Set intHost=Nothing 'dont need anymore
Err.Clear


If WScript.Arguments.length > 0 then
	'targetFolder = left(WScript.ScriptFullName,(Len(WScript.ScriptFullName))-(len(WScript.ScriptName)))
	targetFolder = CreateObject("Scripting.FileSystemObject").GetAbsolutePathName(".")

	'// get command line arguments
	sourceFile = WScript.arguments.Item(0)
	If WScript.Arguments.length>1 Then lineCount = WScript.arguments.Item(1)
	If WScript.Arguments.length>2 Then targetFolder = WScript.arguments.Item(2)
	
	If sourceFile ="/?" Or lineCount="/?" Or targetFolder="/?" Then 'show syntax help
		progHelp
	ElseIf objFSO.FileExists( sourceFile ) then ' check if the file exists
	
		set objFSO = CreateObject("Scripting.FileSystemObject")
	
		
		' new files
		fileEXT = objFSO.GetExtensionName( sourceFile )
		basename = left(sourceFile, Len(sourceFile)- Len(fileEXT)-1)
		If(InStr(basename, "\\")>1) Then basename = Right(basename, Len(basename)-InStrRev(basename, "\\"))
		Set objFile = objFSO.GetFile(sourceFile)
		fileSize= objFile.Size
		WScript.Echo "Source file: " & sourceFile & " (" & fileSize & " bytes)"
		WScript.Echo "Processing... Please wait."

		with objFSO.OpenTextFile(sourceFile)
			while Not .AtEndOfStream
				if (.Line MOD lineCount)=0 Or .Line=1 Then
					If objFileWrite<>Null Then
						objFileWrite.Close
						WScript.Echo "done."
					End If 'fileWrite
					fileCount = fileCount  1
					WScript.Sleep 100 'give time for the fileHandle to close

					strNewFile = targetFolder & "\\" & basename & "_" & CStr(fileCount) & "." & fileEXT
					WScript.Echo "Creating: " & strNewFile
					set objFileWrite = objFSO.CreateTextFile(strNewFile, True)
					objFileWrite.WriteLine .ReadLine
				end if
				objFileWrite.WriteLine .ReadLine
			Wend
			.Close
		end With
		objFileWrite.Close
		
		if( fileCount>1 ) then
			WScript.Echo "File was split into " & CStr(fileCount) & " chunks (lineCount= " & lineCount & ")... Average filesize: " & CStr(fileSize/fileCount)
		else
			WScript.Echo "File was too small to split..."
		end if
		WScript.Echo "Process Complete"
		Set objFileWrite=Nothing
		Set objFSO=Nothing
	else
		WScript.Echo "Source file not found..."
	end if
Else ' invalid command syntax
	progHelp
end If



'********************************************************************
'* Function        isHostCWscript()
'* Purpose: Determines which program is used to run this script.
'* Output:  If host is not cscript or wscript, return error const
'********************************************************************
Function isHostCWscript()
    On Error Resume Next
    Dim strFullName, strCommand, i, j, intStatus, outputStr

    outputStr=""
    isHostCWscript=True ' until proven otherwise...
    strFullName = WScript.FullName
    If Err.Number Then
        outputStr=WScript.ScriptName & ":" & vbCrLf
	    outputStr="Error 0x" & CStr(Hex(Err.Number)) & " occurred."
        If Err.Description <> "" Then
            outputStr=outputStr & vbCrLf & "Error description: " & Err.Description
        End If
	Call WScript.Echo(outputStr)
	intStatus = CONST_ERROR
	WScript.Quit(1)
    End If

    i = InStr(1, strFullName, ".exe", 1)
    If i = 0 Then
        intStatus = CONST_ERROR
    Else
        j = InStrRev(strFullName, "\\", i, 1)
        If j = 0 Then
            intStatus = CONST_ERROR
        Else
            strCommand = Mid(strFullName, j   1, i - j - 1)
            Select Case LCase(strCommand)
                Case "cscript"
                    intStatus = CONST_CSCRIPT
                Case "wscript"
                    intStatus = CONST_WSCRIPT
                Case Else       'should never happen
                    outputStr= "An unexpected program was used to run this script." & vbCrLf
                    outputStr= outputStr & "Only CScript.Exe or WScript.Exe can be used to run this script."
                    Call WScript.Echo(outputStr)
					intStatus = CONST_ERROR
                End Select
        End If
    End If
	isHostCWscript=intStatus

'    If intStatus <> CONST_CSCRIPT Then isHostCWscript=False
End Function 'isHostCWscript

'********************************************************************
'* Sub        PopUp() 
'* Purpose: displays a message dialog box with the OK button
'********************************************************************
Sub PopUp(strFlag) 'v1.06
	Dim objVar
	If IsEmpty(strFlag) Then                'No arguments have been received
		Exit sub
	End If
	objVar = MsgBox(parseString(strFlag), vbOKOnly   vbInformation, WScript.ScriptName)
End Sub

'********************************************************************
'* function	parseString()
'* Input:	accepts a "c print" like string syntax
'* Returns: Extended string.
'********************************************************************
Function parseString(strString) 'v1.0
    if TypeName(strString)="String" AND len(strString)>2 then
        strString = Replace(strString, "\
", vbCrLf)
		strString = Replace(strString, "\\t", vbTab)
		strString = Replace(strString, "\\'", chr(34))
    end if 'string type
    parseString=strString
end function


'********************************************************************
'* Sub	progHelp()
'* Purpose: displays syntax help and program defaults
'********************************************************************
Sub progHelp 'v1.0
	Dim strTemp

	strTemp= " TextSplit " & verStr & vbCrLf
	strTemp= strTemp & " Splits a TEXT file into chunks of no more than " & lineCount & " lines." & vbCrLf & vbCrLf
	strTemp= strTemp & " Syntax:" & vbCrLf
	strTemp= strTemp & vbTab & "TextSplit filepath.ext [lineCount] [targetFolder]" & vbCrLf
	strTemp= strTemp & vbTab & "filepath.ext is the text file to split up" & vbCrLf
	strTemp= strTemp & vbTab & "lineCount is number of lines per file before splitting" & vbCrLf
	strTemp= strTemp & vbTab & "targetFolder is location to store the split files" & vbCrLf
	strTemp= strTemp & " Notes:" & vbCrLf
	strTemp= strTemp & vbTab & "lineCount defaults to " & lineCount & " lines" & vbCrLf
	strTemp= strTemp & vbTab & "targetFolder defaults to current working directory" & vbCrLf
	WScript.Echo strTemp
end Sub

```