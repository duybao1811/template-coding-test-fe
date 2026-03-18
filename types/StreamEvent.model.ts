export type StreamEventPayload =
  | {
  type: 'meta';
  conversationId?: string;
  messageId?: string;
}
  | {
  type: 'chunk';
  content?: string;
}
  | {
  type: 'done';
  sessionId?: string;
  conversationId?: string;
  userMessageId?: string;
  assistantMessageId?: string;
}
  | {
  type: 'error';
  message?: string;
};

export type StreamMetaPayload = {
  conversationId: string;
  messageId: string;
};

export type StreamDonePayload = {
  sessionId?: string;
  conversationId?: string;
  userMessageId?: string;
  assistantMessageId?: string;
};

export type StreamChatParams = {
  sessionId: string;
  message: string;
  attachmentIds?: string[];
  onMeta?: (payload: StreamMetaPayload) => void;
  onChunk?: (chunk: string) => void;
  onDone?: (payload: StreamDonePayload) => void;
  signal?: AbortSignal;
};