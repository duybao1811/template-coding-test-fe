import React from 'react';
import MarkdownMessage from "@/views/HomeView/components/MarkdownMessage";

interface Props {
  content: string;
}

const MessageAssistant = ({ content }: Props) => {
  return (
    <div className={'flex w-full animate-[fade-in_0.25s_ease-out] justify-start'}>
      <div className={'py-3 text-sm text-text-primary'}>
        <MarkdownMessage content={content} />
      </div>
    </div>
  );
};

export default React.memo(MessageAssistant);