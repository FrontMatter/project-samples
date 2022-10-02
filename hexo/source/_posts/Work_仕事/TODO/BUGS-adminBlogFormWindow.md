---
title: BUGS  --  adminBlogFormWindow
sticky: 999
comments: false
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
share: false
tags:
  - migrated from rBlogger.2009
categories:
  - Work_仕事
  - TODO
date: 2012-01-06 11:56:18
---

 2 issues with the drop down box exist:
<ul><li><span style="text-decoration: line-through;">typeAhead and auto-complete do not work</span> (done) resolved with upgrade of ExtJS 4.x</li><li><span style="text-decoration: line-through;">There's a bug in the PHP json output for the forum tree where forums are output only in sequential order. 
The order should reflect the same as the tree display. This makes it easy to read.</span> done (changed sort order on data.store!)</li></ul>​<span style="text-decoration: line-through;">When user clicks on the minimize button, HTMLeditor becomes empty upon "normalized."
<ul><li>Need to find the bug that forces my HTMLeditor text to clear.</li><li>Although, the reset function will restore the data from initial load... last changes are lost!</li><li>http://www.sencha.com/forum/showthread.php?76784-FIXED-105-HtmlEditor-is-gone-in-firefox-after-minimizing-a-window&amp;p=436433&amp;viewfull=1#post436433</li></ul>
If window is in view-source mode when clicking the save button, no data is available in the content field. So, all of the blog entry is lost.</span>
<ul><li><span style="text-decoration: line-through;">Need a way to either programmatically force WYSIWYG mode or grab the source-mode text. see <b><a href="http://dev.sencha.com/deploy/dev/docs/source/Field.html#method-Ext.form.Field-getRawValue">getRawValue</a></b>()\n    : <b><a href="http://dev.sencha.com/deploy/dev/docs/source/Field.html#method-Ext.form.Field-getValue">getValue</a></b>()</span> done</li><li><span style="text-decoration: line-through;">How can we change the mode via code? <a href="http://dev.sencha.com/deploy/dev/docs/source/HtmlEditor.html#method-Ext.form.HtmlEditor-toggleSourceEdit">toggleSourceEdit</a>()</span> done</li><li><span style="text-decoration: line-through;">See HtmlEditor.sourceEditMode configOption for editMode status. </span> done</li></ul>
Need way to distinguish if blog has been edited from last save. and upon save, update status on the window.<ul><li>Use an asterisk in the title if edited (like MS does). see Ext.form.HtmlEditor.<b><a href="http://dev.sencha.com/deploy/dev/docs/source/Field.html#method-Ext.form.Field-isDirty">isDirty </a></b> <b></b>()</li><li>Also check the other text fields for changes and update this window's "dirty" status</li><li><span style="text-decoration: line-through;">On close and HTML editor isDirty()===true, warn user</span> done</li><li>On close, check other form elements for dirty flag!
</li><li><span style="text-decoration: line-through;">Need to reset dirty flag when save is completed.</span> done</li><li><span style="text-decoration: line-through;">Update byteSize to reflect new blog size!</span> done
</li></ul>blog grid save bugs:
<ul><li>If you move a blog to a different forum, clear the preview window (if edited blog is in previewer).</li><li>When you save a blog entry (for same forum as selected) force the preview window to update.</li><li><span style="text-decoration: line-through;">Fix bug where record.content data is not updated at save time. Use  <b><a href="http://dev.sencha.com/deploy/dev/docs/source/Field.html#method-Ext.form.Field-getRawValue">getRawValue</a></b>() instead of getValue()
</span> done</li><li><span style="text-decoration: line-through;">If Forum is of Gallery viewType, then show the blog Image and upload components inside this blog editor.</span> done</li></ul>
Window Management:
<ul><li>If user is impatient when clicking the edit button, new window will load with multiple copies of the same components.
Need to manage the window call events better. Create a obj.handler for the window and reference it at button call.
If window not open, create. Otherwise, show().
User new window manager system. Consider using Ext.id() for generation of window id's.
</li><li>Need to separate New blog window from Edit (old) blog windows</li><li>Fix the loading calls! cascade the callbacks for dynamic script loading to load the next dependency. 
This will eliminate the undefined function errors due to script not loaded/processed. 
While loading, show a message indicating that module is loading! 
</li><li>Look at WindowMgr.get() and use id configOption on init of window Object.
</li></ul>From iPhone or iPad, HtmlEditor does not function in WYSIWYG mode. However, allows text entry in SourceEdit mode.
<ul><li>http://stackoverflow.com/questions/723592/why-doesnt-contenteditable-work-on-the-iphone</li></ul>
Expand the font list with a few more of your favorites:
<ul><li>Use fontFamilies config option to override the defaults.</li></ul>