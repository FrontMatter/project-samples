---
title: How to replace placeholder components
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
  - Sencha
categories:
  - Work_仕事
  - Programming_開発
  - Javascript
  - ExtJS
date: 2011-03-08 12:59:16
---

https://www.sencha.com/forum/showthread.php?103560-How-to-replace-placeholder-components&langid=14


 コード: 
{% codeblock lang:JavaScript %}
/**
 * Replaces a component with another, preserving the original config
 * @param {Component} newComponent the new component to replace this one with
 * @return {Component} this the replaced component
 */

Ext.override(Ext.Component, {
    replaceWith: function (newComponent) {
        var ctnr = this.ownerCt;

        // if the refOwner is a form or if newComponent.ownerForm config is set to the form
        var form = newComponent.ownerForm ? newComponent.ownerForm : this.refOwner.form;
        var i = ctnr.items.indexOf(this);

        // apply initialConfig
        Ext.applyIf(newComponent, this.initialConfig);

        ctnr.remove(this, true);

        var added = ctnr.insert(i, newComponent);

        // if the component is in a form
        if (form) {
            // remove the old component from the form
            form.remove(this);
            // add the new component to the form
            form.add(added);
        }
    }
});
{% endcodeblock %}


 To use it, design your form in Ext Designer and add placeholder components where you want to include custom components. Give them an autoRef and  export the project. Paste the above override into a JavaScript file and load it in your page along with any custom component files needed.


 In the subclass initComponent method you can then do something like this...
 コード: 
{% codeblock lang:javascript %}
this.tagsField.replaceWith({
    xtype: ‘superboxselect’,
    mode: ‘local’,
    displayField: ‘tag’,
    displayFieldTpl: ‘{tag}’,
    valueField: ‘tag’,
    queryDelay: 0,
    triggerAction: ‘all’
}); 
{% endcodeblock %}




In the example above my placeholder component had an autoRef of "tagsField" and I am replacing it with the rather groovy SuperBoxSelect custom component.
Note: thanks to Otávio 's post below, the original config is preserved so you only need to specify the config needed by your new component. 