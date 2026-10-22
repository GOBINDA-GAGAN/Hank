import { api } from "../api/axios";

export const sendMessageApi = async (payload) => {
  const response = await api.post("/chat/message", payload);
  return response.data;
};

export const getConversationApi = async (conversationId) => {
  const response = await api.get(
    `/chat/conversations/${encodeURIComponent(conversationId)}`
  );

  return response.data;
};