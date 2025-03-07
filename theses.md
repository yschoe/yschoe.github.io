---
layout: page
title: BS Honors Theses
permalink: /theses/
---

This is a collection of BS honors theses from our lab.

<ol class="listing">

{% assign count = 1 %}
{% assign sorted = site.data.theses | sort: 'year' | reverse %}
{% for item in sorted %}

  <li class="listing-item">

  <b> [{{ item.type }}] </b>
    
  {% if item.lastname %}
     {{ item.lastname }}, 
  {% endif %}
  {% if item.firstname%}
     {{ item.firstname | replace: "%20", " " }}
  {% endif %}
  {% if item.coauthor %}
     ; {{ item.coauthor }}
  {% endif %}:

     ({{ item.year }}).
   <a href="https://oaktrust.library.tamu.edu/search?spc.page=1&query=%22yoonsuck%20choe%22&f.author={{ item.lastname }},%20{{ item.firstname }},equals">
  {% if item.title %}  
   {{ item.title }}
  {% else %}
   Link 
  {% endif %}
  </a>

  </li>

{% endfor %}
</ol>
