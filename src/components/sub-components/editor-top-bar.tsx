import c from 'classnames';
import { useCallback, useMemo, forwardRef, Ref } from 'react';

import { CONTENT_TYPES, EDITOR_MODES } from '@/constants';
import { useAppContext } from '@/context/app-context';

import DragHandleIcon from '../icons/drag-handle-icon';
import PlusIcon from '../icons/plus-icon';
import CollapseIcon from '../icons/collapse-icon';
import UncollapseIcon from '../icons/uncollapse-icon';

import DeleteIcon from '../icons/delete-icon';

type EditorTopBarProps = {
  contentId: string;
  contentType: keyof typeof CONTENT_TYPES;
  errorMessage: string;
  isOpen: boolean;
  macro: string;
  mode: keyof typeof EDITOR_MODES;
  text: string;
  setIsOpen: (value: boolean) => void;
};

export const EditorTopBar = forwardRef<HTMLDivElement, EditorTopBarProps>(
  (props: EditorTopBarProps, ref: Ref<HTMLDivElement>) => {
    const { onCreate, onDelete, layouts } = useAppContext();
    const { macro, errorMessage, text, contentType, contentId, isOpen, setIsOpen, mode } = props;

    const isDragAndDrop = useMemo(() => mode === EDITOR_MODES['DRAG_AND_DROP'], [mode]);

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
        'cursor-pointer': !errorMessage && isDragAndDrop,
        'opacity-50': !!errorMessage,
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
          {isDragAndDrop && <DragHandleIcon />}
          <h3 className="grow">{macro}</h3>
          {isDragAndDrop && (
            <>
              <button type="button" className="mx-1" onClick={onAdd}>
                <PlusIcon />
              </button>
              <button type="button">{isOpen ? <CollapseIcon /> : <UncollapseIcon />}</button>
            </>
          )}
          {!isDragAndDrop && (
            <button type="button" className="mx-1" onClick={onDestroy}>
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
