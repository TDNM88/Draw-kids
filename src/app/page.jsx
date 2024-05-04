// In your page.jsx file
import React from 'react';
import dynamic from 'next/dynamic';
import GroqClient from '@groq/client';

const groqClient = new GroqClient(process.env.GROQ_API_KEY);

const MyComponent = dynamic(() => import('./MyComponent'), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <h1>My App</h1>
      {typeof window !== 'undefined' ? <MyComponent /> : null}
    </div>
  );
}