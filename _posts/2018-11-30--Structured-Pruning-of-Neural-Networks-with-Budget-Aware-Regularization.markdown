---
layout: post
title:  " Structured Pruning of Neural Networks with Budget-Aware Regularization"
date:   2018/11/30
categories: none
---



### Structured Pruning of Neural Networks with Budget-Aware Regularization



* Lemaire, Carl; 

* Achkar, Andrew; 

* Jodoin, Pierre-Marc; 





**Abstract**:  Pruning methods have shown to be effective at reducing the size of deep neural networks while keeping accuracy almost intact. Among the most effective methods are those that prune a network while training it with a sparsity prior loss and learnable dropout parameters. A shortcoming of these approaches however is that neither the size nor the inference speed of the pruned network can be controlled directly; yet this is a key feature for targeting deployment of CNNs on low-power hardware. To overcome this, we introduce a budgeted regularized pruning framework for deep convolutional neural networks. Our approach naturally fits into traditional neural network training as it consists of a learnable masking layer, a novel budget-aware objective function, and the use of knowledge distillation. We also provide insights on how to prune a residual network and how this can lead to new architectures. Experimental results reveal that CNNs pruned with our method are more accurate and less compute-hungry than state-of-the-art methods. Also, our approach is more effective at preventing accuracy collapse in case of severe pruning; this allows us to attain pruning factors up to 16x without significantly affecting the accuracy. 



 [https://arxiv.org/abs/1811.09332v1](https://arxiv.org/abs/1811.09332v1) 

