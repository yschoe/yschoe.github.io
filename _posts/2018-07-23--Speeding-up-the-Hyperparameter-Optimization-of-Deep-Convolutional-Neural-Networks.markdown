---
layout: post
title:  " Speeding up the Hyperparameter Optimization of Deep Convolutional Neural Networks"
date:   2018/07/23
categories: none
---



### Speeding up the Hyperparameter Optimization of Deep Convolutional Neural Networks



* Hinz, Tobias; 

* Navarro-Guerrero, Nicolás; 

* Magg, Sven; 

* Wermter, Stefan; 





**Abstract**:  Most learning algorithms require the practitioner to manually set the values of many hyperparameters before the learning process can begin. However, with modern algorithms, the evaluation of a given hyperparameter setting can take a considerable amount of time and the search space is often very high-dimensional. We suggest using a lower-dimensional representation of the original data to quickly identify promising areas in the hyperparameter space. This information can then be used to initialize the optimization algorithm for the original, higher-dimensional data. We compare this approach with the standard procedure of optimizing the hyperparameters only on the original input. We perform experiments with various state-of-the-art hyperparameter optimization algorithms such as random search, the tree of parzen estimators (TPEs), sequential model-based algorithm configuration (SMAC), and a genetic algorithm (GA). Our experiments indicate that it is possible to speed up the optimization process by using lower-dimensional data representations at the beginning, while increasing the dimensionality of the input later in the optimization process. This is independent of the underlying optimization procedure, making the approach promising for many existing hyperparameter optimization algorithms. 



 [https://arxiv.org/abs/1807.07362v1](https://arxiv.org/abs/1807.07362v1) 

