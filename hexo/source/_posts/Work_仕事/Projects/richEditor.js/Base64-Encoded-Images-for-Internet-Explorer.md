---
title: Base64 Encoded Images for Internet Explorer
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
  - Projects
  - richEditor.js
date: 2012-02-21 08:58:10
---

 This is a simple trick that I’m including in the next release of [IE7](http://dean.edwards.name/IE7/). Mozilla and other browsers already support Base64 encoding of images. This gives web authors the ability to express image <abbr title="Uniform Resource Locator">URL</abbr>'s in this geeky-looking (and therefore cool) way:

```html
<img src="data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzMwAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==" alt="Base64 encoded image" width="150" height="150"/>
```

That ghastly mess will produce the following image in most decent browsers:
<img src="data:image/gif;base64,R0lGODlhDwAPAKECAAAAzMzMwAAACwAAAAADwAPAAACIISPeQHsrZ5ModrLlN48CXF8m2iQ3YmmKqVlRtW4MLwWACH H09wdGltaXplZCBieSBVbGVhZCBTbWFydFNhdmVyIQAAOw==" alt="Base64 encoded image" height="150" width="150">


Can’t wait to do it yourself now can you?

Internet Explorer does not support Base64 encoding of images so we will take advantage of <abbr title="PHP: Hypertext Preprocessor">PHP</abbr>’s built-in [base64_decode](http://www.php.net/base64_decode) function. We will simply pass the Base64 data back to a module which will then decode the data and return the appropriate image. Now that sounds complicated doesn’t it? Here is the required PHP code:


```php
<?php
$data = split(";", $_SERVER["QUERY_STRING"]);
$type = $data[0];
$data = split(",", $data[1]);
header("Content-type: ".$type);
echo base64_decode($data[1]);
?>
```

That wasn’t so bad. Now we need a little bit of JavaScript to pass the Base64 data to the PHP module:

```javascript
// a regular expression to test for Base64 data
var BASE64_DATA = /^data:.*;base64/i;
// path to the PHP module that will decode the encoded data
var base64Path = "/my/path/base64.php";
function fixBase64(img) {
	// check the image source
	if (BASE64_DATA.test(img.src)) {
		// pass the data to the PHP routine
		img.src = base64Path   "?"   img.src.slice(5);
	}
};
// fix images on page load
onload = function() {
	for (var i = 0; i < document.images.length; i  ) {
		fixBase64(document.images[i]);
	}
};
```

Example: [/my/base64-ie.html](http://dean.edwards.name/my/base64-ie.html)
