"use client"

import {useEffect, useState } from "react"
 
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { ChevronDown } from "lucide-react"
 
 

type DataTableProps<T> = {
  data: T[];
  filter?: string;
  search?: string;
  total?: number;
  manualPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onSearch?: (search: string) => void;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onRowSelectionChange?: (selected: string[]) => void;
  columns: ColumnDef<T>[];
  getRowStyles?: (row: T) => React.CSSProperties;
};

export function DataTable<T>({data,manualPagination, currentPage = 0, pageSize, filter, columns, onSearch, search, total, getRowStyles, onPageChange, onPageSizeChange,onRowSelectionChange}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [localSearch, setLocalSearch] = useState<string>(search ?? "");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({})

  const table = useReactTable({
    data,
    columns,
    manualPagination: manualPagination ?? false, // Enable server-side pagination
    pageCount: manualPagination ? Math.ceil((total ?? 0) / (pageSize ?? 10)) : -1, // Set total page count for manual pagination
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: manualPagination ? undefined : getSortedRowModel(),
    getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: currentPage ?? 0,
        pageSize: pageSize ?? 10,
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      ...(manualPagination && {
        pagination: {
          pageIndex: currentPage ?? 0,
          pageSize: pageSize ?? 10,
        },
      }),
    },
  })

  // Update local search when external search changes
  useEffect(() => {
    setLocalSearch(search ?? "");
  }, [search]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if(onSearch && localSearch !== search){
        onSearch(localSearch);
      }
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [localSearch, onSearch, search])


  useEffect(() => {
    if (onRowSelectionChange) {
      const selectedRows = Object.keys(rowSelection).filter(
        (key) => rowSelection[key]
      );
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection])


  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-4 flex-wrap gap-4 ">
        {filter && <div>
          <Input
          placeholder="Buscar..."
          value={localSearch ?? ""}
          onKeyDown={(event) => {
            if (event.key === "Enter" && onSearch) {
                onSearch(localSearch);
            }
          }}
          onChange={(event) => setLocalSearch(event.target.value)}
          onBlur={(event) => setLocalSearch(event.target.value)}
          className="min-w-[25rem] w-full"
        /> 
          </div>}
        <div>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta?.toString() ??  column.columnDef.header?.toString() ?? column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border w-full" >
        <Table data-testid="data-table" className="w-full" >
          <TableHeader className="w-full bg-blue-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                     <TableHead 
                        key={header.id}
                        style={{
                        
                          width: header.column.columnDef.size,
                          minWidth: header.column.columnDef.minSize,
                          maxWidth: header.column.columnDef.maxSize
                        }}
                      >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  style={getRowStyles ? getRowStyles(row.original) : undefined}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}  >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-wrap items-center justify-between space-x-2 py-4">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Filas por página</p>
          <Select
            value={`${manualPagination ? pageSize ?? 10 : table.getState().pagination?.pageSize ?? 10}`}
            onValueChange={(value) => {
              const newSize = Number(value);
              if (manualPagination && onPageSizeChange) {
                onPageSizeChange(newSize);
              } else if (!manualPagination) {
                table.setPageSize(newSize);
              }
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={manualPagination ? pageSize ?? 10 : table.getState().pagination?.pageSize ?? 10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex-1 text-sm text-muted-foreground">
            {manualPagination ? (
              <>Página {currentPage + 1} de {Math.ceil((total ?? 0) / (pageSize ?? 10))} - {data.length} de {total} registros</>
            ) : (
              <>Página {(table.getState().pagination?.pageIndex ?? 0) + 1} de {table.getPageCount()} - {table.getFilteredRowModel().rows.length} registros</>
            )}
          </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (manualPagination && onPageChange && currentPage > 0) {
                onPageChange(currentPage - 1);
              } else if (!manualPagination) {
                table.previousPage();
              }
            }}
            disabled={manualPagination ? currentPage === 0 : !table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (manualPagination && onPageChange) {
                onPageChange(currentPage + 1);
              } else if (!manualPagination) {
                table.nextPage();
              }
            }}
            disabled={  
              manualPagination
                ? currentPage >= Math.ceil((total ?? 0) / (pageSize ?? 10)) - 1
                : !table.getCanNextPage()
            }
          >
            Siguiente
          </Button>
        </div>
        </div>
      </div>
    </div>
  )
}
