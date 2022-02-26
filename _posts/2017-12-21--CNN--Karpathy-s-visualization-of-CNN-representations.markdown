---
layout: post
title:  "[CNN] Karpathy's visualization of CNN representations"
date:   2017/12/21
categories: none
---



[https://cs.stanford.edu/people/karpathy/cnnembed/](https://cs.stanford.edu/people/karpathy/cnnembed/)



t-SNE visualization of CNN codes

Description

I took 50,000 ILSVRC 2012 validation images, extracted the 4096-dimensional fc7 CNN (Convolutional Neural Network) features using Caffe and then used Barnes-Hut t-SNE to compute a 2-dimensional embedding that respects the high-dimensional (L2) distances. In other words, t-SNE arranges images that have a similar CNN (fc7) code nearby in the embedding.



 

