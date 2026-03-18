const CHAT_SESSION_KEY = 'chat_session_id';

export const getOrCreateChatSessionId = (): string => {
  if (typeof window === 'undefined') {
    return '';
  }

  const existingSessionId = localStorage.getItem(CHAT_SESSION_KEY);
  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = crypto.randomUUID();
  localStorage.setItem(CHAT_SESSION_KEY, newSessionId);

  return newSessionId;
};