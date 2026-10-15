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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-extrabold">Something went wrong</h1>
      <p className="max-w-md text-gray-600 dark:text-gray-400">
        An unexpected error occurred while loading this page.
      </p>
      <button
        onClick={reset}
        className="rounded-md bg-[#51273c] px-5 py-2 font-bold text-white transition-colors hover:bg-[#949494] dark:bg-[#a64d79]"
      >
        Try again
      </button>
    </div>
  );
}
