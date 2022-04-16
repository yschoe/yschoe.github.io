---
layout: page
title: Blog
permalink: /blog/
---

<div>
<ul class="flattoc">
<li> Subset Collections: </li>
<li> <a href="/seminar/">Lab Seminars</a> </li>
<li> <a href="/blog-choe">[Choe]-tagged</a> </li>
</ul>
</div>

Subscribe: [Facebook group](https://www.facebook.com/groups/choelab).

This is mostly a collection of articles I found to be interesting. The ones marked "[Choe]" are original articles or those that include my commentary. 

* [New] 2/26/2022: You can now press the [ j ] and [ k ] key inside the article to go back and forth between the articles, and [ l ] key to come back to the listing.
* Copying over articles from my [private Facebook group](https://www.facebook.com/groups/choelab) is now complete (2020 to present). 
* Old articles from my private collection are now also available (2013 to 2017, and 2017 to 2019). 
* Lab seminar materials have been added. See [/seminar/](/seminar/) for a separate collection of only these entries.

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
