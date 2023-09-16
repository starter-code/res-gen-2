import { useAppContext } from '@/context/app-context';
import DropArea from '@/components/drag-and-drop/drop-area-single';

export default function DropAreaManager() {
  const { layouts } = useAppContext();

  return (
    <>
      {layouts.map(layout => {
        return <DropArea key={layout.id} name={layout.name} />;
      })}
    </>
  );
}
