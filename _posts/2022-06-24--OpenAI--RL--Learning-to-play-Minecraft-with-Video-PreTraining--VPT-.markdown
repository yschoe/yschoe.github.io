---
layout: post
title:  "[OpenAI][RL] Learning to play Minecraft with Video PreTraining (VPT)"
date:   June 24, 2022
categ:  none
---



Learning to play Minecraft with video pretraining, by OpenAI. The main innovation is their "Inverse Dynamics Model (IDM)", which learns to predict the action outcomes. The interesting part is that IDM uses both past and future info, not just past information to make this easier. This IDM is used to label massive unlabled data, and this is in turn fed into behavioral cloning. Although the task is to simply build a diamond pickaxe, this alone involves many sequential tasks that takes an average human about 20 minutes to accomplish. 



[https://openai.com/blog/vpt/](https://openai.com/blog/vpt/)



 

