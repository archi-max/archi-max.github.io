import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const BlogPost = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            {/* Back link */}
            <Link
              to="/#writing"
              className="inline-flex items-center gap-2 text-subtle hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft size={16} />
              Back to all writing
            </Link>

            {/* Article header */}
            <header className="mb-12">
              <span className="inline-block px-3 py-1 text-sm font-medium rounded bg-accent text-accent-foreground mb-4">
                Engineering
              </span>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-heading leading-tight mb-6">
                Building Reliable Distributed Systems: Lessons from Production
              </h1>
              <div className="flex items-center gap-6 text-subtle">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />
                  January 15, 2025
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  12 min read
                </span>
              </div>
            </header>

            {/* Article content */}
            <div className="prose-blog space-y-6">
              <p className="text-lg leading-relaxed">
                After running distributed systems at scale for five years, I've accumulated a collection of hard-won lessons about what works, what doesn't, and what will inevitably bite you at 3 AM on a Saturday. This post distills those experiences into actionable patterns and anti-patterns.
              </p>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                The Fallacy of "It Works on My Machine"
              </h2>
              <p>
                The first lesson every distributed systems engineer learns is that local development environments lie to you. They lie about latency, they lie about failure modes, and they especially lie about the chaos that emerges when you have hundreds of machines trying to coordinate.
              </p>
              <p>
                In a single-machine environment, function calls are essentially instant and always succeed. In a distributed environment, every network call is a potential point of failure. The network can drop packets, reorder them, duplicate them, or simply take an unreasonably long time to deliver them.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 italic text-body">
                "A distributed system is one in which the failure of a computer you didn't even know existed can render your own computer unusable."
                <footer className="text-subtle text-sm mt-2 not-italic">— Leslie Lamport</footer>
              </blockquote>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                Pattern #1: Design for Failure
              </h2>
              <p>
                The most reliable distributed systems aren't the ones that never fail—they're the ones that fail gracefully. This means building in redundancy, implementing circuit breakers, and always having a degraded mode of operation.
              </p>
              <p>
                Consider a service that needs to fetch user preferences. In a naive implementation, if the preferences service is down, your entire application might hang or crash. A resilient implementation would:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li>Set aggressive timeouts on the preferences call</li>
                <li>Implement a circuit breaker that trips after repeated failures</li>
                <li>Fall back to sensible defaults when preferences are unavailable</li>
                <li>Cache successful responses to reduce dependency on the upstream service</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                Pattern #2: Idempotency is Non-Negotiable
              </h2>
              <p>
                In distributed systems, messages can and will be delivered more than once. Network partitions, retries, and at-least-once delivery guarantees all conspire to ensure that your handlers will occasionally process the same request multiple times.
              </p>
              <p>
                Every mutation in your system should be idempotent—applying the same operation twice should produce the same result as applying it once. This is easier said than done, but there are a few reliable patterns:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Idempotency keys:</strong> Clients generate a unique key for each logical operation, and servers deduplicate based on this key</li>
                <li><strong>Conditional updates:</strong> Use optimistic locking with version numbers to prevent duplicate applications</li>
                <li><strong>Natural idempotency:</strong> Design operations that are inherently safe to repeat (setting a value vs. incrementing it)</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                Anti-Pattern: Distributed Transactions
              </h2>
              <p>
                Early in my career, I tried to implement two-phase commit across multiple services. It seemed like the "correct" solution—after all, we needed atomicity across service boundaries. What I got instead was a system that was slower, more complex, and paradoxically less reliable than the problem it was trying to solve.
              </p>
              <p>
                The issue is that distributed transactions couple services together in ways that undermine the entire point of having separate services. If any participant in the transaction fails or becomes slow, the entire operation blocks. In practice, eventual consistency with compensating transactions is almost always the better choice.
              </p>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                The Importance of Observability
              </h2>
              <p>
                You cannot fix what you cannot see. In a distributed system, problems manifest in subtle and often counterintuitive ways. A slow database query in service A might cause timeouts in service B, which triggers a cascade of retries that overwhelm service C.
              </p>
              <p>
                Invest heavily in three pillars of observability:
              </p>
              <ul className="list-disc pl-6 space-y-2 my-4">
                <li><strong>Metrics:</strong> Quantitative measurements over time (request rates, error rates, latencies)</li>
                <li><strong>Logs:</strong> Discrete events with context (structured logging is essential)</li>
                <li><strong>Traces:</strong> The path of a request through your system (distributed tracing is invaluable)</li>
              </ul>

              <h2 className="font-display text-2xl font-semibold text-heading mt-12 mb-4">
                Conclusion
              </h2>
              <p>
                Building reliable distributed systems is hard, but it's a learnable skill. The key is to internalize that failures are not exceptional—they are the normal operating condition. Design your systems with this assumption, instrument them thoroughly, and practice your incident response.
              </p>
              <p>
                The patterns I've described here—designing for failure, embracing idempotency, avoiding distributed transactions, and investing in observability—won't prevent all outages. But they will make your systems more resilient and your on-call rotations more bearable.
              </p>

              <div className="divider-subtle my-12" />

              <p className="text-subtle italic">
                Thanks for reading. If you found this useful, you might also enjoy my post on <Link to="/" className="text-primary hover:underline">modular monoliths</Link> or my framework for <Link to="/" className="text-primary hover:underline">technical decision making</Link>.
              </p>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
