"use client";

import { doc } from "@/types/document.types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

import Action from "./Action";
import { CircularProgress } from "./CircularProgressBar";

export const columns: ColumnDef<doc>[] = [
  {
    id: "sno",
    size: 52,
    minSize: 52,
    maxSize: 52,

    header: () => (
      <div className="text-xs font-semibold text-zinc-500">SNo.</div>
    ),

    cell: ({ row }) => (
      <div className="text-sm font-medium text-zinc-700">{row.index + 1}</div>
    ),
  },

  { accessorKey: "doc_url", header: "Doc Url" },

  {
    accessorKey: "name",
    size: 260,
    minSize: 140,
    maxSize: 320,

    header: () => (
      <div className="text-xs font-semibold text-zinc-500">Name</div>
    ),

    cell: ({ row }) => {
      const pdfUrl = row.original.doc_url || "";
      const fileName = row.original.name;

      return (
        <Link
          href={pdfUrl}
          target="_blank"
          className="block truncate text-sm font-medium text-zinc-900 transition-colors hover:text-blue-600"
        >
          {fileName}
        </Link>
      );
    },
  },

  {
    accessorKey: "progress",
    size: 80,
    minSize: 72,
    maxSize: 100,

    header: () => (
      <div className="text-xs font-semibold text-zinc-500">Status</div>
    ),

    cell: ({ row }) => {
      const progress = row.getValue("progress") as number;

      return (
        <div className="flex items-center">
          <CircularProgress value={progress} />
        </div>
      );
    },
  },

  {
    id: "actions",
    size: 80,
    minSize: 72,
    maxSize: 100,

    header: () => (
      <div className="text-xs text-center font-semibold text-zinc-500">
        Actions
      </div>
    ),

    cell: ({ row }) => {
      const doc_id = row.original.id;
      const title = `${row.original.name} - ${doc_id}`;
      const isStatusCompleted = row.original.status === "completed";
      const pdfUrl = row.original.doc_url || "";

      return (
        <div className="flex justify-center w-full">
          <Action
            doc_id={Number(doc_id)}
            isStatusCompleted={isStatusCompleted}
            title={title}
            pdfUrl={pdfUrl}
          />
        </div>
      );
    },
  },
];
