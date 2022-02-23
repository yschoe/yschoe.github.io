---
layout: post
title:  "[ICML] Barlow twins: self-supervised method to train joint-embedded architectures"
date:   May 8, 2021
categories: none
---

Horace Barlow (the namesake of this proposed approach) was an influential vision scientist who advocated the "redundancy reduction" framework for the understanding of visual information processing.


























Yann LeCun

Barlow Twins: a new super-simple self-supervised method to train joint-embedding architectures (aka Siamese nets) non contrastively.

The basic idea is to maximize the normalized correlation between a variable in the left branch and the corresponding variable in the right branch, while making the normalized cross-correlation between one variable in the left branch and all other variables in the right branch as close to zero as possible. 

In short: the loss tries to make the normalized cross-correlation matrix between the embedding vectors coming out of the left branch and the right branch as close to the identity matrix as possible.

The two branches are always fed with differently-distorted version of the same image, and there is no need for dissimilar (contrastive) training sample pairs.

The objective makes the embedding vectors of the two branches as similar as possible, while maximizing their information content.

No need for: contrastive samples, huge batch size (optimal size is 1024), nor for a predictor, moving-average weights, vector quantization, nor cut gradients in one of the branches.

Competitive results on ImageNet with a linear classifier head.

Great results on semi-supervised ImageNet in the low labeled-data regime and on transfer tasks.

As with other methods, the feature vector used for downstream tasks is set to 2048 (standard ResNet50 architecture). 

But contrary to other methods, the embedding size (at the output of the projector) is larger. In fact the performance keeps getting better as the size of the embedding gets larger (we stopped at 16384). This is probably because the feature vector variables are made more independent of each other (not just decorrelated) as the size of the embedding grows.

Why Barlow? Horace Barlow was a pioneer of visual neuroscience who proposed the idea that the brain tries to minimize redundancy in representations.

By Jure Zbontar, Li Jing, Ishan Misra, yours truly, and Stéphane Deny.

All from FAIR.

To appear at ICML 2021: [https://arxiv.org/abs/2103.03230](https://arxiv.org/abs/2103.03230)



 

