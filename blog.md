---
layout: page
title: Blog
permalink: /blog/
---

I'm currently porting over old articles from my [private Facebook group](https://www.facebook.com/groups/choelab). Most of 2021 and 2020 articles are missing.

<ul class="listing">
{% for post in site.posts %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator"> <b><font size="+3">{{ y }}</font></b> </li>
  {% endif %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>
