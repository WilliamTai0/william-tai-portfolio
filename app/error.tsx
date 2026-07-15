"use client";

import { useEffect } from "react";

export default function Error({
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
    <main className="mx-auto flex min-h-[50vh] max-w-md items-center justify-center px-6 py-16">
      <div className="rounded-sm border border-border-subtle bg-obsidian-raised p-6 w-full">
        <h1 className="text-xl font-normal text-text-primary">Something went wrong</h1>
        <p className="mt-2 text-text-secondary text-sm">Please try again.</p>
        <button
          className="mt-4 rounded-xs bg-steel-silver px-4 py-2 font-semibold text-obsidian-black text-sm transition-colors hover:bg-text-primary"
          onClick={() => reset()}
        >
          Try again
        </button>
      </div>
    </main>
  );
}