import ConvoIndex from "@/components/chat";

const ChatPage = async ({
  params,
}: {
  params: Promise<{
    conversationId: string;
    docId: string;
  }>;
}) => {
  const { conversationId, docId } = await params;

  return (
    <div className="h-screen overflow-hidden">
      <ConvoIndex convoId={conversationId} docId={docId} />
    </div>
  );
};

export default ChatPage;
