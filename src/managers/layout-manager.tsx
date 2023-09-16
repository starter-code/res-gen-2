import { useAppContext } from '@/context/app-context';
import LayoutSingle from '@/components/layouts/layout-single';
import LayoutDouble from '@/components/layouts/layout-double';
import { LAYOUTS } from '@/constants';

export default function LayoutManager() {
  const { layouts } = useAppContext();

  return (
    <>
      {layouts.map(layout => {
        switch (layout.layoutType) {
          case LAYOUTS.SINGLE:
            return (
              <LayoutSingle
                key={layout.layoutId}
                layoutId={layout.layoutId}
                layoutType={layout.layoutType}
              />
            );
          case LAYOUTS.DOUBLE:
            return <LayoutDouble key={layout.layoutId} />;
          default:
            throw new Error(`Unsupported layout ${layout}`);
        }
      })}
    </>
  );
}
