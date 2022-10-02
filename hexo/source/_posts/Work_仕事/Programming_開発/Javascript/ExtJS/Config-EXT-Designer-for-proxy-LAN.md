---
title: Config EXT Designer for proxy LAN
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
  - Javascript
  - ExtJS
date: 2011-08-24 13:19:00
---

USER: [azuroff](http://www.sencha.com/forum/member.php?62085-azuroff)
TIME: 09:15 AM
POST: http://www.sencha.com/forum/showthread.php?99906-Ext-Designer-Proxy-Server&p=638416&viewfull=1#post638416"


<blockquote>
Here's how I was able to activate Ext Designer from behind an NTLM proxy:



1. Download and install the following software if you don't have it already:
<ul><li>Cygwin (if you're on Windows)</li><li>Python - just be sure you install the package when installing Cygwin - I don't think it's installed by default.</li><li>The NTLM Authorization Proxy Server from <a href="http://ntlmaps.sourceforge.net/" target="_blank">http://ntlmaps.sourceforge.net/</a> - the download is just a zip file that you unzip somewhere.</li></ul>

2. In the ntlmaps-0.9.9.0.1 folder, set the following values in the server.cfg file:
<ul><li>PARENT_PROXY - the name of the corporate proxy server</li><li>PARENT_PROXY_PORT - the port used by the corporate proxy server</li><li>ALLOW_EXTERNAL_CLIENTS - set this to 1 if you're going to 
authenticate Ext Designer on a machine other than the one running your 
proxy server.</li><li>NT_DOMAIN - the NT domain used by your username</li><li>USER - the username you use when logging into the domain</li><li>PASSWORD - the password you use when logging into the domain</li></ul>

3. Once all that is set, start the proxy server with the command: **python main.py**

You should see something like this:
```text
NTLM authorization Proxy Server v0.9.9.0.1
Copyright (C) 2001-2004 by Dmitry Rozmanov and others.
Now listening at <local hostname> on port <local port>
```
4. In the Ext Designer proxy setup, use <local hostname> and <local port> (defaults to port 5865) for the proxy server, HTTP as the proxy type, and your domain username and password.


This *should* allow you to connect to the Sencha servers to authenticate your copy of Ext Designer.  Once Ext Designer has been successfully authenticated, you can go ahead and kill your local proxy server - Ext Designer will work normally without it now.


This is what worked for my co-worker and I.  As always, your mileage may vary.
</blockquote>