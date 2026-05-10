import { useMutation } from "@tanstack/react-query";
import { createConversation } from "./conversation.api";

export const useCreateConversation = () => {
  return useMutation({
    mutationFn: createConversation,
  });
};
