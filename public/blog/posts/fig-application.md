---
title: "[Application] FIG Fellowship — Insurance & Liability for Frontier AI Safety"
description: "My FIG Fellowship application and assessment submission on insurance/liability mechanisms for frontier AI safety."
author: "Ansh Tulsyan"
date: "26 Feb 2026"
tags: ["application", "fig", "ai governance", "ai safety"]
---

# [Application] FIG Fellowship — Insurance & Liability for Frontier AI Safety

by **Ansh Tulsyan**

<br />

This post captures my FIG Fellowship application experience and what I submitted.

I applied to the FIG Fellowship project on **Insurance and Liability as Levers for AI Safety** and later completed the follow-on assessment task.

## What I submitted

### Initial application

### Why would you like to join the FIG Fellowship?

At AMD, IP leakage is a major risk. That pushed me to think about:

- what a response policy should look like
- what actions are realistic if leakage happens
- who owns detection, triage, escalation, and containment

A lot of teams optimize for typical LLM behavior, not rare high-impact edge cases. Tool-using agents increase blast radius: they can run commands, access internal knowledge, and accidentally expose privileged information. Insurance and liability mechanisms can create a real cost for ignoring these risks, and stronger incentives for better evals and permissioning.

### What skills and experiences could you contribute to the projects you would undertake during the FIG Fellowship?

- Published an internal peer-reviewed benchmark for LLM performance in niche domains (including RCA and hardware-code error localization)
- Deployed telemetry for AI workflows used by 1k+ engineers at AMD (logging, monitoring, and production-signal interpretation)
- Translated safety practices like canary strings into tools for auditing IP leakage to LLMs
- Fast empirical iteration with experiments and measurement-driven decisions

### Follow-on assignment

#### Prompt

> Identify an industry where insurance or liability frameworks significantly improved safety outcomes. What mechanisms drove this improvement, and what would need to be true for similar mechanisms to work for frontier AI systems?

#### Response

Nuclear power offers a rare, double-edged lesson for frontier AI. It shows that insurance and liability frameworks can improve safety in catastrophic-risk industries by turning safety into an operational and financial constraint, not just a principle. It also shows the failure mode: if liability and compliance become slow, unpredictable, and lawyer-driven, the resulting friction can stall an industry. The goal for AI governance is to capture insurance’s safety discipline without recreating a regime where progress is choked by uncertainty and compliance grind.

A strong example is U.S. commercial nuclear power under the Price-Anderson framework. Operators must carry insurance and participate in an industry-wide retrospective pool that mutualizes liability if a major incident occurs. Crucially, the safety impact is not only “paying damages after the fact.” Coverage is conditioned on ongoing compliance, and insurers/mutuals developed loss-control capabilities: engineering inspections, peer review, underwriting standards, and the ability to require corrective action as a condition of coverage. That structure makes safety legible to senior leadership because safety performance affects premiums, operating terms, and, in the limit, the ability to keep operating.

Several mechanisms drove the improvement. First, mandatory insurance broadens participation: safety incentives apply across the whole operator set rather than only to the most conscientious. Second, underwriting and experience-based pricing translate performance into dollars, pushing investment toward prevention, monitoring, training, and robust operational processes. Third, insurer inspections tighten feedback loops because remediation demands can be immediate and commercially consequential. Fourth, mutualized exposure creates peer pressure: when one actor’s failure imposes costs on the entire pool, the group has reason to standardize best practices and scrutinize weak performers.

A direct transplant to AI will fail unless we account for its differences. Nuclear plants are scarce, immobile, and license-gated; frontier AI is digital, fast-iterating, and can be copied, fine-tuned, or open-sourced. Nuclear harms are physically measurable and attributable; many AI harms are multi-actor and multi-causal, and some are diffuse or gradual. Finally, AI risk can be highly correlated: the same base model deployed everywhere can create synchronized failure modes, which strains traditional insurability.

For similar mechanisms to work for frontier AI systems, several things would need to be true. Obligations must be risk-tiered and capability-triggered, not written for “today’s models”: heavyweight requirements should apply to frontier, high-impact deployments (capability, autonomy/tool access, scale, and domain criticality), while low-risk innovation stays cheap and fast. Static certification must become continuous benchmarking and “versioned safety cases,” with clear triggers for re-evaluation when models or deployment contexts change. Attribution and incident-data infrastructure must exist (logging, provenance where feasible, and standardized incident and near-miss reporting), so insurers can price and enforce based on evidence rather than guesswork.

Enforcement also needs layered chokepoints. Compute is a natural gate for public, frontier-scale capability because it requires substantial aggregate compute under common control, but it cannot be the only gate if actors can distribute work across smaller sites. A workable regime would combine compute and cloud/API deployment controls with power, colocation, and hardware traceability where feasible, making evasion through “many small datacenters” costly and risky. A regulated registry for frontier models and deployments can tie this together by assigning persistent identifiers and linking evaluation status, proof of coverage, and incident reporting to real deployments.

Finally, the system must be predictable and pro-competition. Clear standards and safe harbors should reduce open-ended legal uncertainty, and insurance should complement regulation rather than become an arbitrary private veto. If designed well, the nuclear incentive logic can carry over: pricing risk, demanding remediation, and creating peer accountability. The goal is a regime that updates as fast as frontier AI: periodic refresh cycles that strengthen with capability without freezing the field in place.

## Reflection

Cool experience overall, and it got me thinking more seriously about insurance as an AI safety lever and what companies like [AIUC](https://aiuc.com) are building.
