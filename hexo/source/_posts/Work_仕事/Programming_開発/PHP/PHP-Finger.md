---
title: 'PHP:: Finger'
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
  - PHP
date: 2011-01-14 16:00:47
---

 http://snipplr.com/view/1606/php--finger-php-simple-client/

 http://www.phpro.org/examples/PHP-Finger-Client-Linux-Kernel.html


{% codeblock lang:PHP "function Finger" %}
<?
/*** connect to port 79 ***/
//created a <UL>; list...

$fp = fsockopen('kernel.org', 79);

/*** get the info ***/
while( !feof($fp) ) {
    /*** get the text ***/
    $text = fgets($fp, 128);
    /*** make sure we have a valid line ***/
    if(trim($text) != '')
    {
        /*** add to the list ***/
        echo '<li>'. trim($text).'</li>';
    }
}
/*** close the file pointer ***/
fclose($fp);
?>
{% endcodeblock %}
