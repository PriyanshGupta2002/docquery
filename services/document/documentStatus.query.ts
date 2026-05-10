import { useQuery } from "@tanstack/react-query";
import { fetchDocumentStatus } from "./documentStatus.api";

export const useDocumentStatus = (docId: number) => {
  return useQuery({
    queryKey: ["document-status", docId],

    queryFn: () => fetchDocumentStatus(docId),

    refetchInterval: (query) => {
      console.log("status Query", query);

      const status = query.state.data?.data?.status;

      if (status === "completed") {
        return false;
      }

      return 2000;
    },
  });
};
