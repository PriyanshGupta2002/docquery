/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteFileFromImageKit,
  fetchDocuments,
  fetchDocUrl,
} from "./document.api";
import {
  DocumentListRequestParams,
  FetchDocUrlParams,
} from "@/types/document.types";

export const useFetchDocuments = (params: DocumentListRequestParams) => {
  return useQuery({
    queryKey: ["documents", params],

    queryFn: () => fetchDocuments(params),

    refetchInterval: (query) => {
      const docs = query.state.data?.data?.docs;

      if (!docs?.length) {
        return 2000;
      }

      const allCompleted = docs.every((doc: any) => doc.status === "completed");

      return allCompleted ? false : 2000;
    },
  });
};

export const useFetchDocUrl = (params: FetchDocUrlParams) => {
  return useQuery({
    queryKey: ["docUrl", params.doc_id],
    queryFn: () => fetchDocUrl({ doc_id: params.doc_id }),
  });
};

export const useDeleteImageFromImageKit = () => {
  return useMutation({
    mutationFn: deleteFileFromImageKit,
  });
};
