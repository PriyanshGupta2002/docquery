import { useMutation } from "@tanstack/react-query";
import { uploadPdf } from "./upload.api";

export const useUploadPdf = () => {
  return useMutation({
    mutationFn: uploadPdf,
  });
};
