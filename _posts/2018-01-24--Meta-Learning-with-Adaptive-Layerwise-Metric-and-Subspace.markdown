---
layout: post
title:  " Meta-Learning with Adaptive Layerwise Metric and Subspace"
date:   2018/01/24
categories: none
---



### Meta-Learning with Adaptive Layerwise Metric and Subspace



* Lee, Yoonho; 

* Choi, Seungjin; 





**Abstract**:  Recent advances in meta-learning demonstrate that deep representations combined with the gradient descent method have sufficient capacity to approximate any learning algorithm. A promising approach is the model-agnostic meta-learning (MAML) which embeds gradient descent into the meta-learner. It optimizes for the initial parameters of the learner to warm-start the gradient descent updates, such that new tasks can be solved using a small number of examples. In this paper we elaborate the gradient-based meta-learning, developing two new schemes. First, we present a feedforward neural network, referred to as T-net, where the linear transformation between two adjacent layers is decomposed as T W such that W is learned by task-specific learners and the transformation T, which is shared across tasks, is meta-learned to speed up the convergence of gradient updates for task-specific learners. Second, we present MT-net where gradient updates in the T-net are guided by a binary mask M that is meta-learned, restricting the updates to be performed in a subspace. Empirical results demonstrate that our method is less sensitive to the choice of initial learning rates than existing meta-learning methods, and achieves the state-of-the-art or comparable performance on few-shot classification and regression tasks. 



 [https://arxiv.org/abs/1801.05558v1](https://arxiv.org/abs/1801.05558v1) 

