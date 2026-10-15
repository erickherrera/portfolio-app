export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#51273c]/30 border-t-[#51273c] dark:border-[#a64d79]/30 dark:border-t-[#a64d79]" />
    </div>
  );
}
