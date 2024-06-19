import c from 'classnames';
import type { ChangeEvent } from 'react';
import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { Collapse } from 'react-collapse';
import { useDrag } from 'react-dnd';
import { v4 as uuidv4 } from 'uuid';
import { ZodObject } from 'zod';

import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';
import { useAppContext } from '@/context/app-context';
import type { ContentAll } from '@/types/content-all';
import type { DropResult } from '@/types/drop-result';

import { EditorTopBar } from '../sub-components/editor-top-bar';

type BaseEditorProps = Partial<ContentAll> & {
  macro: string;
  className: string;
  schema: ZodObject<any>;
  contentType: keyof typeof CONTENT_TYPES;
  mode?: keyof typeof EDITOR_MODES;
};

export default function BaseEditor(props: BaseEditorProps) {
  const { contentType, content, macro, schema, mode = EDITOR_MODES.DRAG_AND_DROP } = props;

  const { onCreate, onUpdate } = useAppContext();
  const [text, setText] = useState(JSON.stringify(content, null, 2));
  const [isOpen, setIsOpen] = useState(mode === EDITOR_MODES.POPOVER);
  const [errorMessage, setErrorMessage] = useState('');
  const [contentId, setContentId] = useState(props.contentId || '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const formId = useId();

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
        onCreate({
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

  const onChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      // prevent backspace from bubbling up to remove the macro
      event.stopPropagation();

      const jsonValue = event.target.value;
      setText(jsonValue);
      validateJsonSchema(jsonValue);
    },
    [validateJsonSchema],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // prevent Delete or Backspace key from deleting the ContentItem
      // in WYSIWYG editor when editting textarea element text
      event.stopPropagation();
    };

    const element = textAreaRef.current;

    element?.addEventListener('keydown', handleKeyDown);

    return () => {
      element?.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const onBlur = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
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
    },
    [contentId, mode, onUpdate, props, text, validateJsonSchema],
  );

  const adjustTextareaHeight = () => {
    if (!textAreaRef.current) return;
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
  };

  const textAreaClassName = useMemo(() => {
    const defaultClassName = c('h-[9ch]', 'p-2', 'font-mono', 'resize-none');
    const overrideClassName = c('grow', {
      'w-auto': mode === EDITOR_MODES['POPOVER'],
      'w-[60ch]': mode !== EDITOR_MODES['POPOVER'],
      'bg-emerald-100': mode === EDITOR_MODES['POPOVER'],
      'bg-sky-100': mode === EDITOR_MODES['DRAG_AND_DROP'],
    });

    return c(defaultClassName, overrideClassName);
  }, [mode]);

  const containerClassName = useMemo(() => {
    const className = c(props.className, {
      'cursor-text': mode === EDITOR_MODES['POPOVER'],
      'opacity-50': isDragging,
      'p-1': true,
    });

    return className;
  }, [isDragging, mode, props.className]);

  return (
    <div className={containerClassName}>
      <EditorTopBar
        formId={formId}
        mode={mode}
        macro={macro}
        errorMessage={errorMessage}
        text={text}
        contentType={contentType}
        contentId={contentId}
        ref={ref}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Collapse isOpened={isOpen}>
        <form className="flex">
          <textarea
            id={`editor-textarea-${formId}`}
            className={textAreaClassName}
            name={contentType}
            spellCheck="false"
            onBlur={onBlur}
            onChange={onChange}
            value={text}
            ref={textAreaRef}
            tabIndex={0}
            aria-describedby="error-message"
          />
        </form>
      </Collapse>
    </div>
  );
}
