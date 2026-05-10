"use client";
import { useFetchDocUrl } from "@/services/document/document.query";
import React, { useState, useRef, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PdfViewer = ({ docId }: { docId: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [containerWidth, setContainerWidth] = useState<number>(600);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width;
      if (width) setContainerWidth(width - 48);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const { data, isLoading } = useFetchDocUrl({ doc_id: Number(docId) });
  const pdfUrl = data?.data?.url;

  const goToPrev = () => setPageNumber((p) => Math.max(1, p - 1));
  const goToNext = () => setPageNumber((p) => Math.min(numPages ?? 1, p + 1));

  return (
    <div className="flex flex-col h-full bg-neutral-100 dark:bg-neutral-900 overflow-auto">
      <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {isLoading
            ? "Loading..."
            : `Page ${pageNumber} of ${numPages ?? "—"}`}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            disabled={pageNumber <= 1}
            className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 disabled:opacity-40 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition"
          >
            ← Prev
          </button>
          <button
            onClick={goToNext}
            disabled={pageNumber >= (numPages ?? 1)}
            className="px-3 py-1.5 text-sm rounded-md border border-neutral-200 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 disabled:opacity-40 hover:bg-neutral-50 dark:hover:bg-neutral-600 transition"
          >
            Next →
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 overflow-auto flex justify-center items-start py-6 px-4"
      >
        {isLoading ? (
          <div className="text-sm text-neutral-400">Loading PDF...</div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <div className="text-sm text-neutral-400">Rendering PDF...</div>
            }
            error={
              <div className="text-sm text-red-500">Failed to load PDF.</div>
            }
          >
            <Page
              pageNumber={pageNumber}
              width={containerWidth}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          </Document>
        )}
      </div>
    </div>
  );
};

export default PdfViewer;
