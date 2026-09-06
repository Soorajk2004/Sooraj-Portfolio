import { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/EditModeContext';

export default function InlineEdit({
  value = '',
  onChange,
  placeholder = 'Click to edit...',
  className = '',
  multiline = false,
  tag: Tag = 'span',
  ariaLabel,
}) {
  const { isEditMode } = useContent();
  const [localValue, setLocalValue] = useState(value);
  const textareaRef = useRef(null);

  useEffect(() => {
    setLocalValue(value || '');
  }, [value]);

  // Adjust textarea height dynamically to prevent layout jumps
  useEffect(() => {
    if (multiline && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [localValue, multiline, isEditMode]);

  // If not in edit mode and value is empty, return null (hide element in public view)
  if (!isEditMode && (!value || value.trim() === '')) {
    return null;
  }

  if (!isEditMode) {
    if (multiline) {
      return (
        <div className={className}>
          {value.split('\n\n').map((paragraph, index) => (
            <p key={index} className={index > 0 ? 'mt-4' : ''}>
              {paragraph}
            </p>
          ))}
        </div>
      );
    }
    return <Tag className={className}>{value}</Tag>;
  }

  // Edit Mode view
  const editModeStyle = 'outline-dashed outline-1 outline-amberAccent/70 hover:outline-amberAccent focus:outline-2 focus:outline-amberAccent rounded px-1 transition-all';

  if (multiline) {
    return (
      <textarea
        ref={textareaRef}
        rows={3}
        value={localValue}
        aria-label={ariaLabel || placeholder}
        placeholder={placeholder}
        onChange={(e) => {
          setLocalValue(e.target.value);
          if (onChange) onChange(e.target.value);
        }}
        className={`w-full bg-elevation1/40 text-inherit resize-none overflow-hidden ${editModeStyle} ${className}`}
      />
    );
  }

  return (
    <input
      type="text"
      value={localValue}
      aria-label={ariaLabel || placeholder}
      placeholder={placeholder}
      onChange={(e) => {
        setLocalValue(e.target.value);
        if (onChange) onChange(e.target.value);
      }}
      className={`bg-transparent text-inherit w-full ${editModeStyle} ${className}`}
    />
  );
}
