'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {Message, MessageAttachment} from '@/types/Message.model';
import { chatApiService } from '@/services/chatApiService';
import { getOrCreateChatSessionId } from '@/utils/chatSession';
import { DEFAULT_LIMIT } from '@/constants';

type UseChatMessagesResult = {
  messages: Message[];
  isLoadingHistory: boolean;
  isSending: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  sendMessage: (text: string, images?: File[]) => Promise<void>;
  loadMoreMessages: () => Promise<void>;
  handleStopStreaming: () => void;
};

export const useChatMessages = (): UseChatMessagesResult => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);

  const sessionIdRef = useRef<string>('');
  const isInitialLoadedRef = useRef(false);

  const abortControllerRef = useRef<AbortController | null>(null);
  const currentAssistantMessageIdRef = useRef<string | null>(null);

  const mapHistoryToUiMessages = useCallback((items: Message[]): Message[] => {
    return items.map((item) => ({
      ...item,
      status: 'done',
    }));
  }, []);

  const loadInitialHistory = useCallback(async () => {
    try {
      setIsLoadingHistory(true);

      const sessionId = getOrCreateChatSessionId();
      sessionIdRef.current = sessionId;

      const result = await chatApiService.getHistory(sessionId, {
        limit: DEFAULT_LIMIT,
      });

      const historyMessages = mapHistoryToUiMessages(result.messages ?? []);

      setMessages(historyMessages);
      setHasMore(result.hasMore ?? false);
      setNextCursor(result.nextCursor ?? null);
      isInitialLoadedRef.current = true;
    } catch (error) {
      console.error('Failed to load chat history:', error);
    } finally {
      setIsLoadingHistory(false);
    }
  }, [mapHistoryToUiMessages]);

  useEffect(() => {
    void loadInitialHistory();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [loadInitialHistory]);

  const loadMoreMessages = useCallback(async () => {
    if (!isInitialLoadedRef.current) return;
    if (isLoadingMore || isLoadingHistory || !hasMore || !nextCursor) return;

    try {
      setIsLoadingMore(true);

      const result = await chatApiService.getHistory(sessionIdRef.current, {
        beforeMessageId: nextCursor,
        limit: 20,
      });

      const olderMessages = mapHistoryToUiMessages(result.messages ?? []);

      setMessages((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const deduped = olderMessages.filter((m) => !existingIds.has(m.id));
        return [...deduped, ...prev];
      });

      setHasMore(result.hasMore ?? false);
      setNextCursor(result.nextCursor ?? null);
    } catch (error) {
      console.error('Failed to load more chat history:', error);
    } finally {
      setIsLoadingMore(false);
    }
  }, [
    hasMore,
    isLoadingHistory,
    isLoadingMore,
    mapHistoryToUiMessages,
    nextCursor,
  ]);

  const handleStopStreaming = useCallback(() => {
    abortControllerRef.current?.abort();

    const assistantMessageId = currentAssistantMessageIdRef.current;

    if (assistantMessageId) {
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
              ...message,
              status: 'stopped',
            }
            : message,
        ),
      );
    }

    setIsSending(false);
    abortControllerRef.current = null;
    currentAssistantMessageIdRef.current = null;
  }, []);

  const sendMessage = useCallback(
    async (text: string, images: File[] = []) => {
      const trimmedText = text.trim();

      if ((!trimmedText && images.length === 0) || isSending) {
        return;
      }

      const sessionId = sessionIdRef.current || getOrCreateChatSessionId();
      sessionIdRef.current = sessionId;

      const assistantTempId = crypto.randomUUID();
      const controller = new AbortController();

      abortControllerRef.current = controller;
      currentAssistantMessageIdRef.current = assistantTempId;

      setIsSending(true);

      const userMessageId = crypto.randomUUID();

      try {
        const localPreviewAttachments: MessageAttachment[] = images.map((file) => ({
          id: crypto.randomUUID(),
          url: URL.createObjectURL(file),
        }));

        setMessages((prev) => [
          ...prev,
          {
            id: userMessageId,
            content: trimmedText,
            role: 'user',
            status: 'done',
            attachments: localPreviewAttachments,
          },
          {
            id: assistantTempId,
            content: '',
            role: 'assistant',
            status: 'loading',
          },
        ]);

        await chatApiService.streamChat({
          sessionId,
          message: trimmedText,
          images: images,
          signal: controller.signal,
          onChunk: (chunk) => {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantTempId
                  ? {
                    ...message,
                    content: message.content + chunk,
                    status: 'streaming',
                  }
                  : message,
              ),
            );
          },
          onDone: () => {
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantTempId
                  ? {
                    ...message,
                    status: 'done',
                  }
                  : message,
              ),
            );
          },
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantTempId
                ? {
                  ...message,
                  status: 'stopped',
                }
                : message,
            ),
          );
        } else {
          console.error('Failed to send message:', error);

          setMessages((prev) => {
            const hasAssistant = prev.some((message) => message.id === assistantTempId);

            if (!hasAssistant) {
              return [
                ...prev,
                {
                  id: assistantTempId,
                  content: 'Sorry, something went wrong.',
                  role: 'assistant',
                  status: 'error',
                },
              ];
            }

            return prev.map((message) =>
              message.id === assistantTempId
                ? {
                  ...message,
                  content: 'Sorry, something went wrong.',
                  status: 'error',
                }
                : message,
            );
          });
        }
      } finally {
        setIsSending(false);
        abortControllerRef.current = null;
        currentAssistantMessageIdRef.current = null;
      }
    },
    [isSending],
  );

  return {
    messages,
    isLoadingHistory,
    isSending,
    isLoadingMore,
    hasMore,
    sendMessage,
    loadMoreMessages,
    handleStopStreaming,
  };
};