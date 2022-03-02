---
layout: page
title: "Blog: [Choe]-Tagged Collection"
permalink: /blog-choe/
---

This is a collection of all articles in the [Blog](/blog/) tagged with "[Choe]"

Enjoy!

<ul class="listing">
{% for post in site.posts %}

{% if post.title contains "[Choe]" %}

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

