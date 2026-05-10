"use client";

import { doc } from "@/types/document.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import { ProgressWithLabel } from "./ProgressWithLabel";
import { StatusCell } from "./StatusCell";

import { Button } from "@/components/ui/button";
import { ro } from "zod/v4/locales/index.js";
import Action from "./Action";

export const columns: ColumnDef<doc>[] = [
  {
    accessorKey: "id",
    header: () => <div className="w-[100px]">Id</div>,
  },
  {
    accessorKey: "doc_url",
    header: "Doc Url",
  },

  {
    accessorKey: "name",

    header: () => <div>File Name</div>,

    cell: ({ row }) => {
      const pdfUrl = row?.getValue("doc_url") as string;
      const fileName = row?.getValue("name") as string;

      return (
        <div>
          <Link
            href={pdfUrl}
            target="__blank"
            className="block truncate text-blue-600 underline font-semibold"
          >
            {fileName}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",

    cell: ({ row }) => {
      const progress = row?.getValue("progress") as number;
      const status = row?.getValue("status") as string;
      return <ProgressWithLabel label={status} progressLevel={progress} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",

    cell: ({ row }) => {
      const docId = row.getValue("id") as number;

      return <StatusCell docId={docId} />;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const doc_id = row.getValue("id") as number;
      const title = `${row.getValue("name")} - ${doc_id}`;
      const isStatusCompleted = row.getValue("status") === "completed";
      return (
        <Action
          doc_id={doc_id}
          isStatusCompleted={isStatusCompleted}
          title={title}
        />
      );
    },
  },
];
