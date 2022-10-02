---
title: 'ExtJS:: Update dataView (Attach.Mgr) template inline'
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
date: 2011-01-18 14:06:01
---

 Define a '<span style="font-family: courier new;">prepareData</span>' function in the dataview object for the AttachGrid::DataView.

Something like this:&nbsp;<pre><span style="background-color: rgb(204, 255, 255);">prepareData:</span> <span style="background-color: rgb(204, 153, 255);">formatData.createDelegate()</span></pre> 

<code>var formatData = function(data){
                data.shortName = data.name.ellipse(15);
                data.sizeString = formatSize(data);
                data.dateString = new Date(data.lastmod).format("m/d/Y g:i a");
                this.lookup[data.name] = data;
                return data;
            };
</code>

See --> http://dev.sencha.com/deploy/dev/examples/view/chooser.html more details.