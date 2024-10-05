'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeBlueprint, setActiveBlueprint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActiveBlueprint() {
      try {
        const response = await fetch('/api/active-blueprint');
        if (response.ok) {
          const data = await response.json();
          setActiveBlueprint(data.activeBlueprint);
        } else {
          console.error('Failed to fetch active blueprint');
        }
      } catch (error) {
        console.error('Error fetching active blueprint:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchActiveBlueprint();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!activeBlueprint) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="mb-4 text-3xl font-bold text-gray-800">Welcome to Thorbis CMS</h1>
        <p className="text-xl text-gray-600">This website has not been set up yet.</p>
        <p className="mt-2 text-gray-500">Please configure an active blueprint in the admin panel.</p>
      </div>
    );
  }

  const blueprintConfig = JSON.parse(activeBlueprint.config);

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Active Blueprint: {blueprintConfig.name}</h1>
      <h2 className="mt-6 mb-2 text-2xl font-semibold">Layouts:</h2>
      <ul className="pl-5 list-disc">
        {blueprintConfig.layouts.map((layout, index) => (
          <li key={index} className="mb-1">{layout}</li>
        ))}
      </ul>
      <h2 className="mt-6 mb-2 text-2xl font-semibold">Components:</h2>
      <ul className="pl-5 list-disc">
        {blueprintConfig.components.map((component, index) => (
          <li key={index} className="mb-1">{component}</li>
        ))}
      </ul>
    </div>
  );
}