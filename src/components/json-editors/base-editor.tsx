import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Collapse } from 'react-collapse';
import { v4 as uuidv4 } from 'uuid';
import { ZodObject } from 'zod';

import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import type { ChangeEvent, CSSProperties } from 'react';
import type { DropResult } from '@/types/drop-result';
import type { ContentAll } from '@/types/content-all';

type BaseEditorProps = {
  content: ContentAll['content'];
  macro: string;
  style: CSSProperties;
  schema: ZodObject<any>;
  contentType: keyof typeof CONTENT_TYPES;
  mode?: keyof typeof EDITOR_MODES;
};

export default function BaseEditor(props: BaseEditorProps) {
  const { contentType, content, style, macro, schema, mode = EDITOR_MODES['DRAG_AND_DROP'] } = props;

  const { onDrop } = useAppContext();
  const [text, setText] = useState(JSON.stringify(content, null, 2));
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [id, setId] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const editorStyle = useMemo(() => style, [style]);

  const [{ isDragging }, ref] = useDrag({
    type: contentType,
    item: { contentType },
    canDrag: !errorMessage && mode === EDITOR_MODES['DRAG_AND_DROP'],
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();

      if (dropResult) {
        onDrop({
          contentId: id,
          content: { ...JSON.parse(text) },
          contentType: item.contentType,
          layoutId: dropResult.layoutId,
          layoutType: dropResult.layoutType,
          layoutParentId: dropResult.layoutParentId || undefined,
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

  const className = useMemo(() => {
    return classnames('flex grow bg-gray-600 rounded text-white justify-between p-2', {
      'cursor-pointer': !errorMessage,
    });
  }, [errorMessage]);

  return (
    <div className="p-1" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className={className}>
        <h3 ref={ref}>{macro} ☰</h3>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="20" height="20" viewBox="0 0 20 20">
              <path d="M1 9.25l1.5-1.5 7.5 7.5 7.5-7.5 1.5 1.5-9 9-9-9z" />
              <path d="M1 1.75l1.5-1.5 7.5 7.5 7.5-7.5 1.5 1.5-9 9-9-9z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="#FFF" width="20" height="20" viewBox="0 0 20 20">
              <path d="M1 16.75l1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-9-9-9 9z" />
              <path d="M1 9.25l1.5 1.5 7.5-7.5 7.5 7.5 1.5-1.5-9-9-9 9z" />
            </svg>
          )}
        </button>
      </div>
      <Collapse isOpened={isOpen}>
        <form>
          <textarea
            name={contentType}
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
