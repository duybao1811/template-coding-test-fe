'use client';

import React, { useEffect, useRef } from 'react';
import InputChat from '@/views/HomeView/components/InputChat';
import MessageList from '@/views/HomeView/components/MessageList';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useChatScrollPagination } from '@/hooks/useChatScrollPagination';

const HomeView = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isLoadingHistory,
    isLoadingMore,
    hasMore,
    sendMessage,
    loadMoreMessages,
    isSending,
    handleStopStreaming,
  } = useChatMessages();

  useChatScrollPagination({
    containerRef: scrollContainerRef,
    onLoadMore: loadMoreMessages,
    enabled: hasMore && !isLoadingHistory && !isLoadingMore,
  });

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [isLoadingHistory]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage) return;

    const isAssistantStreaming =
      lastMessage.role === 'assistant' &&
      (lastMessage.status === 'loading' || lastMessage.status === 'streaming');

    const isUserMessage = lastMessage.role === 'user';

    if (isUserMessage || isAssistantStreaming) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-hidden"
      >
        <div className="container">
          <MessageList messages={messages} />
        </div>
      </div>

      <div className="container">
        <div className="pb-4">
          <InputChat onSend={sendMessage} isSending={isSending} onStop={handleStopStreaming} />
        </div>
      </div>
    </div>
  );
};

export default HomeView;