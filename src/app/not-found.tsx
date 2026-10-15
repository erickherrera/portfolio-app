import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-extrabold">404</h1>
      <p className="max-w-md text-gray-600 dark:text-gray-400">
        The page you are looking for could not be found.
      </p>
      <Link
        href="/"
        className="rounded-md bg-[#51273c] px-5 py-2 font-bold text-white transition-colors hover:bg-[#949494] dark:bg-[#a64d79]"
      >
        Back home
      </Link>
    </div>
  );
}
