---
layout: post
title:  " Knowledge Distillation in Generations: More Tolerant Teachers Educate Better Students"
date:   2018/05/21
categories: none
---



### Knowledge Distillation in Generations: More Tolerant Teachers Educate Better Students



* Yang, Chenglin; 

* Xie, Lingxi; 

* Qiao, Siyuan; 

* Yuille, Alan; 





**Abstract**:  This paper studies teacher-student optimization on neural networks, i.e., adopting the supervision from a trained (teacher) network to optimize another (student) network. Conventional approaches enforced the student to learn from a strict teacher which fit a hard distribution and achieved high recognition accuracy, but we argue that a more tolerant teacher often educate better students. We start with adding an extra loss term to a patriarch network so that it preserves confidence scores on a primary class (the ground-truth) and several visually-similar secondary classes. The patriarch is also known as the first teacher. In each of the following generations, a student learns from the teacher and becomes the new teacher in the next generation. Although the patriarch is less powerful due to ambiguity, the students enjoy a persistent ability growth as we gradually fine-tune them to fit one-hot distributions. We investigate standard image classification tasks (CIFAR100 and ILSVRC2012). Experiments with different network architectures verify the superiority of our approach, either using a single model or an ensemble of models. 



 [https://arxiv.org/abs/1805.05551v1](https://arxiv.org/abs/1805.05551v1) 

