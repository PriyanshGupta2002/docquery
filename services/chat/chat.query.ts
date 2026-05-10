import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createChat, fetchChats, type CreateChatPayload } from "./chat.api";

export const useFetchChats = (conversation_id: number) =>
  useInfiniteQuery({
    queryKey: ["chats", conversation_id],
    queryFn: ({ pageParam = 1 }) => fetchChats(conversation_id, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetched = allPages.flatMap((p) => p.data.chats).length;
      return fetched < lastPage.data.count ? allPages.length + 1 : undefined;
    },
    select: (data) => ({
      chats: data.pages.flatMap((p) => p.data.chats),
      count: data.pages[0]?.data.count ?? 0,
      pages: data.pages,
    }),
  });

export const useCreateChat = (conversation_id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateChatPayload) => createChat(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats", conversation_id] });
    },
  });
};
