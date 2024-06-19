import c from 'classnames';
import { forwardRef, Ref, useCallback, useMemo } from 'react';

import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import CollapseIcon from '../icons/collapse-icon';
import DeleteIcon from '../icons/delete-icon';
import DragHandleIcon from '../icons/drag-handle-icon';
import PlusIcon from '../icons/plus-icon';
import UncollapseIcon from '../icons/uncollapse-icon';

type EditorTopBarProps = {
  contentId: string;
  contentType: keyof typeof CONTENT_TYPES;
  errorMessage: string;
  formId: string;
  isOpen: boolean;
  macro: string;
  mode: keyof typeof EDITOR_MODES;
  text: string;
  setIsOpen: (value: boolean) => void;
};

export const EditorTopBar = forwardRef<HTMLDivElement, EditorTopBarProps>(
  (props: EditorTopBarProps, ref: Ref<HTMLDivElement>) => {
    const { onCreate, onDelete, layouts } = useAppContext();
    const { macro, errorMessage, text, formId, contentType, contentId, isOpen, setIsOpen, mode } = props;

    const isDragAndDrop = useMemo(() => mode === EDITOR_MODES.DRAG_AND_DROP, [mode]);

    const onAdd = useCallback(
      (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();

        const [layout] = layouts.slice(-1);

        onCreate({
          contentId,
          content: { ...JSON.parse(text) },
          contentType,
          layoutId: layout.layoutId,
          layoutType: layout.layoutType,
          // TODO: this could be a bug
          // because if we click "+" button when last is a double layout
          // it does have a parent
          layoutParentId: undefined,
        });
      },
      [contentType, layouts, contentId, text, onCreate],
    );

    const onClickTopBar = useCallback(() => {
      if (isDragAndDrop) {
        setIsOpen(!isOpen);
      }
    }, [setIsOpen, isOpen, isDragAndDrop]);

    const onDestroy = useCallback(() => {
      onDelete({ contentId });
    }, [contentId, onDelete]);

    const editorDragContainerClassName = useMemo(() => {
      return c('flex bg-gray-600 rounded text-white justify-between p-2', {
        'cursor-grab': !errorMessage && isDragAndDrop,
        'opacity-50': !!errorMessage,
      });
    }, [errorMessage, isDragAndDrop]);

    const labelClassName = useMemo(() => {
      return c('grow p-1 font-bold', {
        'cursor-grab': !errorMessage && isDragAndDrop,
      });
    }, [errorMessage, isDragAndDrop]);

    return (
      <>
        <div
          className={editorDragContainerClassName}
          draggable="true"
          onClick={onClickTopBar}
          ref={ref} //
        >
          {isDragAndDrop && <DragHandleIcon className="m-1 p-1" />}
          <label className={labelClassName} htmlFor={`editor-textarea-${formId}`}>
            {macro}
          </label>

          {isDragAndDrop && (
            <>
              <button
                className="mx-4 p-1 bg-green-300 hover:bg-green-500 rounded"
                aria-label="Add Macro Button"
                type="button"
                onClick={onAdd}
                disabled={!!errorMessage}
              >
                <PlusIcon />
              </button>
              <button aria-label="Toggle Editor Visibility Button" type="button">
                {isOpen ? <CollapseIcon /> : <UncollapseIcon />}
              </button>
            </>
          )}
          {!isDragAndDrop && (
            <button
              className="mx-1 p-1 bg-red-400 hover:bg-red-500 rounded"
              aria-label="Delete Macro Button"
              type="button"
              onClick={onDestroy}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
        {errorMessage && (
          <p className="text-white bg-red-400 rounded p-2">
            <span className="border-black border-2 rounded bg-white p-1 m-1">❗</span>
            {errorMessage}
          </p>
        )}
      </>
    );
  },
);

EditorTopBar.displayName = 'EditorTopBar';
