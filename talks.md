---
layout: page
title: Talks
permalink: /talks/
---

This is a list of talks I gave over the years. This list is semi-automatically geneated from my LaTeX source files, so there may be some errors.

<ul class="listing">
{% assign count = 1 %}
{% assign sorted = site.data.talks | sort: 'date' | reverse %}
{% for item in sorted %}

  {% capture y %}{{item.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator"> <b><font size="+2">{{ y }}</font></b> </li>
  {% endif %}

  <li class="listing-item">
    
  {{ count }}. {{ item.title }}<br/>
  {% assign count = count|plus: 1 %}
  {% if item.date %}
     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ item.date }} <br/>
  {% endif %}

   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{ item.inst }}
    {% if item.host %}
    	(Host: {{ item.host }})
    {% endif %}
  <br/>


  </li>

{% endfor %}
</ul>
