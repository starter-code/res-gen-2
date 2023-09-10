import { useAppContext } from '@/context/app-context';

export default function AddLayoutButton() {
  useAppContext();

  return <button type="button">Add Single Column Layout</button>;
}
