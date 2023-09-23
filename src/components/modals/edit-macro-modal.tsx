import React, { ElementType, useCallback, useState } from 'react';

type NonModalDialogProps = {
  Element: ElementType;
  elementProps: {};
};

function NonModalDialog({ Element, elementProps }: NonModalDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const onFocus = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onBlur = useCallback(() => setIsOpen(false), [setIsOpen]);

  return (
    <div>
      {isOpen && (
        <div className="non-modal-dialog">
          <Element {...elementProps} onFocus={onFocus} onBlur={onBlur} />
          <button onClick={toggleDialog}>Close</button>
        </div>
      )}
    </div>
  );
}

export default NonModalDialog;
