---
title: PHP - a fractal of bad design
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
date: 2012-04-16 18:08:12
---

 http://me.veekun.com/blog/2012/04/09/php-a-fractal-of-bad-design/

# PHP: a fractal of bad design

<time datetime="2012-04-09T19:29:00-07:00" pubdate="" data-updated="true">Apr 9<span>th</span>, 2012</time>

<div class="entry-content"><h2>Preface</h2>

<p>I’m cranky.  I complain about a lot of things.  There’s a lot in the 
world of technology I don’t like, and that’s really to be 
expected—programming is a hilariously young discipline, and none of us 
have the slightest clue what we’re doing.  Combine with <a href="http://en.wikipedia.org/wiki/Sturgeon''s_Law">Sturgeon’s Law</a>, and I have a lifetime’s worth of stuff to gripe about.</p>

<p>This is not the same.  PHP is not merely awkward to use, or 
ill-suited for what I want, or suboptimal, or against my religion.  I 
can tell you all manner of good things about languages I avoid, and all 
manner of bad things about languages I enjoy.  Go on, ask!  It makes for
 interesting conversation.</p>

<p>PHP is the lone exception.  Virtually every feature in PHP is broken 
somehow.  The language, the framework, the ecosystem, are all just <strong>bad</strong>.
  And I can’t even point out any single damning thing, because the 
damage is so systemic.  Every time I try to compile a list of PHP 
gripes, I get stuck in this depth-first search discovering more and more
 appalling trivia.  (Hence, fractal.)</p>

<p>PHP is an embarrassment, a blight upon my craft.  It’s so broken, but
 so lauded by every empowered amateur who’s yet to learn anything else, 
as to be maddening.  It has paltry few redeeming qualities and I would 
prefer to forget it exists at all.</p>

<p>But I’ve got to get this out of my system.  So here goes, one last try.</p>

<h2>An analogy</h2>

<p>I just blurted this out to Mel to explain my frustration and she insisted that I reproduce it here.</p>

<blockquote><p>I can’t even say what’s <em>wrong</em> with PHP, because—  okay.  Imagine you have uh, a toolbox.  A set of tools.  Looks okay, standard stuff in there.</p>

<p>You pull out a screwdriver, and you see it’s one of those weird 
tri-headed things.  Okay, well, that’s not very useful to you, but you 
guess it comes in handy sometimes.</p>

<p>You pull out the hammer, but to your dismay, it has the claw part on <em>both</em> sides.  Still serviceable though, I mean, you can hit nails with the middle of the head holding it sideways.</p>

<p>You pull out the pliers, but they don’t have those serrated surfaces;
 it’s flat and smooth.  That’s less useful, but it still turns bolts 
well enough, so whatever.</p>

<p>And on you go.  Everything in the box is kind of weird and quirky, but maybe not enough to make it <em>completely</em> worthless.  And there’s no clear problem with the set as a whole; it still has all the tools.</p>

<p>Now imagine you meet millions of carpenters using this toolbox who 
tell you “well hey what’s the problem with these tools?  They’re all 
I’ve ever used and they work fine!”  And the carpenters show you the 
houses they’ve built, where every room is a pentagon and the roof is 
upside-down.  And you knock on the front door and it just collapses 
inwards and they all yell at you for breaking their door.</p>

<p>That’s what’s wrong with PHP.</p></blockquote>




<h2>Stance</h2>

<p>I assert that the following qualities are <em>important</em> for 
making a language productive and useful, and PHP violates them with wild
 abandon.  If you can’t agree that these are crucial, well, I can’t 
imagine how we’ll ever agree on much.</p>

<ul><li>A language must be <strong>predictable</strong>.  It’s a medium for 
expressing human ideas and having a computer execute them, so it’s 
critical that a human’s understanding of a program actually be correct.</li><li>A language must be <strong>consistent</strong>.  Similar things 
should look similar, different things different.  Knowing part of the 
language should aid in learning and understanding the rest.</li><li>A language must be <strong>concise</strong>.  New languages exist to reduce the boilerplate inherent in old languages.  (We <em>could</em> all write machine code.)  A language must thus strive to avoid introducing new boilerplate of its own.</li><li>A language must be <strong>reliable</strong>.  Languages are tools 
for solving problems; they should minimize any new problems they 
introduce.  Any “gotchas” are massive distractions.</li><li>A language must be <strong>debuggable</strong>.  When something goes wrong, the programmer <em>has</em> to fix it, and we need all the help we can get.</li></ul>


<p>My position is thus:</p>

<ul><li>PHP is full of surprises: <code>mysql_real_escape_string</code>, <code>E_ACTUALLY_ALL</code></li><li>PHP is inconsistent: <code>strpos</code>, <code>str_rot13</code></li><li>PHP requires boilerplate: error-checking around C API calls, <code>===</code></li><li>PHP is flaky: <code>==</code>, <code>for ($foo as &$bar)</code></li><li>PHP is opaque: no stack traces by default or for fatals, complex error reporting</li></ul>


<p>I can’t provide a paragraph of commentary for every single issue 
explaining why it falls into these categories, or this would be endless.
  I trust the reader to, like, think.</p>

<h2>Don’t comment with these things</h2>

<p>I’ve been in PHP arguments a <em>lot</em>.  I hear a lot of very 
generic counter-arguments that are really only designed to halt the 
conversation immediately.  Don’t pull these on me, please.  :(</p>

<ul><li><p>Do not tell me that “good developers can write good code in any language”, or bad developers blah blah.  That doesn’t <em>mean</em> anything.  A good carpenter <em>can</em>
 drive in a nail with either a rock or a hammer, but how many carpenters
 do you see bashing stuff with rocks?  Part of what makes a good 
developer is the ability to <em>choose</em> the tools that work best.</p></li><li><p>Do not tell me that it’s the developer’s responsibility to 
memorize a thousand strange exceptions and surprising behaviors.  Yes, 
this is necessary in any system, because computers suck.  That doesn’t 
mean there’s no upper limit for how much zaniness is acceptable in a 
system.  PHP is nothing <em>but</em> exceptions, and it is not okay when
 wrestling the language takes more effort than actually writing your 
program.  My tools should not create net positive work for me to do.</p></li><li><p>Do not tell me “that’s how the C API works”.  What on Earth is 
the point of using a high-level language if all it provides are some 
string helpers and a ton of verbatim C wrappers?  Just write C!  Here, 
there’s even a <a href="http://www.boutell.com/cgic/">CGI library</a> for it.</p></li><li><p>Do not tell me “that’s what you get for doing weird things”.  If 
two features exist, someday, someone will find a reason to use them 
together.  And again, this isn’t C; there’s no spec, there’s no need for
 “undefined behavior”.</p></li><li><p>Do not tell me that Facebook and Wikipedia are built in PHP.  I’m
 aware!  They could also be written in Brainfuck, but as long as there 
are smart enough people wrangling the things, they <em>can</em> overcome
 problems with the platform.  For all we know, development time could be
 halved or doubled if these products were written in some other 
language; this data point alone means nothing.</p></li><li><p>Ideally, don’t tell me anything!  This is my one big shot; if this list doesn’t hurt your opinion of PHP, <em>nothing</em> ever will, so stop arguing with some dude on the Internet and go make a cool website in record time to prove me wrong  :)</p></li></ul>


<p>Side observation: I loooove Python.  I will also happily talk your 
ear off complaining about it, if you really want me to.  I don’t claim 
it’s <em>perfect</em>; I’ve just weighed its benefits against its problems and concluded it’s the best fit for things I want to do.</p>

<p>And I have never met a PHP developer who can do the same with PHP.  
But I’ve bumped into plenty who are quick to apologize for anything and 
everything PHP does.  That mindset is terrifying.</p>

<h2>PHP</h2>

<h3>Core language</h3>

<p>CPAN has been called the “standard library of Perl”.  That doesn’t 
say much about Perl’s standard library, but it makes the point that a 
solid core can build great things.</p>

<h4>Philosophy</h4>

<ul><li><p>PHP was originally designed explicitly for non-programmers (and, 
reading between the lines, non-programs); it has not well escaped its 
roots.  A choice quote from the <a href="http://www.php.net/manual/phpfi2.php#overload">PHP 2.0 documentation</a>, regarding <code> </code> and friends doing type conversion:</p>

<blockquote><p>Once you start having separate operators for each type 
you start making the language much more complex. ie. you can’t use ‘==’ 
for stings [sic], you now would use ‘eq’. I don’t see the point, 
especially for something like PHP where most of the scripts will be 
rather simple and in most cases written by non-programmers who want a 
language with a basic logical syntax that doesn’t have too high a 
learning curve.</p></blockquote></li><li><p>PHP is built to keep chugging along at all costs.  When faced 
with either doing something nonsensical or aborting with an error, it 
will do something nonsensical.  Anything is better than nothing.</p></li><li>There’s no clear design philosophy.  Early PHP was inspired by Perl;
 the huge stdlib with “out” params is from C; the OO parts are designed 
like C   and Java.</li><li>PHP takes vast amounts of inspiration from other languages, yet still manages to be incomprehensible to anyone who <em>knows</em> those languages.  <code>(int)</code> looks like C, but <code>int</code> doesn’t exist.  Namespaces use <code>\\\\</code>.  The new array syntax results in <code>[key =&gt; value]</code>, unique among every language with hash literals.</li><li>Weak typing (i.e., silent automatic conversion between 
strings/numbers/et al) is so complex that whatever minor programmer 
effort is saved is by no means worth it.</li><li>Little new functionality is implemented as new syntax; most of it is
 done with functions or things that look like functions.  Except for 
class support, which deserved a slew of new operators and keywords.</li><li>Some of the problems listed on this page do have first-party 
solutions—if you’re willing to pay Zend for fixes to their open-source 
programming language.</li><li><p>There is a whole lot of action at a distance.  Consider this code, taken from the PHP docs somewhere.</p>

<pre><code>  @fopen('http://example.com/not-existing-file', 'r');
</code></pre>

<p>  What will it do?</p>

<ul><li>If PHP was compiled with <code>--disable-url-fopen-wrapper</code>, 
it won’t work.  (Docs don’t say what “won’t work” means; returns null, 
throws exception?)  Note that this flag was removed in PHP 5.2.5.</li><li>If <code>allow_url_fopen</code> is disabled in php.ini, this still won’t work.  (How?  No idea.)</li><li>Because of the <code>@</code>, the warning about the non-existent file won’t be printed.</li><li>But it will be printed if <code>scream.enabled</code> is set in php.ini.</li><li>Or if <code>scream.enabled</code> is set manually with <code>ini_set</code>.</li><li>But not if the right <code>error_reporting</code> level isn’t set.</li><li>If it <em>is</em> printed, exactly where it goes depends on <code>display_errors</code>, again in php.ini.  Or <code>ini_set</code>.</li></ul>


<p>  I can’t tell how this innocuous function call will behave without 
consulting compile-time flags, server-wide configuration, and 
configuration done in my program.  And this is all <em>built in</em> behavior.</p></li><li>The language is full of global and implicit state.  <code>mbstring</code> uses a global character set.  <code>func_get_arg</code>
 and friends look like regular functions, but operate on the 
currently-executing function.  Error/exception handling have global 
defaults.  <code>register_tick_function</code> sets a global function to run every tick—what?!</li><li>There is no threading support whatsoever.  (Not surprising, given the above.)  Combined with the lack of built-in <code>fork</code> (mentioned below), this makes parallel programming extremely difficult.</li><li>Parts of PHP are practically <em>designed</em> to produce buggy code.

<ul><li><code>json_decode</code> returns null for invalid input, even though null is also a perfectly valid object for JSON to decode to—this function is <em>completely unreliable</em> unless you also call <code>json_last_error</code> every time you use it.</li><li><code>array_search</code>, <code>strpos</code>, and similar functions return <code>0</code> if they find the needle at position zero, but false if they don’t find it at all.</li></ul>


<p>  Let me expand on that last part a bit.</p>

<p>  In C, functions like <code>strpos</code> return <code>-1</code> if 
the item isn’t found.  If you don’t check for that case and try to use 
that as an index, you’ll hit junk memory and your program will blow up. 
 (Probably.  It’s C.  Who the fuck knows.  I’m sure there are tools for 
this, at least.)</p>

<p>  In, say, Python, the equivalent <code>.index</code> methods will raise an exception if the item isn’t found.  If you don’t check for that case, your program will blow up.</p>

<p>  In PHP, these functions return false.  If you use <code>FALSE</code> as an index, or do much of anything with it except compare with <code>===</code>, PHP will silently convert it to <code>0</code> for you.  Your program will not blow up; it will, instead, do the <em>wrong thing</em> with <em>no warning</em>, unless you remember to include the right boilerplate around every place you use <code>strpos</code> and certain other functions.</p>

<p>  This is bad!  Programming languages are tools; they’re supposed to work <em>with</em>
 me.  Here, PHP has actively created a subtle trap for me to fall into, 
and I have to be vigilant even with such mundane things as string 
operations and equality comparison.  PHP is a <em>minefield</em>.</p></li></ul>


<p>I have heard a great many stories about the PHP interpreter and <a href="http://en.wikiquote.org/wiki/Rasmus_Lerdorf">its developers</a> from a great many places.  These are from people who have worked on the <a href="http://www.reddit.com/r/lolphp/comments/qeq7k/php_540_ships_with_82_failing_tests_in_the_suite/">PHP core</a>, <a href="http://perlbuzz.com/2008/09/optimizing-for-the-developer-not-the-user-php-misses-again.html">debugged PHP</a> core, interacted with core developers.  Not a single tale has been a compliment.</p>

<p>So I have to fit this in here, because it bears repeating: PHP is a 
community of amateurs.  Very few people designing it, working on it, or 
writing code in it seem to know what they’re doing.  (Oh, dear reader, <em>you</em> are of course a rare exception!)  Those who <em>do</em>
 grow a clue tend to drift away to other platforms, reducing the average
 competence of the whole.  This, right here, is the biggest problem with
 PHP: it is absolutely the blind leading the blind.</p>

<p>Okay, back to facts.</p>

<h4>Operators</h4>

<ul><li><code>==</code> is <a href="http://habnab.it/php-table.html">useless</a>.

<ul><li>It’s not transitive.  <code>"foo" == TRUE</code>, and <code>"foo" == 0</code>…  but, of course, <code>TRUE != 0</code>.</li><li><code>==</code> converts to numbers when possible, which means it 
converts to floats when possible.  So large hex strings (like, say, 
password hashes) may occasionally <a href="http://phpsadness.com/sad/47">compare true when they’re not</a>.</li><li>For the same reason, <code>"6" == " 6"</code>, <code>"4.2" == "4.20"</code>, and <code>"133" == "0133"</code>.  But note that <code>133 != 0133</code>, because <code>0133</code> is octal.</li><li><code>===</code> compares values and type…  except with objects, where <code>===</code> is only true if both operands are actually the same object!  For objects, <code>==</code> compares both value (of every attribute) and type, which is what <code>===</code> does for every other type.  <a href="http://developers.slashdot.org/comments.pl?sid=204433&cid=16703529">What.</a></li></ul>
</li><li>The comparison operators try to sort arrays, two different ways: first by length, then by <em>elements</em>.  If they have the <em>same number</em> of elements but <em>different</em> sets of keys, though, they are uncomparable.</li><li>Objects compare as greater than anything else…  except other objects, which they are neither less than nor greater than.</li><li>For a more type-safe <code>==</code>, we have <code>===</code>.  For a more type-safe <code>&lt;</code>, we have…  nothing.  <code>"123" &lt; "0124"</code>, always, no matter what you do.</li><li>Despite the craziness above, and the explicit rejection of Perl’s pairs of string and numeric operators, PHP does not overload <code> </code>.  <code> </code> is always addition, and <code>.</code> is always concatenation.</li><li>The <code>[]</code> indexing operator can also be spelled <code>{}</code>.</li><li><code>[]</code> can be used on any variable, not just strings and arrays.  It returns null and issues no warning.</li><li><code>[]</code> cannot slice; it only retrieves individual elements.</li><li><code>foo()[0]</code> is a syntax error.  (Fixed in PHP 5.4.)</li><li><p>Unlike (literally!) every other language with a similar operator, <code>?:</code> is <em>left</em> associative.  So this:</p>

<pre><code>  $arg = 'T';
  $vehicle = ( ( $arg == 'B' ) ? 'bus' :
               ( $arg == 'A' ) ? 'airplane' :
               ( $arg == 'T' ) ? 'train' :
               ( $arg == 'C' ) ? 'car' :
               ( $arg == 'H' ) ? 'horse' :
               'feet' );
  echo $vehicle;
</code></pre>

<p>  prints <code>horse</code>.</p></li></ul>


<h4>Variables</h4>

<ul><li>There is no way to declare a variable.  Variables that don’t exist are created with a null value when first used.</li><li>Global variables need a <code>global</code> declaration before they 
can be used.  This is a natural consequence of the above, so it would be
 perfectly reasonable, except that globals can’t even be <em>read</em> 
without an explicit declaration—PHP will quietly create a local with the
 same name, instead.  I’m not aware of another language with similar 
scoping issues.</li><li>There are no references.  What PHP calls references are really 
aliases; there’s nothing that’s a step back, like Perl’s references, and
 there’s no pass-by-object identity like in Python.</li><li>“Referenceness” infects a variable unlike anything else in the 
language.  PHP is dynamically-typed, so variables generally have no 
type…  except references, which adorn function definitions, variable 
syntax, and assignment.  Once a variable is made a reference (which can 
happen anywhere), it’s stuck as a reference.  There’s no obvious way to 
detect this and un-referencing requires nuking the variable entirely.</li><li>Okay, I lied.  There are ”<a href="http://www.php.net/manual/en/book.spl-types.php">SPL types</a>” which also infect variables: <code>$x = new SplBool(true); $x = "foo";</code> will fail.  This is like static typing, you see.</li><li>A reference can be taken to a key that doesn’t exist within an 
undefined variable (which becomes an array).  Using a non-existent array
 normally issues a notice, but this does not.</li><li>Constants are defined by a function call taking a string; before 
that, they don’t exist.  (This may actually be a copy of Perl’s <code>use constant</code> behavior.)</li><li>Variable names are case-sensitive.  Function and class names are 
not.  This includes method names, which makes camelCase a strange choice
 for naming.</li></ul>


<h4>Constructs</h4>

<ul><li><code>array()</code> and a few dozen similar constructs are not functions.  <code>array</code> on its own means nothing, <code>$func = "array"; $func();</code> doesn’t work.</li><li>Array unpacking can be done with the <code>list($a, $b) = ...</code> operation.  <code>list()</code> is function-like syntax just like <code>array</code>.  I don’t know why this wasn’t given real dedicated syntax, or why the name is so obviously confusing.</li><li><code>(int)</code> is obviously designed to look like C, but it’s a single token; there’s nothing called <code>int</code> in the language.  Try it: not only does <code>var_dump(int)</code> not work, it throws a parse error because the argument looks like the cast operator.</li><li><code>(integer)</code> is a synonym for <code>(int)</code>.  There’s also <code>(bool)</code>/<code>(boolean)</code> and <code>(float)</code>/<code>(double)</code>/<code>(real)</code>.</li><li>There’s an <code>(array)</code> operator for casting to array and an <code>(object)</code> for casting to object.  That sounds nuts, but there’s almost a use: you can use <code>(array)</code>
 to have a function argument that’s either a single item or a list, and 
treat it identically.  Except you can’t do that reliably, because if 
someone passes a single <em>object</em>, casting it to an array will 
actually produce an array containing that object’s attributes.  (Casting
 to object performs the reverse operation.)</li><li><code>include()</code> and friends are basically C’s <code>#include</code>: they dump another source file into yours.  There is no module system, even for PHP code.</li><li>There’s no such thing as a nested or locally-scoped function or 
class.  They’re only global.  Including a file dumps its variables into 
the current function’s scope (and gives the file access to your 
variables), but dumps functions and classes into global scope.</li><li>Appending to an array is done with <code>$foo[] = $bar</code>.</li><li><code>echo</code> is a statement-y kind of thing, not a function.</li><li><code>empty($var)</code> is so extremely not-a-function that anything but a variable, e.g. <code>empty($var || $var2)</code>, is a parse error.  Why on Earth does the parser need to know about <code>empty</code>?</li><li>There’s redundant syntax for blocks: <code>if (...): ... endif;</code>, etc.</li></ul>


<h4>Error handling</h4>

<ul><li>PHP’s one unique operator is <code>@</code> (actually borrowed from DOS), which <em>silences</em> errors.</li><li>PHP errors don’t provide stack traces.  You have to install a 
handler to generate them.  (But you can’t for fatal errors—see below.)</li><li>PHP parse errors generally just spew the parse state and nothing more, making a forgotten quote <a href="http://phpsadness.com/sad/44">terrible to debug</a>.</li><li>PHP’s parser refers to e.g. <code>::</code> internally as <code>T_PAAMAYIM_NEKUDOTAYIM</code>, and the <code>&lt;&lt;</code> operator as <code>T_SL</code>.  I say “internally”, but as above, this is what’s shown to the programmer when <code>::</code> or <code>&lt;&lt;</code> appears in the wrong place.</li><li>Most error handling is in the form of printing a line to a server log nobody reads and carrying on.</li><li><code>E_STRICT</code> is a thing, but it doesn’t seem to actually prevent much and there’s no documentation on what it actually does.</li><li><code>E_ALL</code> includes all error categories—except <code>E_STRICT</code>.</li><li><p>Weirdly inconsistent about what’s allowed and what isn’t.  I don’t know how <code>E_STRICT</code> applies here, but these things are okay:</p>

<ul><li>Trying to access a non-existent object property, i.e., <code>$foo-&gt;x</code>.  (warning)</li><li>Using a variable as a function name, or variable name, or class name.  (silent)</li><li>Trying to use an undefined constant.  (notice)</li><li>Trying to access a property of something that isn’t an object.  (notice)</li><li>Trying to use a variable name that doesn’t exist.  (notice)</li><li><code>2 &lt; "foo"</code>  (silent)</li><li><code>foreach (2 as $foo);</code>  (warning)</li></ul>


<p>  And these things are not:</p>

<ul><li>Trying to access a non-existent class constant, i.e., <code>$foo::x</code>.  (fatal error)</li><li>Using a constant string as a function name, or variable name, or class name.  (parse error)</li><li>Trying to call an undefined function.  (fatal error)</li><li>Leaving off a semicolon on the last statement in a block or file.  (parse error)</li><li>Using <code>list</code> and various other quasi-builtins as method names.  (parse error)</li><li>Subscripting the return value of a function, i.e., <code>foo()[0]</code>.  (parse error; okay in 5.4, see above)</li></ul>


<p>  There are a good few examples of other weird parse errors elsewhere in this list.</p></li><li>The <code>__toString</code> method can’t throw exceptions.  If you 
try, PHP will…  er, throw an exception.  (Actually a fatal error, which 
would be passable, except…)</li><li>PHP errors and PHP exceptions are completely different beasts.  They don’t seem to interact <em>at all</em>.

<ul><li>PHP errors (internal ones, and calls to <code>trigger_error</code>) cannot be caught with <code>try</code>/<code>catch</code>.</li><li>Likewise, exceptions do not trigger error handlers installed by <code>set_error_handler</code>.</li><li>Instead, there’s a separate <code>set_exception_handler</code> which handles uncaught exceptions, because wrapping your program’s entry point in a <code>try</code> block is impossible in the <code>mod_php</code> model.</li><li>Fatal errors (e.g., <code>new ClassDoesntExist()</code>) can’t be caught by anything.  A <em>lot</em>
 of fairly innocuous things throw fatal errors, forcibly ending your 
program for questionable reasons.  Shutdown functions still run, but 
they can’t get a stack trace (they run at top-level), and they can’t 
easily tell if the program exited due to an error or running to 
completion.</li></ul>
</li><li>There is no <code>finally</code> construct, making wrapper code (set
 handler, run code, unset handler; monkeypatch, run a test, 
unmonkeypatch) tedious and difficult to write.  Despite that OO and 
exceptions were largely copied from Java, this <a href="https://bugs.php.net/bug.php?id=32100">is deliberate</a>, because <code>finally</code> “doesn’t make much sense in the context of PHP”.  Huh?</li></ul>


<h4>Functions</h4>

<ul><li>Function calls are apparently rather <a href="http://www.phpwtf.org/php-function-calls-have-quite-some-overhead">expensive</a>.</li><li>Some built-in functions interact with reference-returning functions in, er, <a href="http://www.phpwtf.org/php-function-calls-returning-references">a strange way</a>.</li><li>As mentioned elsewhere, a lot of things that look like functions or look like they <em>should</em> be functions are actually language constructs, so nothing that works with functions will work with them.</li><li><p>Function arguments can have “type hints”, which are basically just static typing.  But you can’t require that an argument be an <code>int</code> or <code>string</code> or <code>object</code> or other “core” type, even though every builtin function uses this kind of typing, probably because <code>int</code> is not a thing in PHP.  (See above about <code>(int)</code>.)  You also can’t use the special <a href="http://www.php.net/manual/en/language.pseudo-types.php#language.types.mixed">pseudo-type decorations</a> used heavily by builtin functions: <code>mixed</code>, <code>number</code>, or <code>callback</code>.</p>

<ul><li><p>As a result, this:</p>

<pre><code>  function foo(string $s) {}

  foo("hello world");
</code></pre>

<p>  produces the error:</p>

<pre><code>  PHP Catchable fatal error:  Argument 1 passed to foo() must be an instance of string, string given, called in...
</code></pre></li><li>You may notice that the “type hint” given doesn’t actually have to exist; there is no <code>string</code> class in this program.  If you try to use <code>ReflectionParameter::getClass()</code> to examine the type hint dynamically, <em>then</em> it will balk that the class doesn’t exist, making it impossible to actually retrieve the class name.</li><li>A function’s return value can’t be hinted.</li></ul>
</li><li>Passing the current function’s arguments to another function (dispatch, not uncommon) is done by <code>call_user_func_array('other_function', func_get_args())</code>.  But <code>func_get_args</code> throws a fatal error at runtime, complaining that it can’t be a function parameter.  How and why is this even a <em>type</em> of error?  (Fixed in PHP 5.3.)</li><li>Closures require explicitly naming every variable to be closed-over.
  Why can’t the interpreter figure this out?  Kind of hamstrings the 
whole feature.  (Okay, it’s because using a variable ever, at all, 
creates it unless explicitly told otherwise.)</li><li>Closed-over variables are “passed” by the same semantics as other 
function arguments.  That is, arrays and strings etc. will be “passed” 
to the closure by value.  Unless you use <code>&</code>.</li><li>Because closed-over variables are effectively automatically-passed 
arguments and there are no nested scopes, a closure can’t refer to 
private methods, even if it’s defined inside a class.  (Possibly fixed 
in 5.4?  Unclear.)</li><li>No named arguments to functions.  Actually <a href="http://www.php.net/~derick/meeting-notes.html#named-parameters">explicitly rejected</a> by the devs because it “makes for messier code”.</li><li>Function arguments with defaults can appear before function 
arguments without, even though the documentation points out that this is
 both weird and useless.  (So why allow it?)</li><li>Extra arguments to a function are ignored (except with builtin 
functions, which raise an error).  Missing arguments are assumed null.</li><li>“Variadic” functions require faffing about with <code>func_num_args</code>, <code>func_get_arg</code>, and <code>func_get_args</code>.  There’s no syntax for such a thing.</li></ul>


<h4>OO</h4>

<ul><li>The functional parts of PHP are designed like C, but the objectional
 (ho ho) parts are designed like Java.  I cannot overemphasize how 
jarring this is.  I’ve yet to find a global function that even has a 
capital letter in its name, yet <a href="http://www.php.net/manual/en/class.reflectionfunction.php">important built-in classes</a> use camelCase method names and have <code>getFoo</code>
 Java-style accessors.  This is a dynamic language, right?  Perl, 
Python, and Ruby all have some concept of “property” access via code; 
PHP has only the clunky <code>__get</code> and friends.  The class system is designed around the <em>lower-level</em> Java language which is naturally and deliberately <em>more limited</em> than PHP’s contemporaries, and I am baffled.</li><li>Classes are not objects.  Any metaprogramming has to refer to them by string name, just like functions.</li><li>Built-in types are not objects and (unlike Perl) can in no way be made to look like objects.</li><li><code>instanceof</code> is an operator, despite that classes were a 
late addition and most of the language is built on functions and 
function-ish syntax.  Java influence?  Classes not first-class?  (I 
don’t know if they are.)

<ul><li>But there <em>is</em> an <code>is_a</code> function.  With an optional argument specifying whether to allow the object to actually be a string naming a class.</li><li><code>get_class</code> is a function; there’s no <code>typeof</code> operator.  Likewise <code>is_subclass_of</code>.</li><li>This doesn’t work on builtin types, though (again, <code>int</code> is not a thing).  For that, you need <code>is_int</code> etc.</li><li>Also the right-hand side has to be a variable or literal string; it can’t be an expression.  That causes…  a parse error.</li></ul>
</li><li><code>clone</code> is an operator?!</li><li>OO design is a weird mix of Java and Perl.</li><li>Object attributes are <code>$obj-&gt;foo</code>, but class attributes are <code>$obj::foo</code>.  I’m not aware of another language that does this or how it’s useful.</li><li>Also, an instance method can still be called statically (<code>Class::method()</code>).  If done so from another method, this is treated like a regular method call on the current <code>$this</code>.  I think.</li><li><code>new</code>, <code>private</code>, <code>public</code>, <code>protected</code>, <code>static</code>,
 etc.  Trying to win over Java developers?  I’m aware this is more 
personal taste, but I don’t know why this stuff is necessary in a 
dynamic language—in C   most of it’s about compilation and compile-time 
name resolution.</li><li>Subclasses cannot override private methods.  Subclass overrides of public methods can’t even <em>see</em>, let alone call, the superclass’s private methods.  Problematic for, say, test mocks.</li><li>Methods cannot be named e.g. “list”, because <code>list()</code> is 
special syntax (not a function) and the parser gets confused.  There’s 
no reason this should be ambiguous, and monkeypatching the class works 
fine.  (<code>$foo-&gt;list()</code> is not a syntax error.)</li><li>If an exception is thrown while evaluating a constructor’s arguments (e.g., <code>new Foo(bar())</code> and <code>bar()</code> throws), the constructor won’t be called, but the <em>destructor</em> will be.  (This is fixed in PHP 5.3.)</li><li>Exceptions in <code>__autoload</code> and destructors cause fatal errors.</li><li>There are no constructors or destructors.  <code>__construct</code> is an initializer, like Python’s <code>__init__</code>.  There is no method you can call on a class to allocate memory and create an object.</li><li>There is no default initializer.  Calling <code>parent::__construct()</code> if the superclass doesn’t define its own <code>__construct</code> is a fatal error.</li><li>OO brings with it an iterator interface that parts of the language (e.g., <code>for...as</code>)
 respect, but nothing built-in (like arrays) actually implements the 
interface.  If you want an array iterator, you have to wrap it in an <code>ArrayIterator</code>.  There are no built-in ways to chain or slice or otherwise work with iterators as first-class objects.</li><li>Classes can overload how they convert to strings and how they act 
when called, but not how they convert to numbers or any other builtin 
type.</li><li>Strings, numbers, and arrays all have a string conversion; the language relies heavily on this.  Functions and classes <em>are</em>
 strings.  Yet trying to convert a built-in or user-defined object (even
 a Closure) to a string causes an error if it doesn’t define <code>__toString</code>.  Even <code>echo</code> becomes potentially error-prone.</li><li>There is no overloading for equality or ordering.</li><li>Static variables inside instance methods are global; they share the same value across all instances of the class.</li></ul>


<h3>Standard library</h3>

<p>Perl is “some assembly required”.  Python is “batteries included”.  PHP is “kitchen sink, but it’s from Canada and <a href="http://mcguirehimself.com/?p=4146">both faucets are labeled C</a>”.</p>

<h4>General</h4>

<ul><li>There is no module system.  You can compile PHP extensions, but 
which ones are loaded is specified by php.ini, and your options are for 
an extension to exist (and inject its contents into your global 
namespace) or not.</li><li>As namespaces are a recent feature, the standard library isn’t 
broken up at all.  There are thousands of functions in the global 
namespace.</li><li>Chunks of the library are wildly inconsistent from one another.

<ul><li>Underscore versus not: <code>strpos</code>/<code>str_rot13</code>, <code>php_uname</code>/<code>phpversion</code>, <code>base64_encode</code>/<code>urlencode</code>, <code>gettype</code>/<code>get_class</code></li><li>“to” versus 2: <code>ascii2ebcdic</code>, <code>bin2hex</code>, <code>deg2rad</code>, <code>strtolower</code>, <code>strtotime</code></li><li>Object verb versus verb object: <code>base64_decode</code>, <code>str_shuffle</code>, <code>var_dump</code> versus <code>create_function</code>, <code>recode_string</code></li><li>Argument order: <code>array_filter($input, $callback)</code> versus <code>array_map($callback, $input)</code>, <code>strpos($haystack, $needle)</code> versus <code>array_search($needle, $haystack)</code></li><li>Prefix confusion: <code>usleep</code> versus <code>microtime</code></li><li>Case insensitive functions vary on where the <code>i</code> goes in the name.</li><li>About half the array functions actually start with <code>array_</code>.  The others do not.</li></ul>
</li><li>Kitchen sink.  The libary includes:

<ul><li>Bindings to ImageMagick, bindings to GraphicsMagick (which is a fork
 of ImageMagick), and a handful of functions for inspecting EXIF data 
(which ImageMagick can already do).</li><li>Functions for parsing bbcode, a very specific kind of markup used by a handful of particular forum packages.</li><li>Way too many XML packages.  <code>DOM</code> (OO), <code>DOM XML</code> (not), <code>libxml</code>, <code>SimpleXML</code>, “XML Parser”, <code>XMLReader</code>/<code>XMLWriter</code>,
 and half a dozen more acronyms I can’t identify.  There’s surely some 
kind of difference between these things and you are free to go figure 
out what that is.</li><li>Bindings for two particular credit card processors, SPPLUS and MCVE.  What?</li><li>Three ways to access a MySQL database: <code>mysql</code>, <code>mysqli</code>, and the <code>PDO</code> abstraction thing.</li></ul>
</li></ul>


<h4>C influence</h4>

<p>This deserves its own bullet point, because it’s so absurd yet 
permeates the language.  PHP is a high-level, dynamically-typed 
programming language.  Yet a massive portion of the standard library is 
still very thin wrappers around C APIs, with the following results:</p>

<ul><li>“Out” parameters, even though PHP can return ad-hoc hashes or multiple arguments with little effort.</li><li>At least a dozen functions for getting the last error from a 
particular subsystem (see below), even though PHP has had exceptions for
 eight years.</li><li>Warts like <code>mysql_real_escape_string</code>, even though it has the same arguments as the broken <code>mysql_escape_string</code>, just because it’s part of the MySQL C API.</li><li>Global behavior for non-global functionality (like MySQL).  Using 
multiple MySQL connections apparently requires passing a connection 
handle on every function call.</li><li>The wrappers are really, really, really thin.  For example, calling <code>dba_nextkey</code> without calling <code>dba_firstkey</code> will segfault.</li><li>There’s a set of <code>ctype_*</code> functions (e.g. <code>ctype_alnum</code>) that map to the C character-class detection functions of similar names, rather than, say, <code>isupper</code>.</li></ul>


<h4>Genericism</h4>

<p>There is none.  If a function might need to do two slightly different things, PHP just has two functions.</p>

<p>How do you sort backwards?  In Perl, you might do <code>sort { $b &lt;=&gt; $a }</code>.  In Python, you might do <code>.sort(reverse=True)</code>.  In PHP, there’s a separate function called <code>rsort()</code>.</p>

<ul><li>Functions that look up a C error: <code>curl_error</code>, <code>json_last_error</code>, <code>openssl_error_string</code>, <code>imap_errors</code>, <code>mysql_error</code>, <code>xml_get_error_code</code>, <code>bzerror</code>, <code>date_get_last_errors</code>, others?</li><li>Functions that sort: <code>array_multisort</code>, <code>arsort</code>, <code>asort</code>, <code>ksort</code>, <code>krsort</code>, <code>natsort</code>, <code>natcasesort</code>, <code>sort</code>, <code>rsort</code>, <code>uasort</code>, <code>uksort</code>, <code>usort</code></li><li>Functions that find text: <code>ereg</code>, <code>eregi</code>, <code>mb_ereg</code>, <code>mb_eregi</code>, <code>preg_match</code>, <code>strstr</code>, <code>strchr</code>, <code>stristr</code>, <code>strrchr</code>, <code>strpos</code>, <code>stripos</code>, <code>strrpos</code>, <code>strripos</code>, <code>mb_strpos</code>, <code>mb_strrpos</code>, plus the variations that do replacements</li><li>There are a lot of aliases as well, which certainly doesn’t help matters: <code>strstr</code>/<code>strchr</code>, <code>is_int</code>/<code>is_integer</code>/<code>is_long</code>, <code>is_float</code>/<code>is_double</code>, <code>pos</code>/<code>current</code>, <code>sizeof</code>/<code>count</code>, <code>chop</code>/<code>rtrim</code>, <code>implode</code>/<code>join</code>, <code>die</code>/<code>exit</code>, <code>trigger_error</code>/<code>user_error</code>…</li><li><code>scandir</code> returns a list of files within a given 
directory.  Rather than (potentially usefully) return them in directory 
order, the function returns the files already sorted.  And there’s an 
optional argument to get them in <em>reverse</em> alphabetical order.  There were not, apparently, enough sort functions.</li><li><code>str_split</code> breaks a string into chunks of equal length.  <code>chunk_split</code> breaks a string into chunks of equal length, then joins them together with a delimiter.</li><li>Reading archives requires a separate set of functions depending on 
the format.  There are six separate groups of such functions, all with 
different APIs, for bzip2, LZF, phar, rar, zip, and gzip/zlib.</li><li>Because calling a function with an array as its arguments is so awkward (<code>call_user_func_array</code>), there are some pairings like <code>printf</code>/<code>vprintf</code> and <code>sprintf</code>/<code>vsprintf</code>.  These do the same things, but one function takes arguments and the other takes an array of arguments.</li></ul>


<h4>Text</h4>

<ul><li><code>preg_replace</code> with the <code>/e</code> (eval) flag will do a string replace of the matches into the replacement string, <em>then eval it</em>.</li><li><code>strtok</code> is apparently designed after the equivalent C 
function, which is already a bad idea for various reasons.  Nevermind 
that PHP can easily return an array (whereas this is awkward in C), or 
that the very hack <code>strtok(3)</code> uses (modifying the string in-place) isn’t used here.</li><li><code>parse_str</code> parses a <em>query</em> string, with no indication of this in the name.  Also it acts just like <code>register_globals</code>
 and dumps the query into your local scope as variables, unless you pass
 it an array to populate.  (It returns nothing, of course.)</li><li><code>explode</code> refuses to split with an empty delimiter.  
Every other string split implementation anywhere takes this to mean the 
string should be split into characters; PHP instead has a totally 
separate function, confusingly called <code>str_split</code> and described as “converting a string to an array”.</li><li>For formatting dates, there’s <code>strftime</code>, which acts like the C API and respects locale.  There’s also <code>date</code>, which has a completely different syntax and only works with English.</li><li>“<a href="http://php.net/manual/en/function.gzgetss.php"><code>gzgetss</code></a>
 — Get line from gz-file pointer and strip HTML tags.”  I’m dying to 
know the series of circumstances that led to this function’s conception.</li><li><code>mbstring</code>

<ul><li>It’s all about “multi-byte”, when the problem is character sets.</li><li>Still operates on regular strings.  Has a single global “default” 
character set.  Some functions allow specifying charset, but then it 
applies to all arguments and the return value.</li><li>Provides <code>ereg_*</code> functions, but those are deprecated.  <code>preg_*</code> are out of luck, though they can understand UTF-8 by feeding them some PCRE-specific flag.</li></ul>
</li></ul>


<h4>System and reflection</h4>

<ul><li>There are, in general, a whole lot of functions that blur the line between text and variables.  <code>compact</code> and <code>extract</code> are just the tip of the iceberg.</li><li>There are several ways to actually be dynamic in PHP, and at a glance there are no obvious differences or relative benefits.  <code>classkit</code> can modify user-defined classes; <code>runkit</code> supersedes it and can modify user-defined anything; the <code>Reflection*</code>
 classes can reflect on most parts of the language; there are a great 
many individual functions for reporting properties of functions and 
classes.  Are these subsystems independent, related, redundant?</li><li><code>get_class($obj)</code> returns the object’s class name.  <code>get_class()</code>
 returns the name of the class the function is being called in.  Setting
 aside that this one function does two radically different things: <code>get_class(null)</code>…  acts like the latter.  So you can’t trust it on an arbitrary value.  Surprise!</li><li>The <code>stream_*</code> classes allow for implementing custom stream objects for use with <code>fopen</code> and other fileish builtins.  “tell” cannot be implemented for <a href="https://bugs.php.net/bug.php?id=30157">internal reasons</a>.  (Also there are <a href="http://www.php.net/manual/en/book.stream.php">A LOT</a> of functions involved with this system.)</li><li><code>register_tick_function</code> will accept a closure object.  <code>unregister_tick_function</code> will not; instead it throws an error complaining that the closure couldn’t be converted to a string.</li><li><code>php_uname</code> tells you about the current OS.  Unless PHP can’t tell what it’s running on; then it tells you about the OS it was <em>built</em> on.  It doesn’t tell you if this has happened.</li><li><code>fork</code> and <code>exec</code> are not built in.  They come with the pcntl extension, but that isn’t included by default.  <code>popen</code> doesn’t provide a pid.</li><li><code>session_decode</code> is for reading an arbitrary PHP session 
string, but it only works if there’s an active session already.  And it 
dumps the result into <code>$_SESSION</code>, rather than returning it.</li></ul>


<h4>Miscellany</h4>

<ul><li><code>curl_multi_exec</code> doesn’t change <code>curl_errno</code> on error, but it does change <code>curl_error</code>.</li><li><code>mktime</code>’s arguments are, in order: hour, minute, second, month, day, year.</li></ul>


<h3>Data manipulation</h3>

<p>Programs are nothing more than big machines that chew up data and spit out more data.  A great many languages are designed <em>around</em> the kinds of data they manipulate, from awk to Prolog to C.  If a language can’t handle data, it can’t do anything.</p>

<h4>Numbers</h4>

<ul><li>Integers are signed and 32-bit on 32-bit platforms.  Unlike all of 
PHP’s contemporaries, there is no automatic bigint promotion.  So your 
math might work differently based on <em>CPU architecture</em>.  Your only option for larger integers is to use the GMP or BC wrapper functions.  (The developers have proposed <a href="http://www.php.net/~derick/meeting-notes.html#add-a-64bit-integer">adding a new, separate, 64-bit type</a>.  This is crazy.)</li><li>PHP supports octal syntax with a leading <code>0</code>, so e.g. <code>012</code> will be the number ten.  However, <code>08</code> becomes the number zero.  The <code>8</code> (or <code>9</code>) and any following digits disappear.  <code>01c</code> is a syntax error.</li><li><code>pi</code> is a function.  Or there’s a constant, <code>M_PI</code>.</li><li>There is <a href="https://bugs.php.net/bug.php?id=13756">no exponentiation operator</a>, only the <code>pow</code> function.</li></ul>


<h4>Text</h4>

<ul><li>No Unicode support.  Only ASCII will work reliably, really.  There’s the <code>mbstring</code> extension, mentioned above, but it kinda blows.</li><li>Which means that using the builtin string functions on UTF-8 text risks corrupting it.</li><li>Similarly, there’s no concept of e.g. case comparisons outside of 
ASCII.  Despite the proliferation of case-insensitive versions of 
functions, not one of them will consider <code>é</code> equal to <code>É</code>.</li><li>You can’t quote keys in variable interpolation, i.e., <code>"$foo['key']"</code> is a syntax error.  You can unquote it (which <em>would</em> generate a warning anywhere else!), or use <code>${...}</code>/<code>{$...}</code>.</li><li><code>"${foo[0]}"</code> is okay.  <code>"${foo[0][0]}"</code> is a syntax error.  Putting the <code>$</code> on the inside is fine with both.  Bad copy of similar Perl syntax (with radically different semantics)?</li></ul>


<h4>Arrays</h4>

<p>Oh, man.</p>

<ul><li>This one datatype acts as a list, ordered hash, ordered set, sparse 
list, and occasionally some strange combination of those.  How does it 
perform?  What kind of memory use will there be?  Who knows?  Not like I
 have other options, anyway.</li><li><code>=&gt;</code> isn’t an operator.  It’s a special construct that only exists inside <code>array(...)</code> and the <code>foreach</code> construct.</li><li>Negative indexing doesn’t work, since <code>-1</code> is just as valid a key as <code>0</code>.</li><li>Despite that this is the language’s only data structure, there is no shortcut syntax for it; <code>array(...)</code> <em>is</em> shortcut syntax.  (PHP 5.4 is bringing “literals”, <code>[...]</code>.)</li><li>The <code>=&gt;</code> construct is based on Perl, which allows <code>foo =&gt; 1</code>
 without quoting.  (That is, in fact, why it exists in Perl; otherwise 
it’s just a comma.)  In PHP, you can’t do this without getting a 
warning; it’s the only language in its niche that has no vetted way to 
create a hash without quoting string keys.</li><li><p>Array functions often have confusing or inconsistent behavior 
because they have to operate on lists, hashes, or maybe a combination of
 the two.  Consider <code>array_diff</code>, which “computers the difference of arrays”.</p>

<pre><code>  $first  = array("foo" =&gt; 123, "bar" =&gt; 456);
  $second = array("foo" =&gt; 456, "bar" =&gt; 123);
  echo var_dump(array_diff($first, $second));
</code></pre>

<p>  What will this code do?  If <code>array_diff</code> treats its 
arguments as hashes, then obviously these are different; the same keys 
have different values.  If it treats them as lists, then they’re still 
different; the values are in the wrong order.</p>

<p>  In fact <code>array_diff</code> considers these equal, because it treats them like <em>sets</em>: it compares only values, and ignores order.</p></li><li>In a similar vein, <code>array_rand</code> has the strange behavior of selecting random <em>keys</em>, which is not that helpful for the most common case of needing to pick from a list of choices.</li><li><p>Despite how heavily PHP code relies on preserving key order:</p>

<pre><code>  array("foo", "bar") != array("bar", "foo")
  array("foo" =&gt; 1, "bar" =&gt; 2) == array("bar" =&gt; 2, "foo" =&gt; 1)
</code></pre>

<p>  I leave it to the reader to figure out what happens if the arrays are mixed.  (I don’t know.)</p></li><li><code>array_fill</code> cannot create zero-length arrays; instead it will issue a warning and return false.</li><li>All of the (many…) sort functions operate in-place and return 
nothing.  There is no way to create a new sorted copy; you have to copy 
the array yourself, then sort it, then use the array.</li><li>But <code>array_reverse</code> returns a new array.</li><li>A list of ordered things and some mapping of keys to values sounds 
kind of like a great way to handle function arguments, but no.</li></ul>


<h4>Not arrays</h4>

<ul><li>The standard library includes “Quickhash”, an OO implementation of 
“specific strongly-typed classes” for implementing hashes.  And, indeed,
 there are four classes, each dealing with a different combination of 
key and value types.  It’s unclear why the builtin array implementation 
can’t optimize for these extremely common cases, or what the relative 
performance is.</li><li>There’s an <code>ArrayObject</code> class (which implements <em>five</em>
 different interfaces) that can wrap an array and have it act like an 
object.  User classes can implement the same interfaces.  But it only 
has a handful of methods, half of which don’t resemble built-in array 
functions, and built-in array functions don’t know how to operate on an <code>ArrayObject</code> or other array-like class.</li></ul>


<h4>Functions</h4>

<ul><li>Functions are not data.  Closures are actually objects, but regular 
functions are not.  You can’t even refer to them with their bare names; <code>var_dump(strstr)</code> issues a warning and assumes you mean the literal string, <code>"strstr"</code>.  There is no way to discern between an arbitrary string and a function “reference”.</li><li><code>create_function</code> is basically a wrapper around <code>eval</code>.
  It creates a function with a regular name and installs it globally (so
 it will never be garbage collected—don’t use in a loop!).  It doesn’t 
actually know anything about the current scope, so it’s not a closure.  
The name contains a NUL byte so it can never conflict with a regular 
function (because PHP’s parser fails if there’s a <code>NUL</code> in a file anywhere).</li><li>Declaring a function named <code>__lambda_func</code> will break <code>create_function</code>—the <em>actual</em> implementation is to <code>eval</code>-create the function named <code>__lambda_func</code>, then internally rename it to the broken name.  If <code>__lambda_func</code> already exists, the first part will throw a fatal error.</li></ul>


<h4>Other</h4>

<ul><li>Incrementing (<code>  </code>) a <code>NULL</code> produces <code>1</code>.  Decrementing (<code>--</code>) a <code>NULL</code> produces <code>NULL</code>.  Decrementing a string likewise leaves it unchanged.</li><li>There are no generators.</li></ul>


<h3>Web framework</h3>

<h4>Execution</h4>

<ul><li>A single shared file, <code>php.ini</code>, controls <em>massive</em>
 parts of PHP’s functionality and introduces complex rules regarding 
what overrides what and when.  PHP software that expects to be deployed 
on arbitrary machines has to override settings anyway to normalize its 
environment, which largely defeats the use of a mechanism like <code>php.ini</code> anyway.</li><li><p>PHP basically runs as CGI.  Every time a page is hit, PHP 
recompiles the whole thing before executing it.  Even dev servers for 
Python toy frameworks don’t act like this.</p>

<p>  This has led to a whole market of “PHP accelerators” that just 
compile once, accelerating PHP all the way to any other language.  Zend,
 the company behind PHP, has made this part of their <a href="http://www.zend.com/products/server/">business model</a>.</p></li><li>For quite a long time, PHP errors went to the client by default—I 
guess to help during development.  I don’t think this is true any more, 
but I still see the occasional mysql error spew at the top of a page.</li><li>PHP is full of strange “easter eggs” like <a href="http://phpsadness.com/sad/11">producing the PHP logo with the right query argument</a>.  Not only is this completely irrelevant to building <em>your</em>
 application, but it allows detecting whether you’re using PHP (and 
perhaps roughly guessing what version), regardless of how much <code>mod_rewrite</code>, FastCGI, reverse proxying, or <code>Server:</code> configuration you’re doing.</li><li>Whitespace outside the <code>&lt;?php ... ?&gt;</code> tags, even in
 libraries, counts as literal text and is interpolated into the response
 (or causes “headers already sent” errors).  A popular fix is to leave 
off the <code>?&gt;</code> closing token; PHP won’t complain, and there won’t be a trailing literal newline.</li></ul>


<h4>Deployment</h4>

<p>Deployment is often cited as the biggest advantage of PHP: drop some 
files and you’re done.  Indeed, that’s much easier than running a whole 
process as you may have to do with Python or Ruby or Perl.  But PHP 
leaves plenty to be desired.</p>

<p>Across the board, I’m in favor of running Web applications as app 
servers and reverse-proxying to them.  It takes minimal effort to set 
this up, and the benefits are plenty: you can manage your web server and
 app separately, you can run as many or few app processes on as many 
machines as you want without needing more web servers, you can run the 
app as a different user with zero effort, you can switch web servers, 
you can take down the app without touching the web server, you can do 
seamless deployment by just switching where a fifo points, etc.  Welding
 your application to your web server is absurd and there’s no good 
reason to do it any more.</p>

<ul><li>PHP is naturally tied to Apache.  Running it separately, or with any
 other webserver, requires just as much mucking around (possibly more) 
as deploying any other language.</li><li><code>php.ini</code> applies to every PHP application run anywhere.  There is only one <code>php.ini</code>
 file, and it applies globally; if you’re on a shared server and need to
 change it, or if you run two applications that need different settings,
 you’re out of luck; you have to apply the union of all necessary 
settings and pare them down from inside the apps themselves using <code>ini_set</code> or in Apache’s configuration file or in <code>.htaccess</code>.  If you can.  Also wow that is a lot of places you need to check to figure out how a setting is getting its value.</li><li>Similarly, there is no easy way to “insulate” a PHP application and 
its dependencies from the rest of a system.  Running two applications 
that require different versions of a library, or even PHP itself?  Start
 by building a second copy of Apache.</li><li>The “bunch of files” approach, besides making routing a huge pain in
 the ass, also means you have to carefully whitelist or blacklist what 
stuff is actually available, because your URL hierarchy is also your 
entire code tree.  Configuration files and other “partials” need C-like 
guards to prevent them from being loaded directly.  Version control 
noise (e.g., <code>.svn</code>) needs protecting.  With <code>mod_php</code>, <em>everything</em>
 on your filesystem is a potential entry point; with an app server, 
there’s only one entry point, and only the URL controls whether it’s 
invoked.</li><li>You can’t seamlessly upgrade a bunch of files that run CGI-style, 
unless you want crashes and undefined behavior as users hit your site 
halfway through the upgrade.</li><li><p>Despite how “simple” it is to configure Apache to run PHP, there 
are some subtle traps even there.  While the PHP docs suggest using <code>SetHandler</code> to make <code>.php</code> files run as PHP, <code>AddHandler</code> appears to work just as well, and in fact Google gives me twice as many results for it.  Here’s the problem.</p>

<p>  When you use <code>AddHandler</code>, you are telling Apache that “execute this as php” is <em>one possible</em> way to handle <code>.php</code> files.  <strong>But</strong>!
  Apache doesn’t have the same idea of file extensions that every human 
being on the planet does.  It’s designed to support, say, <code>index.html.en</code> being recognized as both English and HTML.  To Apache, a file can have <em>any number</em> of file extensions simultaneously.</p>

<p>  Imagine you have a file upload form that dumps files into some 
public directory.  To make sure nobody uploads PHP files, you just check
 that they don’t have a <code>.php</code> extension.  All an attacker has to do is upload a file named <code>foo.php.txt</code>; your uploader won’t see a problem, but Apache <em>will</em> recognize it as PHP, and it will happily execute.</p>

<p>  The problem here isn’t “using the original filename” or “not 
validating better”; the problem is that your web server is configured to
 run any old code it runs across—precisely the same property that makes 
PHP “easy to deploy”.  CGI required <code> x</code>, which was <em>something</em>, but PHP doesn’t even do that.  And this is no theoretical problem; I’ve found multiple live sites with this issue.</p></li></ul>


<h4>Missing features</h4>

<p>I consider all of these to be varying levels of critical for building
 a Web application.  It seems reasonable that PHP, with its major 
selling point being that it’s a “Web language”, ought to have some of 
them.</p>

<ul><li>No template system.  There’s PHP itself, but nothing that acts as a big interpolator rather than a program.</li><li>No XSS filter.  No, “remember to use <code>htmlspecialchars</code>” is not an XSS filter.  <a href="http://pypi.python.org/pypi/MarkupSafe">This is.</a></li><li>No CSRF protection.  You get to do it yourself.</li><li>No generic standard database API.  Stuff like PDO has to wrap every individual database’s API to abstract the differences away.</li><li>No routing.  Your website looks exactly like your filesystem.  Many developers have been tricked into thinking <code>mod_rewrite</code> (and <code>.htaccess</code> in general) is an acceptable substitute.</li><li>No authentication or authorization.</li><li>No dev server.</li><li>No interactive debugging.</li><li>No coherent deployment mechanism; only “copy all these files to the server”.</li></ul>


<h3>Security</h3>

<h4>Language boundaries</h4>

<p>PHP’s poor security reputation is largely because it will take 
arbitrary data from one language and dump it into another.  This is a 
bad idea.  <code>"&lt;script&gt;"</code> may not mean anything in SQL, but it sure does in HTML.</p>

<p>Making this worse is the common cry for “sanitizing your inputs”.  That’s completely <em>wrong</em>;
 you can’t wave a magic wand to make a chunk of data inherently “clean”.
  What you need to do is speak the language: use placeholders with SQL, 
use argument lists when spawning processes, etc.</p>

<ul><li>PHP outright <em>encourages</em> “sanitizing”: there’s an entire <a href="http://www.php.net/manual/en/book.filter.php">data filtering extension</a> for doing it.</li><li>All the <code>addslashes</code>, <code>stripslashes</code>, and other slashes-related nonsense are red herrings that don’t help anything.</li><li>There is, as far as I can tell, no way to safely spawn a process.  
You can ONLY execute a string via the shell.  Your options are to escape
 like crazy and hope the default shell uses the right escaping, or <code>pcntl_fork</code> and <code>pcntl_exec</code> <em>manually</em>.</li><li>Both <code>escapeshellcmd</code> and <code>escapeshellarg</code> exist with roughly similar descriptions.  Note that on Windows, <code>escapeshellarg</code> does not work (because it assumes Bourne shell semantics), and <code>escapeshellcmd</code>
 just replaces a bunch of punctuation with spaces because nobody can 
figure out Windows cmd escaping (which may silently wreck whatever 
you’re trying to do).</li><li>The original built-in MySQL bindings, still widely-used, have no way to create prepared statements.</li></ul>


<p>To this day, the <a href="http://www.php.net/manual/en/security.database.sql-injection.php">PHP documentation on SQL injection</a> recommends batty practices like type-checking, using <code>sprintf</code> and <code>is_numeric</code>, manually using <code>mysql_real_escape_string</code> everywhere, or manually using <code>addslashes</code>
 everywhere (which “may be useful”!).  There is no mention of PDO or 
paramaterization, except in the user comments.  I complained about this 
very specifically <em>to a PHP dev</em> at least two years ago, he was alarmed, and the page has never changed.</p>

<h4>Insecure-by-default</h4>

<ul><li><code>register_globals</code>.  It’s been off by default for a while by now, and it’s gone in 5.4.  I don’t care.  This is an <em>embarrassment</em>.</li><li><code>include</code> accepting HTTP URLs.  Likewise.</li><li>Magic quotes.  So close to secure-by-default, and yet so far from understanding the concept at all.</li></ul>


<h4>Core</h4>

<p>The PHP interpreter itself has had some <em>fascinating</em> security problems.</p>

<ul><li>In 2007 the interpreter had an integer overflow vulnerability.  The fix started with <code>if (size &gt; INT_MAX) return NULL;</code> and went <a href="http://use.perl.org/use.perl.org/_Aristotle/journal/33448.html">downhill from there</a>.  (For those not down with the C: <code>INT_MAX</code> is the biggest integer that will fit in a variable, ever.  I hope you can figure out the rest from there.)</li><li>More recently, PHP 5.3.7 managed to include a <code>crypt()</code> function that would, in effect, <a href="https://bugs.php.net/bug.php?id=55439">let anyone log in with any password</a>.</li><li>PHP 5.4 is vulnerable to a denial of service, because it takes the <code>Content-Length</code> header (which anyone can set to anything) and tries to allocate that much memory.  <a href="http://www.exploit-db.com/exploits/18665/">This is a bad idea.</a></li></ul>


<p>I could dig up more but the point isn’t that there are X many exploits—software has bugs, it happens, whatever.  The <em>nature</em> of these is horrifying.  And I didn’t seek these out; they just happened to land on my doorstep in the last few months.</p>

<h3>Conclusion</h3>

<p>Some commentary has rightfully pointed out that I don’t have a 
conclusion.  And, well, I don’t have a conclusion.  If you got all the 
way down here, I assumed you agreed with me before you started  :)</p>

<p>If you only know PHP and you’re curious to learn something else, give the <a href="http://docs.python.org/tutorial/">Python tutorial</a> a whirl and try <a href="http://flask.pocoo.org/">Flask</a>
 for the web stuff.  (I’m not a huge fan of its template language, but 
it does the job.)  It breaks apart the pieces of your app, but they’re 
still the same pieces and should look familiar enough.  I might write a 
real post about this later; a whirlwind introduction to an entire 
language and web stack doesn’t belong down here.</p>

<p>Later or for bigger projects you may want <a href="http://www.pylonsproject.org/">Pyramid</a>, which is medium-level, or <a href="https://www.djangoproject.com/">Django</a>, which is a complex monstrosity that works well for building sites like Django’s.</p>

<p>If you’re not a developer at all but still read this for some reason,
 I will not be happy until everyone on the planet has gone through <a href="http://learnpythonthehardway.org/">Learn Python The Hard Way</a> so go do that.</p>

<p>There’s also Ruby with Rails and some competitors I’ve never used, 
and Perl is still alive and kicking with Catalyst.  Read things, learn 
things, build things, go nuts.</p>

<h3>Credits</h3>

<p>Thanks to the following for inspiration:</p>

<ul><li><a href="http://alokmenghrajani.github.com/wtf/php.html">PHP turtles</a></li><li><a href="http://phpsadness.com/">PHP sadness</a></li><li><a href="http://www.phpwtf.org/">PHP WTF</a></li><li><a href="http://wiki.theory.org/YourLanguageSucks#PHP_sucks_because:">YourLanguageSucks</a></li><li><a href="http://tnx.nl/php.html">PHP in contrast to Perl</a></li><li><a href="http://two-pi-r.livejournal.com/622760.html">Pi’s dense, angry, inspirational rant</a></li><li><a href="http://tracks.ranea.org/post/13908062333/php-is-not-an-acceptable-cobol">PHP is not an acceptable COBOL</a></li><li><a href="http://www.php.net/manual/en/index.php">the PHP documentation</a></li><li>a ton of PHP fanatics and PHP counter-fanatics</li><li>and, of course, Rasmus Lerdorf for his wild misunderstanding of most of Perl</li></ul>


<p>Let me know if you have any additions, or if I’m (factually!) wrong about something.</p>
</div>



<span class="byline author vcard">Posted by <span class="fn">Eevee</span></span>

      








  


<time datetime="2012-04-09T19:29:00-07:00" pubdate="" data-updated="true">Apr 9<span>th</span>, 2012</time>
      

<span class="categories">
  
  - http://me.veekun.com/blog/categories/php/
  - http://me.veekun.com/blog/categories/programming/ 
  
</span>

