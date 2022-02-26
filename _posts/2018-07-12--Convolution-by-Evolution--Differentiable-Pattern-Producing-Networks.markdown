---
layout: post
title:  "[Evolution] Convolution by Evolution: Differentiable Pattern Producing Networks"
date:   2018/07/12
categories: none
---



### Convolution by Evolution: Differentiable Pattern Producing Networks



* Fernando, Chrisantha; 

* Banarse, Dylan; 

* Reynolds, Malcolm; 

* Besse, Frederic; 

* Pfau, David; 

* Jaderberg, Max; 

* Lanctot, Marc; 

* Wierstra, Daan; 





**Abstract**:  In this work we introduce a differentiable version of the Compositional Pattern Producing Network, called the DPPN. Unlike a standard CPPN, the topology of a DPPN is evolved but the weights are learned. A Lamarckian algorithm, that combines evolution and learning, produces DPPNs to reconstruct an image. Our main result is that DPPNs can be evolved/trained to compress the weights of a denoising autoencoder from 157684 to roughly 200 parameters, while achieving a reconstruction accuracy comparable to a fully connected network with more than two orders of magnitude more parameters. The regularization ability of the DPPN allows it to rediscover (approximate) convolutional network architectures embedded within a fully connected architecture. Such convolutional architectures are the current state of the art for many computer vision applications, so it is satisfying that DPPNs are capable of discovering this structure rather than having to build it in by design. DPPNs exhibit better generalization when tested on the Omniglot dataset after being trained on MNIST, than directly encoded fully connected autoencoders. DPPNs are therefore a new framework for integrating learning and evolution. 



 [https://arxiv.org/abs/1606.02580v1](https://arxiv.org/abs/1606.02580v1) 

