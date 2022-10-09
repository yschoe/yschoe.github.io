---
layout: post
title:  "[BeyondDL][Molnar][Choe] Beyond Benchmark Islands"
date:   October 9, 2022
categ:  none
---


HT: Cheolwon Jang on FB.

[https://twitter.com/ChristophMolnar/status/1485549716268109824](https://twitter.com/ChristophMolnar/status/1485549716268109824)



In this Twitter post, Christoph Molnar talks about the limitations of benchmarks in deep learning and how this leads to various issues.

[Quote]
A lot of machine learning research has detached itself from solving real problems, and created their own "benchmark-islands".

How does this happen? And why are researchers not escaping this pattern?


[Choe] I had this same issue with benchmarks, which I mentioned many times in my recent talks. :-) Another way of looking at this problem is that benchmarks limit the capability of the models. Given a benchmark, by definition, any model cannot exceed 100% accuracy. We need models and algorithms that can exceed this limit. At the core of this problem is that the models are given the problem to solve in the form of a benchmark data set. That is, the models are only problem solvers. However, to exceed 100% accuracy, the models need to define their own problems, their own tasks. 



Take a look at a short essay I wrote with Tim Mann a decade ago: 



Yoonsuck Choe and Timothy A. Mann. From problem solving to problem posing. Brain-Mind Magazine, 1:7-8, 2012.

[http://faculty.cs.tamu.edu/choe/ftp/publications/choe-bmm2012.pdf](http://faculty.cs.tamu.edu/choe/ftp/publications/choe-bmm2012.pdf)



 

