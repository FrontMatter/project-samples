---
title: (DONE) Add Enter Key listen on login form
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
  - TODO
date: 2011-08-17 11:43:12
---

 add a key listener to ```/!Admin/adminUIlogon.ui.js```.


```javascript
Ext.onReady(function(){
    var formLogin = new Ext.FormPanel({
        frame: false, border: false, buttonAlign: 'center',
        url: BASE_URL   'user/extjs_login', method: 'POST',
        id: 'frmLogin',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Username',
            id:'fldusername',
            name: 'username',
            allowBlank: false
        }, {
            xtype: 'textfield',
            fieldLabel: 'Password',
            id:'fldpassword',
            name: 'password',
            allowBlank: false,
            inputType: 'password'
        }],
        buttons: [
            { text: 'Login' },
            { text: 'Reset', handler: function() {
                    formLogin.getForm().reset();
                }
            }
        ],
        keys: [
            { key: [Ext.EventObject.ENTER]</font>, handler: function() {
                    Ext.Msg.alert("Alert","Enter Key Event !");
                }
            }
        ]
</span>    });

    var winLogin = new Ext.Window({
        title: 'Extjs Enter Key Event', layout: 'fit',
        width: 340, height: 140, resizable: false,
        closable: false, items: [formLogin]
    });

    winLogin.show();
});
```