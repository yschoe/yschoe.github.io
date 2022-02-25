---
layout: post
title:  "[LeCun] Wisdom by Yann LeCun"
date:   June 8, 2020
categories: none
---


### quote

Yann LeCun

A model, a family of function, a neural net architecture+regularizer, a likelihood model+prior, are all forms of inductive bias.

And we know that there is no free lunch, meaning that:

- There is no learning without inductive bias.

- There is no neural net training without an architecture.

- There is no statistical estimation without a likelihood model.

- There is no non-parametric estimation without regularization.

Without some sort of inductive bias

- There is no estimation of probability distribution.

- There is no estimation of entropy.

- There is no estimation of mutual information.

- There is no estimation of conditional independence.

- There is no measure of complexity

- There is no estimation of minimum description length.

Which means that none of these things are well defined quantities (except perhaps in the asymptotic case of infinite data. But who cares about that). 

The estimation of all of these quantities is subjectively dependent upon your choice of model.

You may say: "the entropy of my data is well defined. It's H = -SUM_x P(x) log P(x)".

Yes, but what is P(x)? 

You only know P(x) through a bunch of samples. 

Which mean you need to estimate a model of P(x) from your data.

Which means your model will necessarily have some sort of inductive bias, some sort of arbitrariness in it.

Ultimately, all measures of distributions, information, entropy, complexity and dependency are in the eye of the beholder.

Update: the subjectivity of those quantities also exists when applied to physical systems. The entropy of a physical system is also in the eyes of the beholder.


