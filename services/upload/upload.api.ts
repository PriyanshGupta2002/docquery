import { appApi } from "../axios";

export const uploadPdf = async (doc_url: string) => {
  const { data } = await appApi.post("/documents/upload", {
    doc_url,
  });
  return data;
};
