---
layout: page
title: Talks
permalink: /talks/
---

This is a list of talks I gave over the years.

<ul class="listing">
{% for item in site.data.talks %}

  {% capture y %}{{item.date | date:"%Y"}}{% endcapture %}
  {% if year != y %}
    {% assign year = y %}
    <li class="listing-seperator"> <b><font size="+2">{{ y }}</font></b> </li>
  {% endif %}

  <li class="listing-item">
    
  {{ item.title }}<br/>
  {% if item.date %}
     &nbsp;&nbsp;&nbsp; {{ item.date }} <br/>
  {% endif %}

   &nbsp;&nbsp;&nbsp; {{ item.inst }}
    {% if item.host %}
    	(Host: {{ item.host }})
    {% endif %}
  <br/>


  </li>

{% endfor %}
</ul>
