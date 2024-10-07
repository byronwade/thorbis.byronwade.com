import { getBlueprints } from '@/lib/blueprints';
import BlueprintItem from './BlueprintItem';

export default async function BlueprintList() {
  const blueprints = await getBlueprints();

  return (
    <ul>
      {blueprints.map((blueprint) => (
        <BlueprintItem key={blueprint.id} blueprint={blueprint} />
      ))}
    </ul>
  );
}