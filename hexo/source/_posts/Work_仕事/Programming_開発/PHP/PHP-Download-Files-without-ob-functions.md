---
title: 'PHP:  Download Files without ob_* functions'
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
date: 2011-01-17 16:00:04
---

 http://us3.php.net/manual/en/function.ob-start.php
<strong class="user">sonicx</strong>
  <a href="http://us3.php.net/manual/en/function.ob-start.php#94741" class="date">21-Nov-2009 07:58</a>

<span class="html">Hey folks, as dan already noted, using the <span style="background-color: rgb(204, 255, 255);">ob_gzhandler</span> will make it impossible to get the content-length, and thusly will make the download of files a little ugly. the client cant show progress as it wont know how large it's targeted download actually is. even if you write a custom handler, it seems impossible to set the buffer's size to a global. the ob_handler seems to not share a global scope.i wrote a small php to solve that problem, by not using the ob_* functions, but rather gzencode manually:</span>


<pre>
    $file = $_REQUEST["file"] or die("Please specify the 'file' parameter.");
   
    $allowedExtensions = array(
        "jpg" => "image",
        "png" => "image",
        "gif" => "image"
    );
   
    $path = pathinfo($file);
    if(!in_array(strtolower($path["extension"]), array_keys($allowedExtensions))) {
        header("HTTP/1.0 403 Access denied");
        die("403 You dont have access to that file, wether it exists or not.");
    }
   
    $pack = true;
    if(!empty($_SERVER["HTTP_ACCEPT_ENCODING"]) && strpos("gzip",$_SERVER["HTTP_ACCEPT_ENCODING"]) === NULL)
        $pack = false;
       
    if(!is_file($file) || !is_readable($file)) {
        header("HTTP/1.0 404 Not Found");
        die("404 The file you are looking for is not available.");
    }
   
    $buffer = file_get_contents($file);
    if($pack) {
        header("Content-Encoding: gzip");
        $buffer = gzencode($buffer,9,true);
    }
    $length = strlen($buffer);
    header("Content-Type: {$allowedExtensions[$path["extension"]]}/{$path["extension"]}");   
    header("Content-Length: ".$length);
    die($buffer);
?>
</pre>