import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow">
      <main className="flex flex-col gap-8 items-center justify-center flex-grow p-8 sm:p-20">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={200}
          height={50}
          priority
        />
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-2 text-3xl font-bold">
            Erick Herrera's Portfolio.
          </h1>
          <h2 className="mb-2 text-xl">A Puertorican with big dreams!</h2>
        </div>
      </main>
      <footer className="flex gap-6 flex-wrap items-center justify-center p-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}