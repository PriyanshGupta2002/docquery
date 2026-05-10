import { appApi } from "../axios";

export const fetchDocumentStatus = async (docId: number) => {
  const { data } = await appApi.get(`/documents/${docId}/status`);

  return data;
};
