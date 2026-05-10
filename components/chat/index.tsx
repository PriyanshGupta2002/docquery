"use client";
import dynamic from "next/dynamic";
import ChatWindow from "./ChatWindow";

const PdfViewer = dynamic(() => import("@/components/chat/PdfViewer"), {
  ssr: false,
  loading: () => <p>Loading PDF...</p>,
});

const ConvoIndex = ({ docId, convoId }: { docId: string; convoId: string }) => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-[40%_60%] overflow-hidden">
      <PdfViewer docId={docId} />
      <ChatWindow conversationId={Number(convoId)} />
    </div>
  );
};

export default ConvoIndex;
