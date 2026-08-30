---
title: "Replacing Claude with openwebui, deepseek and searxng"
description: "How I moved my daily AI workflow from a Claude subscription to self-hosted openwebui with deepseek, searxng and playwright: web search and vision from any device over tailnet, at half the cost."
pubDate: 2026-08-30
category: platform
tags: [openwebui, deepseek, searxng, playwright, self-hosted, ai]
---

The goal was simple: I wanted my AI setup to behave like the rest of my
homelab. Self-hosted, reachable from any device over my tailnet, private
by default, and without a fixed monthly bill.

I was a paying Claude user, and the product is good. But twenty euros a
month whether I use it or not, plus a five hour usage window, started to
feel like renting something I could own.

## The model: vision was the hard part

Coding and text I could already get cheap. Vision was the requirement
that kept me on Claude: screenshots, architecture diagrams, error dumps.

Then I found deepseek v4 flash vision. DeepSeek claims vision performance
on par with claude opus 4.8, and in my day to day (UI screenshots, photos
of whiteboards, pasted logs) that matched what I saw. That was the moment
the subscription stopped being necessary.

## The web search bake-off

With the model sorted I got greedy: claude's web search is genuinely
useful, and I wanted it too. Maybe even better, since I would control the
pipeline.

Web search in openwebui splits into two decisions: who searches, and who
reads the pages. On the search side I compared the hosted options
(linkup, tavily) against self-hosting searxng. On the loader side:
playwright, firecrawl, and the newer projects like crawl4ai.

My filter was simple: open source, free, and running on my hardware.
That, plus a weekend of testing, settled it:

- searxng as the metasearch engine: no API key, no quota, no per-call
  cost, and results I can tune engine by engine.
- playwright as the loader: full JavaScript rendering, which is what most
  modern pages need before a model can read them.

For my queries the pair performs on par with what claude was doing, and
it does the job well enough that I stopped comparing. I am still tuning
it: engine weights in searxng, playwright timeouts, and how aggressive
the page-to-text step should be.

## The money part

I will be honest about the trigger: I am kind of broke right now, and a
fixed monthly AI subscription is a bad deal when usage is spiky.

The deepseek platform is pay as you go: I load credits and spend them
when I want. Compared to the fixed twenty euros, it runs me about half or
less even with heavy usage, and there is no five hour window. Small
difference on paper, big difference in a student budget.

## Why this matters beyond me

Self-hosted openwebui, a credits-based model with vision, and my own web
search now replace my claude workflow: the same access from any device
over tailnet, data that never leaves my network, and a cost that follows
usage instead of a calendar.

At company scale this pattern works, if done properly: openwebui behind
authentik for SSO, models billed as credits or self-hosted, and search on
an internal searxng instance. The saving multiplies per employee, and the
data stays inside the perimeter. That is a platform engineering project
worth making, not a hack.
