"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { TableFilters } from ".";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMemo } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalRows: number;
  setTableFilters: React.Dispatch<React.SetStateAction<TableFilters>>;
  tableFilters: TableFilters;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalRows,
  tableFilters,
  setTableFilters,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      columnVisibility: {
        doc_url: false,
      },
    },
  });

  const totalPages = useMemo(() => {
    const total = totalRows / tableFilters.limit;
    return Math.ceil(total);
  }, [tableFilters.limit, totalRows]);

  console.log(totalPages);

  return (
    <div className="overflow-hidden rounded-md border p-3">
      <Table className="table-fixed w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center p-2 gap-5 justify-end">
        <div>
          <span>Total {totalRows} records</span>
        </div>
        <Select
          value={`${tableFilters.limit}`}
          onValueChange={(value) => {
            setTableFilters((prev) => ({
              ...prev,
              limit: Number(value),
            }));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={tableFilters.limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2 ">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              onClick={() => {
                setTableFilters((prev) => ({
                  ...prev,
                  page: index + 1,
                }));
              }}
              className="h-5 w-5  p-4 rounded-md border border-primary shadow-md cursor-pointer hover:bg-primary/20 transition-all duration-150 ease-in-out text-primary font-semibold flex items-center justify-center"
            >
              {index + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
