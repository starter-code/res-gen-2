import c from 'classnames';
import { forwardRef, Ref, useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';

import { MOVE_ACTION, useAppContext } from '@/context/app-context';
import { ContentId } from '@/types/content-base-item';

import ArrowDownIcon from '../icons/arrow-down-icon';
import ArrowUpIcon from '../icons/arrow-up-icon';
import DeleteIcon from '../icons/delete-icon';
import DragHandleIcon from '../icons/drag-handle-icon';

type MacroTopBarProps = {
  contentId: ContentId;
};

export const MacroTopBar = forwardRef<HTMLDivElement, MacroTopBarProps>(
  (props: MacroTopBarProps, forwardedRef: Ref<HTMLDivElement>) => {
    const { onMove, onDelete } = useAppContext();
    const { contentId } = props;

    const editorDragContainerClassName = useMemo(() => {
      return c('flex bg-gray-600 rounded text-white p-2');
    }, []);

    const onMoveUp = useCallback(() => onMove(MOVE_ACTION.MACRO_UP, contentId), [contentId, onMove]);

    const onMoveDown = useCallback(() => onMove(MOVE_ACTION.MACRO_DOWN, contentId), [contentId, onMove]);

    const onDestroy = useCallback(() => {
      onDelete({ contentId });
    }, [contentId, onDelete]);

    return (
      <div className={editorDragContainerClassName} draggable="true">
        <button onClick={onMoveUp}>
          <ArrowUpIcon className="m-1 p-1" />
        </button>
        <button onClick={onMoveDown}>
          <ArrowDownIcon className="m-1 p-1" />
        </button>
        <button
          className="ml-auto p-1 bg-red-400 hover:bg-red-500 rounded"
          aria-label="Delete Macro Button"
          type="button"
          onClick={onDestroy}
        >
          <DeleteIcon />
        </button>
      </div>
    );
  },
);

MacroTopBar.displayName = 'MacroTopBar';
