"use client";

import { FC, useState } from "react";

import { MoreVertical, MessageSquare, Eye, Trash2 } from "lucide-react";

import { useRouter } from "next/navigation";

import { useCreateConversation } from "@/services/conversation/conversation.query";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";

import { PdfPreviewModal } from "@/components/shared/pdf-preview-modal";

interface ActionProps {
  isStatusCompleted: boolean;
  title: string;
  doc_id: number;
  pdfUrl: string;
}

const Action: FC<ActionProps> = ({
  isStatusCompleted,
  title,
  doc_id,
  pdfUrl,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);

  const { mutateAsync: createConversation } = useCreateConversation();

  const router = useRouter();

  const handleCreateConversation = async () => {
    const data = await createConversation({
      doc_id,
      title,
    });

    router.push(`/chat/${data?.data?.conversation_id}/${doc_id}`);
  };

  const handleDelete = async () => {
    console.log("Delete document", doc_id);
  };

  console.log(pdfUrl);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="
              h-10 w-10
              rounded-xl
              bg-white
              hover:bg-zinc-100
            "
          >
            <MoreVertical className="h-6 w-6 text-zinc-700" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="
            w-44 border-zinc-200
            bg-white text-zinc-800
            shadow-xl
          "
        >
          <DropdownMenuItem
            onClick={() => setPreviewOpen(true)}
            className="cursor-pointer"
          >
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={!isStatusCompleted}
            onClick={handleCreateConversation}
            className="cursor-pointer"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Chat
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={handleDelete}
            className="
              cursor-pointer text-red-500
              focus:text-red-500
            "
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PdfPreviewModal
        open={previewOpen}
        onOpenChange={setPreviewOpen}
        pdfUrl={pdfUrl ?? null}
        title={title}
      />
    </>
  );
};

export default Action;
