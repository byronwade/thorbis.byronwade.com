'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [activeBlueprints, setActiveBlueprints] = useState([]);

  useEffect(() => {
    const fetchActiveBlueprints = async () => {
      try {
        const response = await fetch('/api/active-blueprints');
        if (!response.ok) throw new Error('Failed to fetch active blueprints');
        const data = await response.json();
        setActiveBlueprints(data);
      } catch (error) {
        console.error('Error fetching active blueprints:', error);
      }
    };

    fetchActiveBlueprints();
  }, []);

  return (
    <main>
      <h1>Welcome to My Website</h1>
      {activeBlueprints.length > 0 ? (
        activeBlueprints.map(blueprint => (
          <div key={blueprint.id}>
            <h2>Active Blueprint: {blueprint.name}</h2>
            <h3>Components:</h3>
            <ul>
              {blueprint.components.map(component => (
                <li key={component.id}>{component.name}</li>
              ))}
            </ul>
            <h3>Templates:</h3>
            <ul>
              {blueprint.templates.map(template => (
                <li key={template.id}>{template.name}</li>
              ))}
            </ul>
            <pre>{JSON.stringify(blueprint.config, null, 2)}</pre>
          </div>
        ))
      ) : (
        <p>No active blueprints found.</p>
      )}
    </main>
  );
}