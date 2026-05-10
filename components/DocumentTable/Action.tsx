"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { useCreateConversation } from "@/services/conversation/conversation.query";
import { useRouter } from "next/navigation";

interface ActionProps {
  isStatusCompleted: boolean;
  title: string;
  doc_id: number;
}
const Action: FC<ActionProps> = ({ isStatusCompleted, title, doc_id }) => {
  const { mutateAsync: createConversation } = useCreateConversation();
  const router = useRouter();

  const handleCreateConversation = async () => {
    const data = await createConversation({
      doc_id,
      title,
    });
    router.push(`/chat/${data?.data?.conversation_id}/${doc_id}`);
  };
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={handleCreateConversation}
        disabled={!isStatusCompleted}
        variant={"default"}
        size={"lg"}
      >
        Chat
      </Button>
      <Button disabled={!isStatusCompleted} variant={"destructive"} size={"lg"}>
        Delete
      </Button>
    </div>
  );
};

export default Action;
