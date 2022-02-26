---
layout: page
title: Blog
permalink: /blog/
---

Copying over articles from my [private Facebook group](https://www.facebook.com/groups/choelab) is now complete (2020 to present)! 
Old articles from my private collection is now also available (2017 to 2019).
Enjoy!

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
