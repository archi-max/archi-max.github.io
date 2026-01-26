import React from 'react';
import Header from './Header';
import Footer from './Footer';
import TOC from '../components/TOC';

export default function PageWrapper({ children, toc }) {
  const base = globalThis.__SCRATCH_BASE__ || '';

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--text-body))" }}
    >
      <Header base={base} />

      <main className="flex-1">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1fr_minmax(0,3fr)] xl:grid-cols-[1fr_minmax(0,3.5fr)] gap-10">
            <TOC items={toc || []} />
            <article className="prose prose-lg max-w-3xl">
              {children}
            </article>
          </div>
        </div>
      </main>

      <Footer base={base} />
    </div>
  );
}
