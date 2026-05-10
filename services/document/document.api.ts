import {
  DocumentListRequestParams,
  FetchDocUrlParams,
} from "@/types/document.types";
import { appApi } from "../axios";

export const fetchDocuments = async (params: DocumentListRequestParams) => {
  const { data } = await appApi.get("/documents", {
    params,
  });
  return data;
};

export const fetchDocUrl = async (params: FetchDocUrlParams) => {
  const { data } = await appApi.get(`/documents/${params.doc_id}`);
  return data;
};
