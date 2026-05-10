import { createConversationType } from "@/types/conversation.types";
import { appApi } from "../axios";

export const createConversation = async (params: createConversationType) => {
  const { data } = await appApi.post("/conversations", params);
  return data;
};
