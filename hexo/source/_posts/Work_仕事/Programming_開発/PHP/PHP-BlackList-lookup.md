---
title: 'PHP:: BlackList lookup'
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
date: 2011-01-14 16:00:57
---

For doing basic RBL (Real Time Blacklist) lookups with this function do:


{% codeblock lang:PHP %}
<?
$host = '64.53.200.156';
$rbl  = 'sbl-xbl.spamhaus.org';

// valid query format is: 156.200.53.64.sbl-xbl.spamhaus.org
$rev = array_reverse(explode('.', $host));
$lookup = implode('.', $rev) . '.' . $rbl;

if ($lookup != gethostbyname($lookup)) {
    echo "ip: $host is listed in $rbl\n";
} else {
    echo "ip: $host NOT listed in $rbl\n";
}
?>
{% endcodeblock %}
