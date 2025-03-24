import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Redirecting to Homepage...',
  description: 'Please wait while we redirect you to the homepage',
}

export default function Home() {
  // You could add logging here if needed
  // console.log('Redirecting to homepage');
  
  // Redirect to the homepage
  redirect('/homepage');
  
  // This will never be rendered due to the redirect,
  // but it's good practice to include a fallback
  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to homepage...</p>
    </div>
  );
}