---
layout: post
title:  " Accelerating Deep Neural Networks with Spatial Bottleneck Modules"
date:   2018/09/14
categories: none
---



### Accelerating Deep Neural Networks with Spatial Bottleneck Modules



* Peng, Junran; 

* Xie, Lingxi; 

* Zhang, Zhaoxiang; 

* Tan, Tieniu; 

* Wang, Jingdong; 





**Abstract**:  This paper presents an efficient module named spatial bottleneck for accelerating the convolutional layers in deep neural networks. The core idea is to decompose convolution into two stages, which first reduce the spatial resolution of the feature map, and then restore it to the desired size. This operation decreases the sampling density in the spatial domain, which is independent yet complementary to network acceleration approaches in the channel domain. Using different sampling rates, we can tradeoff between recognition accuracy and model complexity. As a basic building block, spatial bottleneck can be used to replace any single convolutional layer, or the combination of two convolutional layers. We empirically verify the effectiveness of spatial bottleneck by applying it to the deep residual networks. Spatial bottleneck achieves 2x and 1.4x speedup on the regular and channel-bottlenecked residual blocks, respectively, with the accuracies retained in recognizing low-resolution images, and even improved in recognizing high-resolution images. 



 [https://arxiv.org/abs/1809.02601v1](https://arxiv.org/abs/1809.02601v1) 

