'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Debug environment variables in browser console
    console.log('Page Load - Environment Variables:');
    console.log({
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT
    });
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Environment Variables Debug</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap">
          {JSON.stringify({
            NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
            NODE_ENV: process.env.NODE_ENV,
            NEXT_PUBLIC_ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT
          }, null, 2)}
        </pre>
      </div>
    </main>
  );
}
