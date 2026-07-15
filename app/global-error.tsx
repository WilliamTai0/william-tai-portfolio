"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-obsidian-black text-text-secondary antialiased min-h-screen flex items-center justify-center px-6 py-16">
        <main className="rounded-sm border border-border-subtle bg-obsidian-raised p-6 max-w-md w-full">
          <h1 className="text-xl font-normal text-text-primary">Application error</h1>
          <p className="mt-2 text-text-secondary text-sm">The app failed to render.</p>
          <button
            className="mt-4 rounded-xs bg-steel-silver px-4 py-2 font-semibold text-obsidian-black text-sm transition-colors hover:bg-text-primary"
            onClick={() => reset()}
          >
            Retry
          </button>
        </main>
      </body>
    </html>
  );
}