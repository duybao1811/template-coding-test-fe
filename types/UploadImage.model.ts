import { MessageAttachment } from './Message.model';

export interface UploadImagesParams {
  sessionId: string;
  message: string;
  images: File[];
}

export interface UploadImagesResponse {
  message: string;
  data: {
    conversationId: string;
    messageId: string;
    attachments: MessageAttachment[];
  };
}