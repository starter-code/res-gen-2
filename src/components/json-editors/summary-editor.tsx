import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { object, string } from 'zod';

import type { ChangeEvent } from 'react';

import EXAMPLE_SUMMARY from '@/__example-json/summary.json';
import { ITEM_TYPES } from '@/constants';

import type { DropResult } from '@/types/drop-result-types';
import { useAppContext } from '@/context/app-context';

type SummaryEditorProps = {
  //   onDrop: (item: ContentItem) => void;
};

const schema = object({
  heading: string(),
  summary: string(),
});

export default function SummaryEditor({}: SummaryEditorProps) {
  const { onDrop } = useAppContext();
  const [text, setText] = useState(JSON.stringify(EXAMPLE_SUMMARY, null, 2));
  const [errorMessage, setErrorMessage] = useState('');
  const [id, setId] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const style = useMemo(
    () => ({
      backgroundColor: 'aliceblue',
      color: 'black',
      height: '20ch',
      fontFamily: 'monospace',
      maxWidth: '100%',
      width: '40ch',
    }),
    [],
  );

  const [{ isDragging }, ref] = useDrag({
    type: ITEM_TYPES.SUMMARY,
    item: { contentType: ITEM_TYPES.SUMMARY },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (dropResult) {
        onDrop({
          contentId: id,
          content: text,
          contentType: item.contentType,
          layoutId: dropResult.layoutId,
          layoutType: dropResult.layoutType,
          style,
        });
      }
    },
  });

  useEffect(() => {
    adjustTextareaHeight();
    setId(uuidv4());
  }, [text]);

  const validateJsonSchema = useCallback((jsonString: string) => {
    try {
      const jsonData = JSON.parse(jsonString);
      schema.parse(jsonData);
      setErrorMessage('');
    } catch (error) {
      const e = error as Error;
      console.error(e.message);
      setErrorMessage(e.message);
    }
  }, []);

  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    validateJsonSchema(event.target.value);
  };

  const adjustTextareaHeight = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
      }}
    >
      <h3 ref={ref}>Summary ☰</h3>
      <form>
        <textarea spellCheck="false" onChange={onHandleChange} value={text} ref={textAreaRef} style={style}></textarea>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
