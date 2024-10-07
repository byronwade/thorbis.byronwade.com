import { Suspense } from 'react';
import BlueprintList from './BlueprintsList';

export const revalidate = 0; // This ensures the page is always up-to-date

export default function AdminBlueprintsPage() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Blueprints</h1>
      <Suspense fallback={<div>Loading blueprints...</div>}>
        <BlueprintList />
      </Suspense>
    </div>
  );
}