---
layout: page
title: "Blog: Lab Seminars"
permalink: /seminar/
---

This is a collection of all lab seminar topics since 2003. Some entries may be missing.

Enjoy!

<ul class="listing">
{% for post in site.posts %}

{% if post.categ == 'seminar' %}
  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator"> <b><font size="+3">{{ y }}</font></b> </li>
  {% endif %}
  <li class="listing-item">
    <time datetime="{{ post.date | date:"%Y-%m-%d" }}">{{ post.date | date:"%Y-%m-%d" }}</time>
    <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a>
  </li>
{% endif %}

{% endfor %}
</ul>

