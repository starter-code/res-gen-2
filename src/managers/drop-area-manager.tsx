import { useAppContext } from '@/context/app-context';
import DropAreaSingle from '@/components/layouts/layout-single';
import DropAreaDouble from '@/components/layouts/layout-double';
import { LAYOUTS } from '@/constants';

export default function DropAreaManager() {
  const { layouts } = useAppContext();

  return (
    <>
      {layouts.map(layout => {
        switch (layout.name) {
          case LAYOUTS.SINGLE:
            return <DropAreaSingle key={layout.id} name={layout.name} />;
          case LAYOUTS.DOUBLE:
            return <DropAreaDouble key={layout.id} name={layout.name} />;
          default:
            throw new Error(`Unsupported layout ${layout}`);
        }
      })}
    </>
  );
}
