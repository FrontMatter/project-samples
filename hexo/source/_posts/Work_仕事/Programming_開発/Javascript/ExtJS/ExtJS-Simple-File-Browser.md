---
title: 'ExtJS: Simple File Browser'
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
date: 2011-08-16 12:10:29
---

 Check this out!!!&nbsp; http://superdit.com/2011/06/01/extjs-simple-file-browser/
 source: http://www.box.net/shared/eoby0n0ti5


# ExtJS: Simple File Browser
 http://superdit.com/2011/06/01/extjs-simple-file-browser/ 
 June 1st, 2011 by Aditia Rahman 


 ExtJS has a lot of great components to build complete web application that can be look like desktop application, In today post I want to show how to create a very simple file browser in ExtJS, with PHP backend we can easily get file and folder on the system. 


 <a title="ExtJS Simple File Browser" href="http://superdit.com/2011/06/01/extjs-simple-file-browser/" target="_blank"><img class="alignnone size-full wp-image-6873" title="ExtJS File Browser" src="http://superdit.com/wp-content/uploads/2011/06/screenshot.jpg" alt="ExtJS File Browser" height="200" width="540"></a> 
 First this example have some limitation, I try it on my XAMPP localhost, so I assumed the it is the top parent of all directories, the tree directory only load once when the page is loaded, file preview only in grid component.
 
<p style="text-align: center;"><a title="ExtJS File Browser Download" href="http://www.box.net/shared/eoby0n0ti5" target="_blank" class="button large green">download</a> 

## ExtJS
The example container is based on window component, which have two items inside, they are treePanel and gridPanel, the gridPanel will load dynamically, trigerred when user click on of the tree node.

```javascript
Ext.onReady(function() {
    store_dir = Ext.create('Ext.data.TreeStore', {
        proxy: {
            type: 'ajax',
            url: 'get_dir.php'
        }
    });
  
    tree_dir = Ext.create('Ext.tree.Panel', {
        title: 'Localhost Directory',
        rootVisible: false,
        store: store_dir,
        split: true,
        region: 'west',
        collapsible: true,
        floatable: false,
        width: 200,
        useArrows: true,
        listeners: {
            itemclick: {
                fn: function(view, record, item, index, event) {
                    store_file.load({
                        url: 'get_file.php?dir=' record.data.id
                    });
  
                    nodeId = record.data.id;
                    htmlId = item.id;
                }
            }
  
        }
    });
  
    Ext.define('File', {
        extend: 'Ext.data.Model',
        fields: ['filename', 'filesize', 'filedate']
    });
  
    store_file = Ext.create('Ext.data.Store', {
        model: 'File',
        proxy: {
          type: 'ajax',
          url: 'get_file.php',
          reader: {
              type: 'json',
              root: 'files'
          }
        }
    });
  
    grid_file = Ext.create('Ext.grid.Panel', {
        title: 'File List',
        region: 'center',
        store: store_file,
        columns: [
            { header: 'Name', width: 170, dataIndex: 'filename' },
            { header: 'Size', width: 100, dataIndex: 'filesize' },
            { header: 'Last Modified', width: 200, dataIndex: 'filedate' }
        ],
        viewConfig: {
            stripeRows: true
        }
    });
  
    win = Ext.create('widget.window', {
        title: 'ExtJS Simple File Browser',
        width: 700,
        height: 400,
        layout: 'border',
        bodyStyle: 'padding: 5px;',
        items: [tree_dir, grid_file]
    });
  
    win.show();
});
```

## PHP (get_dir.php)
 This file is for fetching all directory on your XAMPP htdocs directory, using *$_SERVER['DOCUMENT_ROOT']*
 variable. If you have many directory on htdocs, it will take time to load. In this php file I used a recursive function to get all the directory with all the sub directory by one call function, that’s why it will take time to load, and create a json format from it. 

```php
<?php
	 
	class MyDirectory {
	 
	    public $json = '[';
	 
	    public function get_children($dir, $child) {
	        $dh = opendir($dir);
	        while (($file = readdir($dh)) !== false) {
	            if ($file != '.' AND $file != '..' ) {
	                if (filetype($dir . $file) == 'dir') {
	                    // must be checked if this folder have other subfolder
	                    if ($this->count_sub_dir($dir . $file . '/') == 0) {
	                        $this->json .= '{text:"'.$file.'", leaf: true, id: "'.$dir . $file.'"},';
	                    } else {
	                        $this->json .= '{text:"'.$file.'", id: "'.$dir . $file.'", children: [';
	                        $this->get_children($dir . $file . '/', true);
	                    }
	                }
	            }
	        }
	        if ($child) {
	            $this->json .=  ']},';
	        }
	        closedir($dh);
	    }
	 
	    public function count_sub_dir($dir) {
	        $dh = opendir($dir);
	        $countdir = 0;
	        while (($file = readdir($dh)) !== false) {
	            if ($file != '.' AND $file != '..' ) {
	                if (filetype($dir . $file) == 'dir') {
	                    $countdir ;
	                }
	            }
	        }
	        closedir($dh);
	        return $countdir;
	    }
	}
	 
	$host_dir = $_SERVER['DOCUMENT_ROOT']."/";
	 
	$dir = new MyDirectory();
	 
	$dir->get_children($host_dir, false);
	 
	$dir->json .= ']';
	$dir->json = str_replace(",]", "]", $dir->json);
	 
	echo($dir->json);
	 
	?>
```



## PHP (get_file.php)
 And this is the last file to get all the file (without any directory) in specific directory, the parameter sent from ExtJS tree node, when it clicked. 
 ```php
<?php
	 
	$dir = $_GET['dir'] . "/";
	 
	$dh = opendir($dir);
	$files = array();
	while (($file = readdir($dh)) !== false) {
	    if ($file != '.' AND $file != '..' ) {
	        if (filetype($dir . $file) == 'file') {
	            $files[] = array(
	                'filename' => $file,
	                'filesize' => filesize($dir . $file). ' bytes',
	                'filedate' => date("F d Y H:i:s", filemtime($dir . $file))
	            );
	        }
	    }
	}
	closedir($dh);
	 
	echo(json_encode(array('files' => $files)));
	 
	?>
 ```


 Well that all hope can give some idea to create much larger application or adding some more feature like icons view (using DataView component), create, edit, delete file, etc. 


<p style="text-align: center;"><a title="ExtJS File Browser Donwload" href="http://www.box.net/shared/eoby0n0ti5" target="_blank" class="button large green">download</a>

![ExtJS File Browser](http://superdit.com/wp-content/uploads/2011/06/screenshot-2.png)
