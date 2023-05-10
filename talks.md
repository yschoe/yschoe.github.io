---
layout: page
title: Talks
permalink: /talks/
---

This is a list of talks I gave over the years.

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
