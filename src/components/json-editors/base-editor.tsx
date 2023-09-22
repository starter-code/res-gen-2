import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ZodObject } from 'zod';
import { Collapse } from 'react-collapse';

import type { ChangeEvent, CSSProperties } from 'react';

import { CONTENT_TYPES } from '@/constants';

import type { DropResult } from '@/types/drop-result';
import { useAppContext } from '@/context/app-context';

type BaseEditorProps = {
  macro: string;
  type: (typeof CONTENT_TYPES)[keyof typeof CONTENT_TYPES];
  json: {};
  style: CSSProperties;
  schema: ZodObject<any>;
};

export default function BaseEditor({ type, json, style, macro, schema }: BaseEditorProps) {
  const { onDrop } = useAppContext();
  const [text, setText] = useState(JSON.stringify(json, null, 2));
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [id, setId] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const editorStyle = useMemo(() => style, [style]);

  const [{ isDragging }, ref] = useDrag({
    type,
    item: { contentType: type },
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
          layoutParentId: dropResult.layoutParentId,
        });
      }
    },
  });

  useEffect(() => {
    adjustTextareaHeight();
    setId(uuidv4());
  }, [text]);

  const validateJsonSchema = useCallback(
    (jsonString: string) => {
      try {
        const jsonData = JSON.parse(jsonString);
        schema.parse(jsonData);
        setErrorMessage('');
      } catch (error) {
        const e = error as Error;
        console.error(e.message);
        setErrorMessage(e.message);
      }
    },
    [schema],
  );

  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
    validateJsonSchema(event.target.value);
  };

  const adjustTextareaHeight = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  return (
    <div className="p-1" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="flex justify-between px-2">
        <h3 ref={ref}>{macro} ☰</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path d="M1 6.25l1.5-1.5 7.5 7.5 7.5-7.5 1.5 1.5-9 9-9-9z" />
              <path d="M1 1.75l1.5-1.5 7.5 7.5 7.5-7.5 1.5 1.5-9 9-9-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
              <path d="M1 13.75l1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-9-9-9 9z" />
              <path d="M1 19.25l1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-9-9-9 9z" />
            </svg>
          )}
        </button>
      </div>
      <Collapse isOpened={isOpen}>
        <form>
          <textarea
            spellCheck="false"
            onChange={onHandleChange}
            value={text}
            ref={textAreaRef}
            style={editorStyle}
          ></textarea>
        </form>
      </Collapse>
      {errorMessage && (
        <p className="text-white bg-red-400 rounded p-2">
          <span className="border-black border-2 rounded bg-white p-1 m-1">❗</span>
          {errorMessage}
        </p>
      )}
    </div>
  );
}
