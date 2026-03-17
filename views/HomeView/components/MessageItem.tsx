'use client';
import React from 'react';
import clsx from 'clsx';
import { Message } from '@/types/Message.model';

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  const isUser = message.role === 'user';

  return (
    <div
      className={clsx(
        'flex w-full mb-2 animate-[fade-in_0.25s_ease-out]',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[75%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line',
          isUser
            ? 'bg-primary text-white  shadow-sm'
            : 'bg-transparent text-text-primary'
        )}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageItem;