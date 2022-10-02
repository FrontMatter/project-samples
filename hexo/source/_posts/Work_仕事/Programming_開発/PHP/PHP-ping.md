---
title: 'PHP:: ping'
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
date: 2011-01-14 16:01:28
---
 
 http://www.codediesel.com/php/ping-a-server-using-php/
 
 http://www.dynamicdrive.com/forums/showthread.php?t=37370
 
 http://www.planet-source-code.com/vb/scripts/ShowCode.asp?lngWId=8&txtCodeId=1786
 
 http://www.theworldsend.net/
 http://www.theworldsend.net/ping_src.php
 
 
 
{% codeblock lang:PHP "function icmpChecksum" %}
// Checksum calculation function
function icmpChecksum($data) {
    if (strlen($data)%2) $data .= "\x00";

    $bit = unpack('n', $data);
    $sum = array_sum($bit);

    while ($sum >> 16) $sum = ($sum >> 16) ($sum & 0xffff);

    return pack('n', ~$sum);
}

// Making the package
$type = "\x08";
$code = "\x00";
$checksum = "\x00\x00";
$identifier = "\x00\x00";
$seqNumber = "\x00\x00";
$data = "Scarface";
$package = $type.$code.$checksum.$identifier.$seqNumber.$data;
$checksum = icmpChecksum($package); // Calculate the checksum
$package = $type.$code.$checksum.$identifier.$seqNumber.$data;

// And off to the sockets
$socket = socket_create(AF_INET, SOCK_RAW, 1);
socket_connect($socket, "www.google.com", null);

// If you’re using below PHP 5, see the manual for the microtime_float
// function. Instead of just using the microtime() function.
$startTime = microtime(true);
socket_send($socket, $package, strLen($package), 0);
if (socket_read($socket, 255)) {
    echo round(microtime(true) - $startTime, 4) .' seconds';
}
socket_close($socket);

{% endcodeblock %}
