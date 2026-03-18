import {GetHistoryParams, HistoryResponse} from '@/types/Message.model';
import {API_BASE_URL} from "@/config/config";
import {parseJson} from "@/utils";
import {StreamEventPayload, StreamChatParams} from "@/types/StreamEvent.model";
import {UploadImagesParams, UploadImagesResponse} from "@/types/UploadImage.model";

const formatResponse = async (response: Response): Promise<void> => {
  if (response.ok) {
    return;
  }

  let errorMessage = `Request failed with status ${response.status}`;

  try {
    const data = (await response.json()) as { message?: string };
    if (data?.message) {
      errorMessage = data.message;
    }
  } catch {}

  throw new Error(errorMessage);
};

export const chatApiService = {
  async getHistory(sessionId: string, params?: GetHistoryParams): Promise<HistoryResponse> {
    const searchParams = new URLSearchParams();

    if (params?.beforeMessageId) {
      searchParams.set('beforeMessageId', params.beforeMessageId);
    }

    if (params?.limit) {
      searchParams.set('limit', String(params.limit));
    }

    const query = searchParams.toString();

    const response = await fetch(
      `${API_BASE_URL}/chat/history/${encodeURIComponent(sessionId)}${query ? `?${query}` : ''}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      },
    );

    await formatResponse(response);

    return response.json();
  },

  async streamChat({
     sessionId,
     attachmentIds,
     message,
     onMeta,
     onChunk,
     onDone,
    signal,
   }: StreamChatParams): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({
        sessionId,
        message,
        attachmentIds,
      }),
      signal
    });

    await formatResponse(response);

    if (!response.body) {
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';

    while (true) {
      const { value, done } = await reader.read();

      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      const rawEvents = buffer.split('\n\n');
      buffer = rawEvents.pop() ?? '';

      for (const rawEvent of rawEvents) {
        const line = rawEvent.trim();

        if (!line.startsWith('data: ')) {
          continue;
        }

        const jsonString = line.slice(6);
        const payload = parseJson<StreamEventPayload>(jsonString);

        if (payload.type === 'meta') {
          onMeta?.({
            conversationId: payload.conversationId ?? '',
            messageId: payload.messageId ?? '',
          });
          continue;
        }

        if (payload.type === 'chunk') {
          if (payload.content) {
            onChunk?.(payload.content);
          }
          continue;
        }

        if (payload.type === 'done') {
          onDone?.({
            sessionId: payload.sessionId,
            conversationId: payload.conversationId,
            userMessageId: payload.userMessageId,
            assistantMessageId: payload.assistantMessageId,
          });
          continue;
        }

        if (payload.type === 'error') {
          throw new Error(payload.message ?? 'Stream error');
        }
      }
    }
  },

  async uploadImages({
     sessionId,
     message,
     images,
   }: UploadImagesParams): Promise<UploadImagesResponse> {
    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('message', message);

    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await fetch(`${API_BASE_URL}/chat/upload`, {
      method: 'POST',
      body: formData,
    });

    await formatResponse(response);

    return response.json();
  },
};