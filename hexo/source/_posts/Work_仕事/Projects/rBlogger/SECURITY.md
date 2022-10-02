---
title: SECURITY!!!!!!
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
  - rBlogger
date: 2011-01-20 12:51:00
---

 <span style="text-decoration: line-through;">Need to dev the login/security of this admin console!!!</span> done! :D 

√ Spent all weekend (literally 24 hours straight) writing the code for this!
√ Created a browswer/OS detection for user at the server-side.
√ Now storing more metrics about users to be used for future site designs.
√ Wrote new userManage{} PHP class to handle remote login calls and detection.
√ Created new site logo for use with login page.
√ Wrote new login page completely from scratch using XDS.
√ Integrated CAPTCHA system inside the EXTjs form.


<ul>
<li><span style="text-decoration: line-through;">Use the login system from LoreZyra.com/!Admin!!!!</span> done</li>
<li><span style="text-decoration: line-through;">Login window\\''s <font color="#800000">clear </font>button should say: <font color="#008000">reset </font>since it reloads a new captcha.</span> done</li>
<li><span style="text-decoration: line-through;">On user login, update user dateTime field in DB!</span> done
</li>
<li><span style="text-decoration: line-through;">Add confirmation to LOGOFF in case of accidental click/tap...</span> done
</li>
<li><span style="text-decoration: line-through;">Fix issue with<font color="#0000ff"> is_member_logged_in() </font>method. Currently returning false when user credentials are correct.</span> done!
</li>
<li><span style="text-decoration: line-through;"><font color="#ff0000">Integrate security checks into <b>all </b>PHP scripts for user status!</font></span> Done</li>
<li>Need to detect hack/crack attempts on the login.html page. If say, 10 failed logins occur in a sequence within a 10 minute time period from the same IP temporarily block them from visiting the website for a period of 4 hours.

<ul>
<li>This feature will require a separate DB.table to track failed attempts</li></ul></li><li>Need to track DOS/flood attempts in the blogAntiFlood table (IP , time)
<ul><li>Create webpage to display server busy due to flood attempt.</li></ul></li><li>For users with a banned IP, need webpage explaining that the server is refusing to serve data due to their IP violating site policy.
<ul><li>default IP ban period will be set to 3 months.</li></ul></li><li>Make sure users are logging back in from the same IP, otherwise delete old session and force new session with login. (applies to special cases)
</li><li><span style="text-decoration: line-through;">Consider forcing a logout after 7 days...</span> set</li><li><span style="text-decoration: line-through;">Login.html -&gt; reset button should also recenter the dialog box.</span> done</li><li>console should force user to logout when session ends/expired!
</li></ul>