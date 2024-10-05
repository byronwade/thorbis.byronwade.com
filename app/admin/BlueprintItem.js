'use client';

import { useState } from 'react';
import { setActiveBlueprint } from '@/lib/blueprints';

export default function BlueprintItem({ blueprint }) {
  const [isActive, setIsActive] = useState(blueprint.isActive);

  const handleSetActive = async () => {
    try {
      await setActiveBlueprint(blueprint.id);
      setIsActive(true);
    } catch (error) {
      console.error('Failed to set blueprint active:', error);
    }
  };

  return (
    <li className="flex items-center justify-between mb-2">
      <span>{blueprint.name}</span>
      <button
        onClick={handleSetActive}
        className={`px-4 py-2 rounded ${
          isActive ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
        }`}
      >
        {isActive ? 'Active' : 'Set Active'}
      </button>
    </li>
  );
}