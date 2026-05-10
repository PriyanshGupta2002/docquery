import { appApi } from "../axios";

interface UploadPdfPayload {
  doc_url: string;
  name: string;
}

export const uploadPdf = async ({ doc_url, name }: UploadPdfPayload) => {
  const { data } = await appApi.post("/documents/upload", {
    doc_url,
    name,
  });

  return data;
};
