"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { UploadCloud, FileText, X, Eye, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

import { useUploadPdf } from "@/services/upload/upload.service";
import { toast } from "sonner";
import { useDeleteImageFromImageKit } from "@/services/document/document.query";
import { file } from "zod";

const Upload = () => {
  const [progress, setProgress] = useState(0);
  const [pdfFileInfo, setPdfFileInfo] = useState<{
    pdfUrl: string;
    name: string;
    fileId: string;
  } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const { mutateAsync: uploadPdf, isPending } = useUploadPdf();
  const { mutateAsync: deleteUploadedPdf } = useDeleteImageFromImageKit();

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`,
        );
      }

      const data = await response.json();

      const { signature, expire, token, publicKey } = data;

      return { signature, expire, token, publicKey };
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (!file) return;

    const abortController = new AbortController();

    let authParams;

    setUploading(true);
    setProgress(0);

    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate:", authError);
      setUploading(false);
      return;
    }

    const { signature, expire, token, publicKey } = authParams;

    try {
      const uploadResponse = await upload({
        expire,
        token,
        signature,
        publicKey,

        file,
        fileName: file.name,

        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },

        abortSignal: abortController.signal,
      });

      setPdfFileInfo((prev) => ({
        ...prev,
        name: uploadResponse.name || "",
        pdfUrl: uploadResponse.url || "",
        fileId: uploadResponse?.fileId || "",
      }));
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
      } else {
        console.error("Upload error:", error);
      }
    } finally {
      setUploading(false);
    }
  }, []);

  const handleFinalUpload = async () => {
    if (!pdfFileInfo?.pdfUrl || typeof pdfFileInfo.pdfUrl !== "string") return;

    try {
      await uploadPdf({
        doc_url: pdfFileInfo.pdfUrl,
        name: pdfFileInfo.name,
      });
      setPdfFileInfo(null);
      toast.success("Document uploaded successfully. Processing has started.");
    } catch (error) {
      console.error(error);
    }
  };

  const removePdf = async () => {
    await deleteUploadedPdf(pdfFileInfo?.fileId as string);
    setPdfFileInfo(null);
    setProgress(0);
    toast.success("File deleted successfully");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <>
      <div className="mx-auto w-full max-w-xl">
        {!pdfFileInfo?.pdfUrl && !uploading && (
          <Card
            {...getRootProps()}
            className={`border-dashed cursor-pointer transition-all duration-200 p-10 rounded-3xl bg-muted/30 hover:bg-muted/50 ${
              isDragActive ? "border-primary" : ""
            }`}
          >
            <input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm border">
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Upload your PDF</h3>

                <p className="text-sm text-muted-foreground">
                  Drag & drop your PDF here or click to browse
                </p>
              </div>
            </div>
          </Card>
        )}

        {uploading && (
          <Card className="p-5 rounded-3xl space-y-4">
            <div className="flex items-start gap-4">
              <Skeleton className="h-16 w-14 rounded-xl" />

              <div className="flex-1 space-y-3">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-45" />
                  <Skeleton className="h-3 w-30" />
                </div>

                <Progress value={progress} />

                <p className="text-xs text-muted-foreground">
                  Uploading PDF... {Math.round(progress)}%
                </p>
              </div>
            </div>
          </Card>
        )}

        {pdfFileInfo?.pdfUrl && !uploading && (
          <Card className="p-5 rounded-3xl">
            <div className="flex items-center justify-between gap-4">
              <div
                onClick={() => setPreviewOpen(true)}
                className="flex flex-1 items-center gap-4 cursor-pointer"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                  <FileText className="h-7 w-7 text-red-500" />
                </div>

                <div>
                  <p className="font-medium">Uploaded PDF</p>

                  <p className="text-sm text-muted-foreground">
                    Click to preview document
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setPreviewOpen(true)}
                >
                  <Eye className="h-4 w-4" />
                </Button>

                <Button size="icon" variant="destructive" onClick={removePdf}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              className="w-full mt-5 rounded-xl"
              onClick={handleFinalUpload}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                "Upload PDF"
              )}
            </Button>
          </Card>
        )}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-5xl h-1/2">
          <DialogHeader>
            <DialogTitle>View Pdf</DialogTitle>
          </DialogHeader>
          {pdfFileInfo?.pdfUrl && (
            <div className="w-full">
              <iframe src={pdfFileInfo.pdfUrl} className="w-full h-full" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Upload;
