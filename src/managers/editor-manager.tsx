import c from 'classnames';
import { useMemo } from 'react';

import ContactEditor from '@/components/json-editors/contact-editor';
import ExperienceEditor from '@/components/json-editors/experience-editor';
import SummaryEditor from '@/components/json-editors/summary-editor';
import { useAppContext } from '@/context/app-context';

export default function EditorManager() {
  const { isEditorVisible } = useAppContext();

  const className = useMemo(() => c({ hidden: isEditorVisible }), [isEditorVisible]);

  return (
    <div id="editor-manager" className={className}>
      <ContactEditor />
      <SummaryEditor />
      <ExperienceEditor />
    </div>
  );
}
