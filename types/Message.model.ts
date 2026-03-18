export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  createdAt?: string;
  status?: MessageStatus;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  id: string;
  url: string;
}

export type MessageRole = 'user' | 'assistant'

export type MessageStatus = 'loading' | 'streaming' | 'done' | 'error' | 'stopped';

export interface GetHistoryParams {
  beforeMessageId?: string;
  limit?: number;
}

export interface HistoryResponse {
  sessionId: string;
  messages: Message[];
  hasMore?: boolean;
  nextCursor?: string | null
}