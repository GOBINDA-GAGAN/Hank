
import { api } from "../api/axios";

export const createTicketApi = async ({
  issue,
  conversationId,
}) => {
  const response = await api.post("/tickets", {
    issue,
    ...(conversationId ? { conversationId } : {}),
  });

  return response.data;
};

export const getTicketByIdApi = async (ticketId) => {
  const response = await api.get(
    `/tickets/${encodeURIComponent(ticketId)}`
  );

  return response.data;
};


export const getAllSupportItemsApi = async (params = {}) => {
  const response = await api.get("/tickets", { params });
  return response.data;
};