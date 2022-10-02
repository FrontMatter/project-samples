---
title: 'EXTjs: init plugins after building in XDS'
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
date: 2011-01-20 14:06:59
---

 http://www.sencha.com/forum/showthread.php?121490-3.1.0-Add-a-Filter-Plugin-to-a-grid-after-grid-creation

http://www.sencha.com/forum/showthread.php?103520-Add-plugin&p=485440#post485440

http://dev.sencha.com/deploy/dev/docs/?class=Ext.ComponentMgr&member=registerPlugin<hr>
 I'll answer here, which will also answer your question in regards to the plugins for the grid.  The plugins array will try to evaluate the object you type in, but if it doesn't evaluate then it will turn it into a string.  The plugins configuration option can be used by specifying the "ptype" of the plugin.  However, there is a bug currently that will break the rendering of the component when plugins are supplied that do not actually exist.  This option is geared towards when we allow importing custom UX plugins, and was released too early.  It will be removed temporarily in the next hot fix release, so you can ignore it 
for now.



For more information on ptypes and how to register a plugin ptype, see <a href="http://www.sencha.com/deploy/dev/docs/?class=Ext.ComponentMgr&member=registerPlugin">http://www.sencha.com/deploy/dev/doc...registerPlugin</a>  Ext.ComponentMgr.registerPlugin is aliased by Ext.preg (analogous to how Ext.ComponentMgr.register is aliased by Ext.reg).



Example:

<div class="bbcode_container">
	<div class="bbcode_description">Code:</div>
	<pre class="bbcode_code" style="height: 36px;">Ext.preg('ux-progressbarpager', Ext.ux.ProgressBarPager);</pre>
</div> You would include the plugin and register it in your own project javascript files.



In the meantime though, you can add a plugin in the following fashion:



<div class="bbcode_container">
	<div class="bbcode_description">Code:</div>
	<pre class="bbcode_code" style="height: 264px;">MyContainer = Ext.extend(MyContainerUi, {
    initComponent: function(){
        MyContainer.superclass.initComponent.call(this);

        this.grid.plugins = [
            // via constructor...
            this.grid.initPlugin(new Ext.ux.ProgressBarPager({...})),

            // or via a registered ptype
            this.grid.initPlugin('ux-progressbarpager'),

            // or via a registered ptype json configuration
            this.grid.initPlugin({
                ptype: 'ux-progressbarpager',
                configOption1: 'blah',
                configOption2: 'blah'
            })
        ];
    }
});</pre>
</div>