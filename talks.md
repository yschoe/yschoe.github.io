---
layout: page
title: Talks
permalink: /talks/
---

This is a list of talks I gave over the years.

<ul class="listing">
{% for item in site.data.talks %}

  {% capture y %}{{post.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator"> <b><font size="+3">{{ y }}</font></b> </li>
  {% endif %}

  <li class="listing-item">
    
  {% if item.date %}
     {{ item.date }}<br/>
  {% endif %}

  {{ item.inst }} 
    {% if item.host %}
    	({{ item.host }})
    {% endif % }
  <br/>

  &nbsp;&nbsp;&nbsp; {{ item.title }}<br/>

  </li>

{% endfor %}
</ul>
