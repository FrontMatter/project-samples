---
title: 'PHP:: Check valid Email'
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
date: 2011-01-14 16:00:30
---

 http://www.phpclasses.org/package/1519-PHP-Check-the-existence-of-an-email-address-via-SMTP.html

<h2><a name="description">Detailed description</a></h2>
<div class="framed light">This class is meant check the existence of an email address in three levels:



1. Via regular expression validation
2. Using domain rules by checking a white list of well known email address provides (ie yahoo.com)
3. Via SMTP request to simulate a delivery to the address being checked.</div>
http://www.phpclasses.org/browse/package/1519/download/zip.html

<hr>
 Lennart Poot(www.twing.nl)  07-Apr-2006 07:23 [from http://www.php.net/manual/en/function.getmxrr.php]

This script validates an e-mail adress using getmxrr and fsockopen



1. it validates the syntax of the address.
2. get MX records by hostname
3. connect mail server and verify mailbox(using smtp command RCTP TO:<email>)



When the function "validate_email([email])" fails connecting the mail server with the highest priority in the MX record it will continue with the second mail server and so on..


The function "validate_email([email])" returns 0 when it failes one the 3 steps above, it will return 1 otherwise


Grtz Lennart Poot

<pre>function validate_email($email){
   $mailparts=explode("@",$email);
   $hostname = $mailparts[1];

   // validate email address syntax
   $exp = "^[a-z'0-9] ([._-][a-z'0-9] )*@([a-z0-9] ([._-][a-z0-9] )) $";
   $b_valid_syntax=eregi($exp, $email);

   // get mx addresses by getmxrr
   $b_mx_avail=getmxrr( $hostname, $mx_records, $mx_weight );
   $b_server_found=0;

   if($b_valid_syntax && $b_mx_avail){
     // copy mx records and weight into array $mxs
     $mxs=array();

     for($i=0;$i<count($mx_records);$i ){="" $mxs[$mx_weight[$i]]="$mx_records[$i];" }="" sort="" array="" mxs="" get="" servers="" with="" highest="" prio="" ksort="" ($mxs,="" sort_numeric="" reset="" ($mxs);="" while="" (list="" ($mx_weight,="" $mx_host)="each" ($mxs)="" )="" {="" if($b_server_found="=" 0){="" try="" connection="" on="" port="" 25="" $fp="@fsockopen($mx_host,25," $errno,="" $errstr,="" 2);="" if($fp){="" $ms_resp="" ;="" say="" to="" mailserver="" helo="" microsoft.com="" );="" initialize="" sending="" $ms_resp.="send_command($fp," mail="" from:=""><support@microsoft.com>");

           // try receipent address, will return 250 when ok..
           $rcpt_text=send_command($fp, "RCPT TO:<".$email.">");
           $ms_resp.=$rcpt_text;
          
           if(substr( $rcpt_text, 0, 3) == "250")
             $b_server_found=1;

           // quit mail server connection
           $ms_resp.=send_command($fp, "QUIT");

         fclose($fp);

         }

       }
    }
  }
  return $b_server_found;
}

function send_command($fp, $out){

  fwrite($fp, $out . "\r\n");
  return get_data($fp);
}

function get_data($fp){
  $s="";
  stream_set_timeout($fp, 2);

  for($i=0;$i<2;$i  )
    $s.=fgets($fp, 1024);

  return $s;
}

// support windows platforms
if (!function_exists (\''getmxrr\'') ) {
  function getmxrr($hostname, &$mxhosts, &$mxweight) {
    if (!is_array ($mxhosts) ) {
      $mxhosts = array ();
    }

    if (!empty ($hostname) ) {
      $output = "";
      @exec ("nslookup.exe -type=MX $hostname.", $output);
      $imx=-1;

      foreach ($output as $line) {
        $imx  ;
        $parts = "";
        if (preg_match ("/^$hostname\tMX preference = ([0-9] ), mail exchanger = (.*)$/", $line, $parts) ) {
          $mxweight[$imx] = $parts[1];
          $mxhosts[$imx] = $parts[2];
        }
      }
      return ($imx!=-1);
    }
    return false;
  }
}

?></support@microsoft.com></count($mx_records);$i>
</pre>