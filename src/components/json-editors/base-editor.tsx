import classnames from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { Collapse } from 'react-collapse';
import { v4 as uuidv4 } from 'uuid';
import { ZodObject } from 'zod';

import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import type { ChangeEvent } from 'react';
import type { DropResult } from '@/types/drop-result';
import type { ContentAll } from '@/types/content-all';

type BaseEditorProps = ContentAll & {
  macro: string;
  className: string;
  schema: ZodObject<any>;
  contentType: keyof typeof CONTENT_TYPES;
  mode?: keyof typeof EDITOR_MODES;
};

export default function BaseEditor(props: BaseEditorProps) {
  const { contentType, content, macro, schema, mode = EDITOR_MODES['DRAG_AND_DROP'] } = props;

  const { onDrop, onUpdate } = useAppContext();
  const [text, setText] = useState(JSON.stringify(content, null, 2));
  const [isOpen, setIsOpen] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [contentId, setContentId] = useState(props.contentId || '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
          contentId,
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
    mode === EDITOR_MODES['DRAG_AND_DROP'] && setContentId(uuidv4());
  }, [text, mode]);

  const validateJsonSchema = useCallback(
    (jsonString: string) => {
      try {
        const jsonData = JSON.parse(jsonString);
        schema.parse(jsonData);
        setErrorMessage('');
        return true;
      } catch (error) {
        const e = error as Error;
        console.error(e.message);
        setErrorMessage(e.message);
        return false;
      }
    },
    [schema],
  );

  const onHandleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      const jsonValue = event.target.value;
      setText(jsonValue);
      validateJsonSchema(jsonValue);
    },
    [validateJsonSchema],
  );

  const onBlur = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (mode === EDITOR_MODES['DRAG_AND_DROP']) {
      return;
    }

    if (validateJsonSchema(event.target.value)) {
      onUpdate({
        contentId,
        content: { ...JSON.parse(text) },
        contentType: props.contentType,
        layoutId: props.layoutId,
        layoutType: props.layoutType,
        layoutParentId: props.layoutParentId || undefined,
      });
    }
  };

  const adjustTextareaHeight = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const editorDragContainerClassName = useMemo(() => {
    return classnames('flex bg-gray-600 rounded text-white justify-between p-2', {
      'cursor-pointer': !errorMessage,
    });
  }, [errorMessage]);

  const textAreaClassName = useMemo(() => {
    const defaultClassName = classnames('h-[20ch]', 'font-mono', 'bg-emerald-100');
    const overrideClassName = classnames('grow', {
      'w-auto': mode === EDITOR_MODES['POPOVER'],
      'w-[60ch]': mode !== EDITOR_MODES['POPOVER'],
    });

    return classnames(defaultClassName, overrideClassName);
  }, [mode]);

  return (
    <div className="p-1" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className={editorDragContainerClassName} draggable="true" onClick={() => setIsOpen(!isOpen)} ref={ref}>
        <h3 className={'grow'}>{macro} ☰</h3>
        <button>
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
      {errorMessage && (
        <p className="text-white bg-red-400 rounded p-2">
          <span className="border-black border-2 rounded bg-white p-1 m-1">❗</span>
          {errorMessage}
        </p>
      )}
      <Collapse isOpened={isOpen}>
        <form className="flex">
          <textarea
            className={textAreaClassName}
            name={contentType}
            spellCheck="false"
            onBlur={onBlur}
            onChange={onHandleChange}
            value={text}
            ref={textAreaRef}
          ></textarea>
        </form>
      </Collapse>
    </div>
  );
}
