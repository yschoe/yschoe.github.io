---
layout: post
title:  " Ray RLLib: A Composable and Scalable Reinforcement Learning Library"
date:   2017/12/31
categories: none
---



### Ray RLLib: A Composable and Scalable Reinforcement Learning Library



* Liang, Eric; 

* Liaw, Richard; 

* Nishihara, Robert; 

* Moritz, Philipp; 

* Fox, Roy; 

* Gonzalez, Joseph; 

* Goldberg, Ken; 

* Stoica, Ion; 





**Abstract**:  Reinforcement learning (RL) algorithms involve the deep nesting of distinct components, where each component typically exhibits opportunities for distributed computation. Current RL libraries offer parallelism at the level of the entire program, coupling all the components together and making existing implementations difficult to extend, combine, and reuse. We argue for building composable RL components by encapsulating parallelism and resource requirements within individual components, which can be achieved by building on top of a flexible task-based programming model. We demonstrate this principle by building Ray RLLib on top of Ray and show that we can implement a wide range of state-of-the-art algorithms by composing and reusing a handful of standard components. This composability does not come at the cost of performance --- in our experiments, RLLib matches or exceeds the performance of highly optimized reference implementations. Ray RLLib is available as part of Ray at [https://github.com/ray-project/ray/.](https://github.com/ray-project/ray/.) 



 [https://arxiv.org/abs/1712.09381v1](https://arxiv.org/abs/1712.09381v1) 

