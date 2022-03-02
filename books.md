---
layout: page
title: Books
permalink: /books/
---

This is a collection of books I once borrowed from the university library, at some point in time from 2001 to the present. Some of these books I had continually renewed (over 15 years for some!), before I returened them all to the library in 2017, prior to my leave to work at Samsung Research. Note that some of the search results may be inaccurate. At that time, I had over 100 library books in my office. :-)

<ol class="listing">
{% for item in site.data.books %}
  <li class="listing-item">
    
  {% if item.author %}
     {{ item.author }}<br/>
  {% endif %}

    {% if item.url %}
        &nbsp; &nbsp;  &nbsp; <a href="{{ item.url }}" title="{{ item.title }}">
    {% else %}
        &nbsp; &nbsp;  &nbsp; <a href="https://catalog.library.tamu.edu/Search/Results?lookfor={{ item.title }}&type=Title&limit=1" title="{{ item.title }}">
    {% endif %}


  {{ item.title | replace: "+", " "}}</a>

  {% if item.year%}
     ({{ item.year }})
  {% endif %}

  </li>

{% endfor %}
</ol>
