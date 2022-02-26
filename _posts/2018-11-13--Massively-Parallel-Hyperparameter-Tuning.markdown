---
layout: post
title:  " Massively Parallel Hyperparameter Tuning"
date:   2018/11/13
categories: none
---



### Massively Parallel Hyperparameter Tuning



* Li, Liam; 

* Jamieson, Kevin; 

* Rostamizadeh, Afshin; 

* Gonina, Ekaterina; 

* Hardt, Moritz; 

* Recht, Benjamin; 

* Talwalkar, Ameet; 





**Abstract**:  Modern learning models are characterized by large hyperparameter spaces. In order to adequately explore these large spaces, we must evaluate a large number of configurations, typically orders of magnitude more configurations than available parallel workers. Given the growing costs of model training, we would ideally like to perform this search in roughly the same wall-clock time needed to train a single model. In this work, we tackle this challenge by introducing ASHA, a simple and robust hyperparameter tuning algorithm with solid theoretical underpinnings that exploits parallelism and aggressive early-stopping. Our extensive empirical results show that ASHA slightly outperforms Fabolas and Population Based Tuning, state-of-the hyperparameter tuning methods; scales linearly with the number of workers in distributed settings; converges to a high quality configuration in half the time taken by Vizier (Google&#39;s internal hyperparameter tuning service) in an experiment with 500 workers; and beats the published result for a near state-of-the-art LSTM architecture in under 2x the time to train a single model. 



 [https://arxiv.org/abs/1810.05934v2](https://arxiv.org/abs/1810.05934v2) 

