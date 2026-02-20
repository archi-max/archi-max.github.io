---
title: "Reliability Notes: Designing for Failure"
description: "A LessWrong-inspired walkthrough on building resilient systems"
keywords: ["distributed systems", "reliability", "lesswrong", "engineering notes"]
author: "Ansh Tulsyan"
date: "20 Jan 2025"
---

# Reliability Notes: Designing for Failure

by **Ansh Tulsyan** · 20 Jan 2025 · AI Alignment Forum

<br />

Healthy systems assume the world is messy. This post collects the habits I reach for when latency spikes, retries pile up, and users keep clicking refresh.

## Start with graceful degradation

The question isn't *if* dependencies fail—it's how you behave when they do. Good fallbacks keep users moving while you fix the root cause.

- Tight timeouts on anything over the network
- Circuit breakers that trip fast and recover slowly
- Cached success paths to survive brief outages
- Default responses that keep the UI stable

## Idempotency everywhere

At-least-once delivery means every mutation should be safe to repeat. Idempotency keys plus conditional writes get you most of the way there.

```ts
async function savePreferences(userId: string, payload: Preferences) {
  const key = `prefs:${userId}:${payload.version}`;
  const alreadySeen = await redis.get(key);
  if (alreadySeen) return;

  await db.preferences.upsert({ userId, ...payload });
  await redis.set(key, "1", { EX: 60 * 60 });
}
```

## Observe before you guess

The fastest way to debug production is to never be surprised. Metrics, logs, and traces answer different questions—use all three.

> "A distributed system is one in which the failure of a computer you didn't even know existed can render your own computer unusable." — Leslie Lamport

### What to watch

- **Latency distributions**, not averages
- **Error ratios** with fast alerts, noisy logs with slower rollups
- **Retry storms** that masquerade as traffic growth

## Practice incident muscle memory

Run game days. Document playbooks. Make rollbacks boring. Reliability isn't a property you declare; it's a habit you rehearse.

---

If this resonated, you might like the longform essay on distributed guarantees back on the main site.
