import { useAppContext } from '@/context/app-context';
import HeadingEditor from '@/components/json-editors/heading-editor';
import SummaryEditor from '@/components/json-editors/summary-editor';

export default function EditorManager() {
  return (
    <div id="editor-manager" className="flex">
      <HeadingEditor />
      <SummaryEditor />
    </div>
  );
}
