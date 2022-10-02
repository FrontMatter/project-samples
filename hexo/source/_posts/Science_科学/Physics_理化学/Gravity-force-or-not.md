---
title: Gravity - force or not?
sticky: 999
comments: true
lang: en
draft: published
type: HEXO/post
sitemap: true
toc: true
tocOpen: true
indexing: true
display_tag_onHome: true
swiper: false
recommendedSection: false
donate: false
geolocation: Japan
copyright: true
mathjax: true
share: true
excerpt: >-
  The General Theory of Relativity tells us gravity is not a force,
  gravitational fields don't exist. Objects tend to move on straight paths
  through curved spacetime.
tags:
  - YouTube
  - Veritasium
  - MathJax
  - Science
categories:
  - Science_科学
  - Physics_理化学
img: /2021/0607/Science_科学/Physics_理化学/Gravity-force-or-not/AdobeStock_330287153.jpeg
openGraph_img: /2021/0607/Science_科学/Physics_理化学/Gravity-force-or-not/AdobeStock_330287153.jpeg
date: 2021-06-07 01:30:00
---
## Gravity is an allusion?
The General Theory of Relativity tells us gravity is not a force, gravitational fields don't exist. Objects tend to move on straight paths through curved spacetime.

{% wikipedia title:Theory_of_relativity wikiButton:true lang:en sentences:3 %}

### "Fun" math
{% wikipedia title:Einstein_field_equations wikiButton:true lang:en sentences:2 %}

{% tabs tab-id %}

<!-- tab Einstein field equations -->
<!-- https://www.onemathematicalcat.org/MathJaxDocumentation/TeXSyntax.htm -->
$$
R_{\mu \nu} - {1 \over 2}g_{\mu \nu}\,R + g_{\mu \nu} \Lambda = 
 {8 \pi G \over c^4} T_{\mu \nu}\text{, where R is the Ricci scalar}\\
$$

<!-- endtab -->

<!-- tab general relativity -->

<!-- https://johanw.home.xs4all.nl/contents.html -->
<!-- https://johanw.home.xs4all.nl/physics_html/03-Relativity.html#3.2 -->
The basic principles of general relativity are:

● The geodesic postulate: free falling particles move along geodesics of space-time with the proper time $\tau$ or arc length $s$ as parameter. For particles with zero rest mass (photons), the use of a free parameter is required because for them holds $ds=0$. From $\delta\int ds=0$ the equations of motion can be derived:
$$
\frac{d^2x^\alpha}{ds^2}+\Gamma_{\beta\gamma}^{\alpha}\frac{dx^\beta}{ds}\frac{dx^\gamma}{ds}=0
$$
● The _principle of equivalence_: inertial mass $\equiv$ gravitational mass $\Rightarrow$ gravitation is equivalent with a curved space-time were particles move along geodesics.
● By a proper choice of the coordinate system, it is possible to make the metric locally flat in each point $x_i$:
$$
g_{\alpha\beta}(x_i)=\eta_{\alpha\beta}:=diag(-1,1,1,1)
$$
<!-- endtab -->

<!-- tab Riemann tensor -->

 The _[Riemann tensor](https://johanw.home.xs4all.nl/physics.tex)_ is defined as: $R^\mu_{\nu\alpha\beta}T^\nu:=\nabla_\alpha\nabla_\beta T^\mu-\nabla_\beta\nabla_\alpha T^\mu$, where the covariant derivative is given by $\nabla_j a^i=\partial_ja^i+\Gamma_{jk}^ia^k$ and $\nabla_j a_i=\partial_ja_i-\Gamma_{ij}^ka_k$6 . 

 Here, $$ \Gamma_{jk}^i=\frac{g^{il}}{2}\left(\frac{\partial g_{lj}}{\partial x^k}+\frac{\partial g_{lk}}{\partial x^j}-\frac{\partial g_{_jk}}{\partial x^l}\right) $$, for Euclidean spaces this reduces to:  
 
 ```LaTeX
 $$\Gamma^i = {\frac{\partial^{2\bar{x}^l}} {\partial x^j\partial x^k}} {{x^i} {\bar{x}^l}}$$
``` 
  , are the _Christoffel symbols_.
 For a second-order tensor holds: 
 $[\nabla_\alpha,\nabla_\beta]T_\nu^\mu=R_{\sigma\alpha\beta}^\mu T^\sigma_\nu+R^\sigma_{\nu\alpha\beta}T^\mu_\sigma$, 
 $\nabla_k a^i_j=\partial_ka^i_j-\Gamma_{kj}^la_l^i+\Gamma_{kl}^ia_j^l$ , 
 $\nabla_k a_{ij}=\partial_ka_{ij}-\Gamma_{ki}^la_{lj}-\Gamma_{kj}^la_{jl}$ and 
 $\nabla_k a^{ij}=\partial_ka^{ij}+\Gamma_{kl}^ia^{lj}+\Gamma_{kl}^ja^{il}$ .

The following holds: $R_{\beta\mu\nu}^\alpha=\partial_\mu\Gamma_{\beta\nu}^\alpha-\partial_\nu\Gamma_{\beta\mu}^\alpha+
\Gamma_{\sigma\mu}^\alpha\Gamma_{\beta\nu}^\sigma-\Gamma_{\sigma\nu}^\alpha\Gamma_{\beta\mu}^\sigma$.
<!-- endtab -->

<!-- tab Ricci tensor -->
The _Ricci tensor_ is a contraction of the Riemann tensor:
$R_{\alpha\beta}:=R^\mu_{\alpha\mu\beta}$, 

which is symmetric:
$R_{\alpha\beta}=R_{\beta\alpha}$.

The _Bianchi identities_ are: 
$\nabla_\lambda R_{\alpha\beta\mu\nu}+\nabla_\nu R_{\alpha\beta\lambda\mu}+
\nabla_\mu R_{\alpha\beta\nu\lambda}=0$.

<!-- endtab -->

<!-- tab Einstein tensor -->
 The _Einstein tensor_ is given by:
 $G^{\alpha\beta}:=R^{\alpha\beta}-\frac{g^{\alpha\beta}R}{2}$, where
 $R:=R_\alpha^\alpha$ is the _Ricci scalar_, for which holds: $\nabla_\beta G_{\alpha\beta}=0$.
 With the variational principle
 $\delta\int(\ll(g_{\mu\nu})-Rc^2/16\pi\kappa)\sqrt{|g|}d^4x=0$ for variations $g_{\mu\nu}\rightarrow g_{\mu\nu}+\delta g_{\mu\nu}$ the _Einstein field equations_ can be derived:

 $\displaystyle G_{\alpha\beta}=\frac{8\pi\kappa}{c^2}T_{\alpha\beta}$ , which can also be written as $R_{\alpha\beta}=\frac{8\pi\kappa}{c^2}(T_{\alpha\beta}- \frac{ g_{\alpha\beta}T^{\mu}_{\mu}}{2})$
 
 For empty space this is equivalent to $R_{\alpha\beta}=0$. The equation $R_{\alpha\beta\mu\nu}=0$ has as only solution a flat space.

 The Einstein equations are 10 independent equations, which are of second order in $g_{\mu\nu}$. From this, the Laplace equation from Newtonian gravitation can be derived by stating: $g_{\mu\nu}=\eta_{\mu\nu}+h_{\mu\nu}$, where $|h|\ll1$. In the stationary case, this results in $\nabla^2 h_{00}=8\pi\kappa\varrho/c^2$.

 The most general form of the field equations is:
 $ R_{\alpha\beta} -  \frac{g_{\alpha\beta}R}{2}+\Lambda g_{\alpha\beta}=\frac{8\pi\kappa}{c^2}T_{\alpha\beta} $ where $\Lambda$ is the _cosmological constant_. This constant plays a role in inflatory models of the universe.

<!-- endtab -->

{% endtabs %}


### Video
{% youtuber video XRr1kaXKBsU %}
  allowfullscreen: 1,
  autoplay: 0,
  hl: en,
  cc_lang_pref: en,
  cc_load_policy: 1,
  color: white,
  controls: 1,
  disablekb: 0,
  enablejsapi: 1,
  fs: 0,
  iv_load_policy: 3,
  loop: 0,
  modestbranding: 1,
  playsinline: 0,
  privacy_mode: yes,
  rel: 0,
  showinfo: 0,
  origin: blog.richiebartlett.com,
  widget_referrer: blog.richiebartlett.com
{% endyoutuber %}

## Your Thoughts?
 Do you think that a freely falling object will radiate electromagnetic radiation or not? Are we simply all accelerating according to our interaction with matter (Earth in our case)?  Until we can device an experiment that can test this, we will only continue to guess and make assumptions.