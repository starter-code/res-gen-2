import { ReactNode, useEffect, useRef, useState } from 'react';

import { CONTENT_TYPES } from '@/constants';
import classnames from 'classnames';
import MacroManager from '@/managers/macro-manager';

type BaseMacroProps = {
  children: ReactNode;
  content: Record<string, string | string[]>;
  contentType: keyof typeof CONTENT_TYPES;
};

// .non-modal-dialog {
//     position: absolute;
//     background-color: white;
//     border: 1px solid #ccc;
//     padding: 16px;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
//     z-index: 1; /* Ensure it appears above other content */
//   }

export default function BaseMacro(props: BaseMacroProps) {
  const { children } = props;

  const [isFocused, setIsFocused] = useState(false);

  const divRef = useRef<HTMLDivElement>(null);

  // Function to handle clicks outside of the div
  const handleClick = (event: MouseEvent) => {
    if (!divRef.current) return;

    if (divRef.current?.contains(event.target as Node)) {
      divRef.current.focus();
      setIsFocused(true);
    }

    if (!divRef.current?.contains(event.target as Node)) {
      // Click occurred outside of the div, so remove focus
      divRef.current.blur();
      setIsFocused(false);
    }
  };

  // Attach the click event listener when the component mounts
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const className = classnames({
    'border-2': isFocused,
    rounded: isFocused,
    'border-blue-700': isFocused,
    'p-2': isFocused,
  });

  return (
    <div className={className} tabIndex={0} ref={divRef}>
      {children}
    </div>
  );
}
