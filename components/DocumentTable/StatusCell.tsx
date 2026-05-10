"use client";

import { cn, statusMapping } from "@/lib/utils";
import { useDocumentStatus } from "@/services/document/documentStatus.query";

type Props = {
  docId: number;
};

export const StatusCell = ({ docId }: Props) => {
  const { data } = useDocumentStatus(docId);

  const apiStatus = data?.data?.status;

  const normalizedStatus =
    apiStatus === "completed" ? "completed" : "processing";

  return (
    <div
      className={cn(
        "capitalize rounded-md text-black font-semibold text-center p-2",
        statusMapping[normalizedStatus],
      )}
    >
      {normalizedStatus}
    </div>
  );
};
