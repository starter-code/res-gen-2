import { useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';

import type { ChangeEvent } from 'react';

import ExampleHeading from '@/__example-json/heading.json';
import { ItemTypes } from '@/drag-and-drop/item-types';

import type { Item } from '@/drag-and-drop/item-types';

type HeadingEditorProps = {
  onDrop: (item: Item) => void;
};

export default function HeadingEditor({ onDrop }: HeadingEditorProps) {
  const [text, setText] = useState(JSON.stringify(ExampleHeading, null, 2));
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const id = useMemo(() => uuidv4(), []);
  const style = useMemo(
    () => ({
      color: 'black',
      width: '120ch',
      height: '20ch',
      fontFamily: 'monospace',
    }),
    [],
  );

  const [{ isDragging }, ref] = useDrag({
    type: ItemTypes.HEADING,
    item: { name: ItemTypes.HEADING },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
    end: (item, monitor) => {
      onDrop({ id, name: ItemTypes.HEADING, content: text, style });
    },
  });

  const onHandleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  const adjustTextareaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div style={{ opacity: isDragging ? 0.5 : 1 }}>
      <form>
        <textarea
          spellCheck="false"
          onChange={onHandleChange}
          value={text}
          ref={textAreaRef}
          style={style}
        ></textarea>
      </form>
      <p ref={ref}>DRAG HERE</p>
    </div>
  );
}
