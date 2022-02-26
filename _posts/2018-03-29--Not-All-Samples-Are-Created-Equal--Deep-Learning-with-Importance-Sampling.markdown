---
layout: post
title:  " Not All Samples Are Created Equal: Deep Learning with Importance Sampling"
date:   2018/03/29
categories: none
---



### Not All Samples Are Created Equal: Deep Learning with Importance Sampling



* Katharopoulos, Angelos; 

* Fleuret, François; 





**Abstract**:  Deep neural network training spends most of the computation on examples that are properly handled, and could be ignored. We propose to mitigate this phenomenon with a principled importance sampling scheme that focuses computation on &#34;informative&#34; examples, and reduces the variance of the stochastic gradients during training. Our contribution is twofold: first, we derive a tractable upper bound to the per-sample gradient norm, and second we derive an estimator of the variance reduction achieved with importance sampling, which enables us to switch it on when it will result in an actual speedup. The resulting scheme can be used by changing a few lines of code in a standard SGD procedure, and we demonstrate experimentally, on image classification, CNN fine-tuning, and RNN training, that for a fixed wall-clock time budget, it provides a reduction of the train losses of up to an order of magnitude and a relative improvement of test errors between 5% and 17%. 



 [https://arxiv.org/abs/1803.00942v1](https://arxiv.org/abs/1803.00942v1) 

