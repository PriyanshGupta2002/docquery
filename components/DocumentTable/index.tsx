"use client";
import { useMemo, useState } from "react";
import { Card } from "../ui/card";
import { FileText, MessageSquare } from "lucide-react";
import { DocumentListRequestParams } from "@/types/document.types";
import { useFetchDocuments } from "@/services/document/document.query";
import { DataTable } from "./DataTable";
import { columns } from "./columns";

export type TableFilters = {
  page: number;
  limit: number;
};

export const DocumentTable = () => {
  const [tableFilters, setTableFilters] = useState<TableFilters>({
    limit: 10,
    page: 1,
  });

  const apiParams = useMemo(() => {
    const params: DocumentListRequestParams = {
      limit: 10,
      page: 1,
    };

    if (tableFilters.limit && tableFilters.page) {
      params.limit = tableFilters.limit;
      params.page = tableFilters.page;
    }

    return params;
  }, [tableFilters.limit, tableFilters.page]);

  const { data: documentData, isLoading } = useFetchDocuments(apiParams);

  return (
    <div className="space-y-3">
      <Card className="relative overflow-hidden border bg-gradient-to-r from-muted/40 to-muted/10 p-6 shadow-sm">
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        <div className="relative flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Your Uploaded Documents
            </h2>

            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
              Browse all your uploaded files, manage them easily, and start
              chatting with your documents using AI-powered conversations.
            </p>

            <div className="flex items-center gap-2 pt-2 text-sm font-medium text-primary">
              <MessageSquare className="h-4 w-4" />
              Click on any document to start chatting
            </div>
          </div>
        </div>
      </Card>
      {isLoading && <h2>Loading...</h2>}

      {!isLoading && (
        <DataTable
          totalRows={documentData?.data?.count}
          columns={columns}
          setTableFilters={setTableFilters}
          tableFilters={tableFilters}
          data={documentData?.data?.docs}
        />
      )}
    </div>
  );
};

export default DocumentTable;
