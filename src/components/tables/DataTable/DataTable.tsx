import { ColumnDef, ColumnFiltersState, OnChangeFn, PaginationState, SortingState, TableOptions, VisibilityState, flexRender, getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { DataTablePagination, DataTableToolbar } from ".";
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DataTableToolbarFilterOptions } from "./DataTableToolbar/DataTableToolbar";

type ControlledPagination = {
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    onPaginationChange: OnChangeFn<PaginationState>
}

interface DataTableProps<TData, TValue> extends DataTableToolbarFilterOptions {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    controlledPagination?: ControlledPagination;
    handleRowClick?: (row: TData) => void;
}

function DataTable<TData, TValue>({ columns, data, includeSearch, searchPlaceholder, filters, controlledPagination, handleRowClick }: DataTableProps<TData, TValue>) {

    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);

    let tableObj: TableOptions<TData> = {
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues()
    }

    if (controlledPagination) {

        if (tableObj.state) {
            tableObj.state.pagination = {
                pageIndex: controlledPagination.pageIndex,
                pageSize: controlledPagination.pageSize,
            }
        }

        tableObj.pageCount = controlledPagination.pageCount;
        tableObj.onPaginationChange = controlledPagination.onPaginationChange;
        tableObj.manualPagination = true;
    }

    const table = useReactTable(tableObj);

    return (
        <div>
            <DataTableToolbar
                table={table}
                includeSearch={includeSearch}
                searchPlaceholder={searchPlaceholder}
                filters={filters}
            />
            <div className="rounded-md border">
                <Table style={{ height: '100px' }}>
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
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className={handleRowClick && "cursor-pointer"}
                                    data-state={row.getIsSelected() && "selected"}
                                    onClick={() => handleRowClick && handleRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
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
            <DataTablePagination table={table} />
        </div>
    );

}

export default DataTable;