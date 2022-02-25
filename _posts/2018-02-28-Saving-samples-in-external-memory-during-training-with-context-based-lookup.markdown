---
layout: post
title:  "Saving samples in external memory during training with context-based lookup"
date:   2018/02/28
categories: none
---



  



### Memory-based Parameter Adaptation



* Sprechmann, Pablo; 

* Jayakumar, Siddhant M.; 

* Rae, Jack W.; 

* Pritzel, Alexander; 

* Badia, Adrià Puigdomènech; 

* Uria, Benigno; 

* Vinyals, Oriol; 

* Hassabis, Demis; 

* Pascanu, Razvan; 

* Blundell, Charles; 





**Abstract**:  Deep neural networks have excelled on a wide range of problems, from vision to language and game playing. Neural networks very gradually incorporate information into weights as they process data, requiring very low learning rates. If the training distribution shifts, the network is slow to adapt, and when it does adapt, it typically performs badly on the training distribution before the shift. Our method, Memory-based Parameter Adaptation, stores examples in memory and then uses a context-based lookup to directly modify the weights of a neural network. Much higher learning rates can be used for this local adaptation, reneging the need for many iterations over similar data before good predictions can be made. As our method is memory-based, it alleviates several shortcomings of neural networks, such as catastrophic forgetting, fast, stable acquisition of new knowledge, learning with an imbalanced class labels, and fast learning during evaluation. We demonstrate this on a range of supervised tasks: large-scale image classification and language modelling. 



 [https://arxiv.org/abs/1802.10542v1](https://arxiv.org/abs/1802.10542v1) 

