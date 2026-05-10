"use client";
import { useState, useRef, useEffect } from "react";
import { useFetchChats, useCreateChat } from "@/services/chat/chat.query";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { SendHorizonal } from "lucide-react";
import ReactMarkdown from "react-markdown";

const ChatWindow = ({ conversationId }: { conversationId: number }) => {
  const [query, setQuery] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const topSentinelRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef(0);
  const initialScrollDone = useRef(false);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useFetchChats(conversationId);

  const { mutate: sendChat, isPending } = useCreateChat(conversationId);

  const chats = data?.chats ?? [];

  // Scroll to bottom on first load
  useEffect(() => {
    if (!isLoading && chats.length > 0 && !initialScrollDone.current) {
      initialScrollDone.current = true;
      bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }
  }, [isLoading, chats.length]);

  // Scroll to bottom on new message sent
  useEffect(() => {
    if (initialScrollDone.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats.length]);

  // Restore scroll position after prepending older messages
  useEffect(() => {
    if (!isFetchingNextPage && scrollContainerRef.current) {
      const newScrollHeight = scrollContainerRef.current.scrollHeight;
      scrollContainerRef.current.scrollTop =
        newScrollHeight - prevScrollHeightRef.current;
    }
  }, [isFetchingNextPage]);

  // Intersection observer on top sentinel
  useEffect(() => {
    const sentinel = topSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          prevScrollHeightRef.current =
            scrollContainerRef.current?.scrollHeight ?? 0;
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleSend = () => {
    const trimmed = query.trim();
    if (!trimmed || isPending) return;
    sendChat({ conversation_id: conversationId, query: trimmed });
    setQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0 border-l bg-background overflow-hidden">
      {/* Header */}
      <div className="flex-none flex items-center justify-between px-5 py-3 border-b">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-sm font-medium">Chat</span>
        </div>
        {!isLoading && (
          <span className="text-xs text-muted-foreground">
            {data?.count ?? 0} messages
          </span>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-0 overflow-y-auto px-5 py-4 flex flex-col gap-5"
      >
        {/* Top sentinel */}
        <div ref={topSentinelRef} className="h-1 w-full shrink-0" />

        {/* Loading older messages */}
        {isFetchingNextPage && (
          <div className="flex justify-center py-2">
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Initial skeleton */}
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "flex flex-col gap-2",
                i % 2 === 0 ? "items-end" : "items-start",
              )}
            >
              <Skeleton className="h-3 w-20 rounded-full" />
              <Skeleton
                className={cn(
                  "h-12 rounded-2xl",
                  i % 2 === 0 ? "w-48" : "w-64",
                )}
              />
            </div>
          ))
        ) : chats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <SendHorizonal className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              Ask anything about the document
            </p>
          </div>
        ) : (
          chats.map((chat) => (
            <div key={chat.id} className="flex flex-col gap-3">
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-muted rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {chat.query}
                </div>
              </div>
              <div className="flex justify-start">
                <div className="max-w-[80%] border rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed text-foreground prose prose-sm dark:prose-invert [&>*]:break-words [&>pre]:overflow-x-auto [&>pre]:whitespace-pre">
                  <ReactMarkdown>{chat.answer}</ReactMarkdown>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Pending new message */}
        {isPending && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-muted rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm text-muted-foreground">
                {query || "..."}
              </div>
            </div>
            <div className="flex justify-start">
              <div className="border rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="flex-none px-4 py-3 border-t">
        <div className="flex items-end gap-2 rounded-2xl border bg-muted/40 px-4 py-2">
          <Textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about the document..."
            rows={1}
            className="flex-1 min-h-0 border-0 bg-transparent shadow-none resize-none text-sm placeholder:text-muted-foreground focus-visible:ring-0 p-0 py-1 max-h-32"
          />
          <Button
            size="icon"
            onClick={handleSend}
            disabled={!query.trim() || isPending}
            className="h-8 w-8 rounded-xl shrink-0 mb-0.5"
          >
            <SendHorizonal className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 px-1">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  );
};

export default ChatWindow;
