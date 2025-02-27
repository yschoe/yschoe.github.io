---
layout: page
title: Theses
permalink: /theses/
---

This is a collection of theses (MS, BS honors) and dissertations from our lab.

<ol class="listing">
{% for item in site.data.theses %}
  <li class="listing-item">
    
  {% if item.lastname %}
     {{ item.lastname }}, 
  {% endif %}
  {% if item.firstname%}
     {{ item.firstname }}, 
  {% endif %}
     <br/>

    {% if item.url %}
        &nbsp; &nbsp;  &nbsp; <a href="{{ item.url }}" title="{{ item.title }}">
    {% else %}
        &nbsp; &nbsp;  &nbsp; <a href="https://catalog.library.tamu.edu/Search/Results?lookfor={{ item.title }}&type=Title&limit=1" title="{{ item.title }}">
        &nbsp; &nbsp;  &nbsp; <a href="https://oaktrust.library.tamu.edu/search?spc.page=1&query="yoonsuck%20choe"&f.author={{ item.lastname }},%20{{ item.firstname }},equals">

    {% endif %}



  {{ item.lastname }}, {{ item.firstname }}</a>

  {% if item.year%}
     ({{ item.year }})
  {% endif %}

  </li>

{% endfor %}
</ol>
