import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import {
  object,
  string,
  union,
  undefined as _undefined,
  null as _null,
} from 'zod';

import type { ChangeEvent } from 'react';

import ExampleHeading from '@/__example-json/heading.json';
import { ITEM_TYPES } from '@/constants';

import type { DropResult, ContentItem } from '@/types/item-types';

type HeadingEditorProps = {
  onDrop: (item: ContentItem) => void;
};

const schema = object({
  name: string(),
  email: string(),
  title: union([string(), _undefined(), _null()]),
  phone: union([string(), _undefined()]),
  location: union([string(), _undefined()]),
  github: union([string(), _undefined()]),
  linkedin: union([string(), _undefined()]),
});

export default function HeadingEditor({ onDrop }: HeadingEditorProps) {
  const [text, setText] = useState(JSON.stringify(ExampleHeading, null, 2));
  const [errorMessage, setErrorMessage] = useState('');
  const [id, setId] = useState('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const style = useMemo(
    () => ({
      color: 'black',
      height: '20ch',
      fontFamily: 'monospace',
      maxWidth: '100%',
      width: '120ch',
    }),
    [],
  );

  const [{ isDragging }, ref] = useDrag({
    type: ITEM_TYPES.HEADING,
    item: { name: ITEM_TYPES.HEADING },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (dropResult) {
        onDrop({ id, name: ITEM_TYPES.HEADING, content: text, style });
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
    if (textAreaRef.current) {
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '10px',
      }}
    >
      <h3 ref={ref}>Heading ☰</h3>
      <form>
        <textarea
          spellCheck="false"
          onChange={onHandleChange}
          value={text}
          ref={textAreaRef}
          style={style}
        ></textarea>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
