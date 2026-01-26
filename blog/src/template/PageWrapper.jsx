import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Toc from './Toc';

export default function PageWrapper({ children }) {
  const base = globalThis.__SCRATCH_BASE__ || '';

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const { pathname, search, hash } = window.location;
    if (!pathname.endsWith('/') && !pathname.split('/').pop()?.includes('.')) {
      const target = `${pathname}/${search}${hash}`;
      window.location.replace(target);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-body flex flex-col">
      <Header base={base} />

      <main className="flex-1">
        <div className="mx-auto max-w-[1180px] px-6 pt-28 pb-16 xl:grid xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-10 xl:items-start flex flex-col gap-10 overflow-visible">
          <div className="hidden xl:block -ml-6 xl:sticky xl:top-5">
            <Toc />
          </div>
          <article className="lw-content max-w-3xl flex-1 prose prose-lg prose-headings:text-heading prose-headings:font-semibold prose-a:text-primary prose-a:underline prose-a:underline-offset-4 prose-a:transition-colors prose-blockquote:border-primary prose-blockquote:bg-accent/30 prose-blockquote:italic">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
