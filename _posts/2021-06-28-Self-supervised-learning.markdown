---
layout: post
title:  "Self-supervised learning"
date:   June 28, 2021
categories: none
---

Take a look at this if you're interested in self-supervised learning.


























Alfredo Canziani is with Yann LeCun and Ishan Misra at NYU Center for Data Science.

Learn all about self-supervised learning for vision with Ishan Misra!

In this lecture, Ishan covers pretext invariant rep learning (PIRL), swapping assign. of views (SwAV), audiovisual discrimination (AVID + CMA), and Barlow Twins redundancy reduction.

[https://youtu.be/8L10w1KoOU8](https://youtu.be/8L10w1KoOU8)

[https://twitter.com/alfcnz/status/1409481710618693632](https://twitter.com/alfcnz/status/1409481710618693632)

Here you can find the @MLStreetTalk's interview, where these topics are discussed in a conversational format.

[https://twitter.com/MLStreetTalk/status/1406884357185363974](https://twitter.com/MLStreetTalk/status/1406884357185363974)

Here, instead, you can read an accessible blog post about these topics, authored by Ishan Misra and Yann LeCun.

[https://twitter.com/ylecun/status/1367516830542270467](https://twitter.com/ylecun/status/1367516830542270467)

We can organise different classes of joint-embeddings methods in 4 main categories.

 • Contrastive (explicit use of negative samples)

 • Clustering 

 • Distillation

 • Redundancy reduction

[https://twitter.com/alfcnz/status/1409599975668002826](https://twitter.com/alfcnz/status/1409599975668002826)

«Contrastive»

Related embeddings (same colour) should be closer than unrelated embeddings (different colour).

Good negatives samples are *very* important. E.g.

 • SimCLR has a *very large* batch size;

 • Wu2018 uses an offline memory bank;

 • MoCo uses an “online mem bank”.

[https://twitter.com/alfcnz/status/1409599981158387714](https://twitter.com/alfcnz/status/1409599981158387714)

«Clustering»

Contrastive learning ⇒ grouping in feature space.

We may simply want to assign an embedding to a given cluster. Examples are:

 • SwAV performs online clustering using optimal transport;

 • DeepClustering;

 • SeLA.

[https://twitter.com/alfcnz/status/1409599985113616386](https://twitter.com/alfcnz/status/1409599985113616386)

«Distillation»

Similarity maximisation through a student-teacher distillation process. Trivial solution avoided by using asymmetries: learning rule and net's architecture.

 • BYOL's student has a predictor on top, the teacher is a slow student;

 • SimSiam shares weights.

[https://twitter.com/alfcnz/status/1409599988758368263](https://twitter.com/alfcnz/status/1409599988758368263)

«Redundancy reduction»

Each neuron's representation should be invariant under input data augmentation and independent from other neurons. Everything's done *without* looking at negative examples!

E.g. Barlow Twins makes the covariance close to an identity matrix.

[https://twitter.com/alfcnz/status/1409599992558460928](https://twitter.com/alfcnz/status/1409599992558460928)

 

