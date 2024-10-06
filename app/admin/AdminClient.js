'use client';

import { useState, useEffect } from 'react';

export default function AdminBlueprintsPage() {
  const [blueprints, setBlueprints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlueprints = async () => {
    console.log('Fetching blueprints...');
    try {
      const response = await fetch('/api/blueprints');
      if (!response.ok) throw new Error('Failed to fetch blueprints');
      const data = await response.json();
      console.log('Fetched blueprints:', data);
      setBlueprints(data);
    } catch (err) {
      console.error('Error fetching blueprints:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlueprints();
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

  const syncBlueprints = async () => {
    try {
      const response = await fetch('/api/sync-blueprints');
      if (!response.ok) throw new Error('Failed to sync blueprints');
      const result = await response.json();
      console.log('Sync result:', result);
      fetchBlueprints(); // Refresh the list after syncing
    } catch (err) {
      console.error('Error syncing blueprints:', err);
      setError(err.message);
    }
  };

  const testDatabaseConnection = async () => {
    try {
      const response = await fetch('/api/db-test');
      const data = await response.json();
      console.log('Database test result:', data);
      alert(data.message || data.error);
    } catch (err) {
      console.error('Error testing database connection:', err);
      alert('Error testing database connection');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Blueprints</h1>
      <button onClick={syncBlueprints}>Sync Blueprints</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && blueprints.length === 0 && <p>No blueprints found.</p>}
      <ul>
        {blueprints.map(blueprint => (
          <li key={blueprint.id}>{blueprint.name} - {blueprint.isActive ? 'Active' : 'Inactive'}</li>
        ))}
      </ul>
    </div>
  );
}