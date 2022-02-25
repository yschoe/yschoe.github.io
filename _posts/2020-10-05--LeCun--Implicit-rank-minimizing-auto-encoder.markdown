---
layout: post
title:  "[LeCun] Implicit rank-minimizing auto-encoder"
date:   October 5, 2020
categories: none
---







Here's an interesting paper by Yann LeCun and colleagues:

### quote

Yann LeCun is with Jure Zbontar and Li Jing.

IRMAE: Implicit Rank-Minimizing Auto-Encoder.

By Li Jing, Jure Zbontar, Yann LeCun

Our NeurIPS 2020 paper, now on ArXiv.

[https://arxiv.org/abs/2010.00679](https://arxiv.org/abs/2010.00679)

TL;DR: inserting a few *linear* layers in the middle of an auto-encoder will automatically minimize the effective dimension of the latent code space. This is motivated by theoretical results showing that gradient descent learning applied  to a stack of linear layers minimizes the rank of the end-to-end matrix. Seems to do a better job at interpolating in latent space than a VAE. Also yields better results than VAE when using the latent code as input to a linear classifer in the low data regime (3.8% error on MNIST with 1000 labeled training samples). 

Figures: interpolation in latent space, architecture.



 

