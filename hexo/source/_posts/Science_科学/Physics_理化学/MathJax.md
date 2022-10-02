---
title: MathJax (LaTeX)
tags:
  - Blog
  - Hexo
  - MathJax
  - Science
categories:
  - Science_科学
  - Physics_理化学
toc: true
tocOpen: true
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
indexing: true
display_tag_onHome: true
swiper: false
recommendedSection: false
donate: false
geolocation: Japan
mathjax: true
date: 2021-05-29 20:45:12
img: /2021/0529/Science_科学/Physics_理化学/MathJax/MathJax.svg.png
---

## HEXO Plugins
 I'm slowly starting to understand how this software works. I have also been looking around at the available plugins for it and found this interesting one called _hexo-filter-mathjax_. It provides rendering of math equations. Unlike the Katex.js library, this is all rendered on my local machine before I push it to GitHub. That means I don't need to worry about a failed JS library on a visitor's device. And, it means my site loads faster as it's one less JS library to download. Below I wrote a few tests. 

 My interest in having this feature is to support some of the scientific articles I would post on rare occasions. 
 More information on how to write these beautiful equations can be found here:
 - https://www.latex-project.org/help/documentation/#typesetting-complex-mathematics
 - https://www.learnlatex.org/en/

## MathJax (Server-side LaTeX) render
 https://github.com/next-theme/hexo-filter-mathjax

 E(kWh) = P(W) × t(hr) / 1000
{% codeblock lang:LaTeX line_number:true highlight:true wrap:false %}
$$
E_{(kWh)} 
=(\frac{P_{W}t_{hr}}{1000})
$$
{% endcodeblock %}
$$
E_{(kWh)} 
=(\frac{P_{W}t_{hr}}{1000})
$$


```LaTeX
\begin{eqnarray\*}
\nabla\cdot\vec{E}&=&\frac{\rho}{\epsilon_0}\\\\
\nabla\cdot\vec{B}&=&0\\\\
\nabla\times\vec{E}&=&-\frac{\partial B}{\partial t}\\\\
\nabla\times\vec{B}&=&\mu_0\left(\vec{J}+\epsilon_0
\frac{\partial E}{\partial t}\right)\\\\
\end{eqnarray\*}
```
\begin{eqnarray\*}
\nabla\cdot\vec{E}&=&\frac{\rho}{\epsilon_0}\\\\
\nabla\cdot\vec{B}&=&0\\\\
\nabla\times\vec{E}&=&-\frac{\partial B}{\partial t}\\\\
\nabla\times\vec{B}&=&\mu_0\left(\vec{J}+\epsilon_0\frac{\partial E}{\partial t}\right)\\\\
\end{eqnarray\*}

```LaTeX
$$
i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^2}{2m}\nabla^2\psi+V\psi
$$
```
$$
i\hbar\frac{\partial}{\partial t}\psi=-\frac{\hbar^2}{2m}\nabla^2\psi+V\psi
$$