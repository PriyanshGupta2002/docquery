import {
  DocumentListRequestParams,
  FetchDocUrlParams,
} from "@/types/document.types";
import { appApi } from "../axios";
import axios from "axios";

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

export const deleteFileFromImageKit = async (fileId: string) => {
  const { data } = await axios.delete(`/api/delete-file/${fileId}`);

  return data;
};
