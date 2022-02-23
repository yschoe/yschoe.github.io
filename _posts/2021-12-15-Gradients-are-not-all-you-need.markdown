---
layout: post
title:  "Gradients are not all you need"
date:   November 15, 2021
categories: none
---

HT: Raymond de Lacaze (FB Deep Learning group) 

Gradients are Not All You Need (Google Brain 2021)

Paper: [https://arxiv.org/abs/2111.05803](https://arxiv.org/abs/2111.05803)

Abstract:

"Differentiable programming techniques are widely used in the community and are responsible for the machine learning renaissance of the past several decades. While these methods are powerful, they have limits. In this short report, we discuss a common chaos based failure mode which appears in a variety of differentiable circumstances, ranging from recurrent neural networks and numerical physics simulation to training learned optimizers. We trace this failure to the spectrum of the Jacobian of the system under study, and provide criteria for when a practitioner might expect this failure to spoil their differentiation based optimization algorithms."
Sounds more like "Gradients considered harmful" (in the style of Edsger Dijkstra's famous "GOTO considered harmful")

 

