---
layout: post
title:  "[Choe] Thoughts on learning motor primitives"
date:   July 16, 2020
tags: Choe 
categories: none
---



Here are some references and thoughts on learning motor primitives (such as reaching, grasping, jumping, ...).



1. Deep RL

This is a very interesting paper on learning motor primitives. CNN and variants are great at learning receptive fields. RFs can be thought of as perceptual primitives. However, not much work is done in the learning of motor primitives. This paper seems to be going in the right direction.

[https://arxiv.org/pdf/1811.11711v2.pdf](https://arxiv.org/pdf/1811.11711v2.pdf)

2. Neuroscience



In neuroscience, motor primitives are well known. For example, see the work of Michael Graziano.

[https://grazianolab.princeton.edu/](https://grazianolab.princeton.edu/)


Especially, this paper:
[https://grazianolab.princeton.edu/sites/default/files/graziano/files/neuron_07.pdf](https://grazianolab.princeton.edu/sites/default/files/graziano/files/neuron_07.pdf)







Jaewook's WSOM 2014 paper is strongly inspired Graziano's work.

[https://people.engr.tamu.edu/choe/choe/ftp/publications/yoo-wsom14.pdf](https://people.engr.tamu.edu/choe/choe/ftp/publications/yoo-wsom14.pdf)





3 Traditional RL theory

In terms of RL, this area of research may be related to "Option learning". Option is a composition of multiple actions that can be applied as a module.

[https://people.cs.umass.edu/~barto/courses/cs687/Sutton-Precup-Singh-AIJ99.pdf](https://people.cs.umass.edu/~barto/courses/cs687/Sutton-Precup-Singh-AIJ99.pdf)


Thoughts:

To make RL scalable, it'd be very important to learn these motor primitives, and link them together to generate complex behavior.

It would be interesting how these motor primitives, laid out in a SOM-like or cortex-like map could be useful.

It is interesting the Deep RL paper does cite Graziano's neuroscience work, but not the option paper.



 

