'use client';
import React, { useCallback, useEffect, useRef } from 'react';
import clsx from 'clsx';

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const MAX_HEIGHT = 220;

const Input = ({ value, className, ...rest }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = 'auto';

    const nextHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [value, resizeTextarea]);

  return (
    <textarea
      ref={textareaRef}
      rows={1}
      value={value}
      placeholder="Ask template.net"
      className={clsx(
        'w-full resize-none bg-transparent px-2 text-sm placeholder:text-gray-500 outline-none scroll-thin min-h-[58px]',
        className
      )}
      {...rest}
    />
  );
};

export default Input;