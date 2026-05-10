import { appApi } from "../axios";

export interface ChatResponse {
  id: number;
  conversation_id: number;
  query: string;
  answer: string;
}

export interface ChatApiResponse {
  success: boolean;
  data: {
    chats: ChatResponse[];
    count: number;
  };
}

export interface CreateChatPayload {
  conversation_id: number;
  query: string;
}

export const fetchChats = async (
  conversation_id: number,
  page: number,
): Promise<ChatApiResponse> => {
  const { data } = await appApi.get(`/chat/${conversation_id}`, {
    params: {
      page,
    },
  });
  return data;
};

export const createChat = async (
  payload: CreateChatPayload,
): Promise<ChatApiResponse> => {
  const { data } = await appApi.post("/chat", payload);
  return data;
};
