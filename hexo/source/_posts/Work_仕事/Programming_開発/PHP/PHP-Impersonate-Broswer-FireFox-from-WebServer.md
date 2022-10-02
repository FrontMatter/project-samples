---
title: 'PHP:  Impersonate Broswer - FireFox from WebServer'
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
date: 2011-01-17 15:59:56
---

 <strong class="user">Jeremy Saintot</strong>
  <a href="http://us3.php.net/manual/en/function.fsockopen.php#101872" class="date">14-Jan-2011 05:24</a>
  
<code><span class="html">

Here is my fsockopen - based HTTP request function (GET and POST) :



</span></code><span style="background-color: rgb(192, 192, 192);">:: Could use this as a "proxy" method to check hotmail from webserver! ::</span>

<pre>
function http_request(
    $verb = 'GET',             /* HTTP Request Method (GET and POST supported) */
    $ip,                       /* Target IP/Hostname */
    $port = 80,                /* Target TCP port */
    $uri = '/',                /* Target URI */
    $getdata = array(),        /* HTTP GET Data ie. array('var1' => 'val1', 'var2' => 'val2') */
    $postdata = array(),       /* HTTP POST Data ie. array('var1' => 'val1', 'var2' => 'val2') */
    $cookie = array(),         /* HTTP Cookie Data ie. array('var1' => 'val1', 'var2' => 'val2') */
    $custom_headers = array(), /* Custom HTTP headers ie. array('Referer: http://localhost/ */
    $timeout = 1000,           /* Socket timeout in milliseconds */
    $req_hdr = false,          /* Include HTTP request headers */
    $res_hdr = false           /* Include HTTP response headers */
    )\n{
    $ret = '';
    $verb = strtoupper($verb);
    $cookie_str = '';
    $getdata_str = count($getdata) ? '?' : '';
    $postdata_str = '';

    foreach ($getdata as $k => $v)
        $getdata_str .= urlencode($k) .'='. urlencode($v);

    foreach ($postdata as $k => $v)
        $postdata_str .= urlencode($k) .'='. urlencode($v) .'&';

    foreach ($cookie as $k => $v)
        $cookie_str .= urlencode($k) .'='. urlencode($v) .'; ';

    $crlf = "\r\n";
    $req = $verb .' '. $uri . $getdata_str .' HTTP/1.1' . $crlf;
    $req .= 'Host: '. $ip . $crlf;
    $req .= 'User-Agent: Mozilla/5.0 Firefox/3.6.12' . $crlf;
    $req .= 'Accept: text/html,application/xhtml xml,application/xml;q=0.9,*/*;q=0.8' . $crlf;
    $req .= 'Accept-Language: en-us,en;q=0.5' . $crlf;
    $req .= 'Accept-Encoding: deflate' . $crlf;
    $req .= 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7' . $crlf;
   
    foreach ($custom_headers as $k => $v)
        $req .= $k .': '. $v . $crlf;
       
    if (!empty($cookie_str))
        $req .= 'Cookie: '. substr($cookie_str, 0, -2) . $crlf;
       
    if ($verb == 'POST' && !empty($postdata_str))
    {
        $postdata_str = substr($postdata_str, 0, -1);
        $req .= 'Content-Type: application/x-www-form-urlencoded' . $crlf;
        $req .= 'Content-Length: '. strlen($postdata_str) . $crlf . $crlf;
        $req .= $postdata_str;
    }
    else $req .= $crlf;
   
    if ($req_hdr)
        $ret .= $req;
   
    if (($fp = @fsockopen($ip, $port, $errno, $errstr)) == false)
        return "Error $errno: $errstr\\\\n";
   
    stream_set_timeout($fp, 0, $timeout * 1000);
   
    fputs($fp, $req);
    while ($line = fgets($fp)) $ret .= $line;
    fclose($fp);
   
    if (!$res_hdr)
        $ret = substr($ret, strpos($ret, "\r\n\r\n")   4);
   
    return $ret;
}
?>

 Example usages :<code><span class="html"><span class="keyword">echo </span><span class="default">http_request</span><span class="keyword">(</span><span class="string">'GET'</span><span class="keyword">, </span><span class="string">'www.php.net'</span><span class="keyword">);
echo </span><span class="default">http_request</span><span class="keyword">(</span><span class="string">'GET'</span><span class="keyword">, </span><span class="string">'www.php.net'</span><span class="keyword">, </span><span class="default">80</span><span class="keyword">, </span><span class="string">'/manual/en/function.phpinfo.php'</span><span class="keyword">);
echo </span><span class="default">http_request</span><span class="keyword">(</span><span class="string">'GET'</span><span class="keyword">, </span><span class="string">'www.php.net'</span><span class="keyword">, </span><span class="default">80</span><span class="keyword">, </span><span class="string">'/manual/en/function.phpinfo.php'</span><span class="keyword">, array(</span><span class="string">'get1' </span><span class="keyword">=> </span><span class="string">'v_get1'</span><span class="keyword">), array(), array(</span><span class="string">'cookie1' </span><span class="keyword">=> </span><span class="string">'v_cookie1'</span><span class="keyword">), array(</span><span class="string">'X-My-Header' </span><span class="keyword">=> </span><span class="string">'My Value'</span><span class="keyword">));

</span><span class="default">?></span></span></code> 

<span>output would look something like this:</span>
<font color="#ff00ff" face="verdana">GET /manual/en/function.phpinfo.php
Host: www.php.net
User-Agent: Mozilla/6.0 Firefox/5b
Accept: text/html,application/xhtml xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-us,en;q=0.5
Via: 1.0 143.2.111.38</font>

</pre>