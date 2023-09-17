import ExperienceEditor from '@/components/json-editors/experience-editor';
import HeadingEditor from '@/components/json-editors/heading-editor';
import SummaryEditor from '@/components/json-editors/summary-editor';

export default function EditorManager() {
  return (
    <div id="editor-manager" className="flex flex-wrap">
      <HeadingEditor />
      <SummaryEditor />
      <ExperienceEditor />
    </div>
  );
}
