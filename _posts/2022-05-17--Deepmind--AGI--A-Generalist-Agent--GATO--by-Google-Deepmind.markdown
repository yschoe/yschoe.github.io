---
layout: post
title:  "[Deepmind][AGI] A Generalist Agent (GATO) by Google Deepmind"
date:   May 17, 2022
categ:  none
---



Deepmind built a single transformer-based model that can be trained and work on a diverse set of tasks, including various RL problems (game playing),  image captioning, interactive dialog, etc. 

[https://www.deepmind.com/publications/a-generalist-agent](https://www.deepmind.com/publications/a-generalist-agent)

* My prediction: this paper will appear in the journal Nature.

Quote from the blog: 

During the training phase of Gato, data from different tasks and modalities are serialised into a flat sequence of tokens, batched, and processed by a transformer neural network similar to a large language model. The loss is masked so that Gato only predicts action and text targets.

When deploying Gato, a prompt, such as a demonstration, is tokenised, forming the initial sequence. Next, the environment yields the first observation, which is also tokenised and appended to the sequence. Gato samples the action vector autoregressively, one token at a time.

Once all tokens comprising the action vector have been sampled (determined by the action specification of the environment), the action is decoded and sent to the environment which steps and yields a new observation. Then the procedure repeats. The model always sees all previous observations and actions within its context window of 1024 tokens.



 

