'use client';

import { useState, useEffect } from 'react';

export default function AdminBlueprintsPage() {
  const [blueprints, setBlueprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlueprints = async () => {
      try {
        const response = await fetch('/api/blueprints');
        if (!response.ok) throw new Error('Failed to fetch blueprints');
        const data = await response.json();
        setBlueprints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlueprints();

    // Fetch blueprints every 10 seconds
    const intervalId = setInterval(fetchBlueprints, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const setActiveBlueprint = async (id) => {
    try {
      const response = await fetch('/api/blueprints', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) throw new Error('Failed to update blueprint');
      
      // Refresh the blueprints list after updating
      const updatedResponse = await fetch('/api/blueprints');
      if (!updatedResponse.ok) throw new Error('Failed to fetch updated blueprints');
      const updatedData = await updatedResponse.json();
      setBlueprints(updatedData);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blueprints</h1>
      <ul>
        {blueprints.map((blueprint) => (
          <li key={blueprint.id} className="flex items-center justify-between mb-2">
            <span>{blueprint.name}</span>
            <button
              onClick={() => setActiveBlueprint(blueprint.id)}
              className={`px-4 py-2 rounded ${
                blueprint.isActive
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {blueprint.isActive ? 'Active' : 'Set Active'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}