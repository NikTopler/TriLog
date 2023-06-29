import { CustomTextBox } from "@/components/inputs";
import { Table } from "@tanstack/react-table";
import DataTableFilter from "../DataTableFilter/DataTableFilter";
import SearchIcon from '@mui/icons-material/Search';
import { DataTableViewOptions } from "..";
import { useEffect } from "react";
import { isStringArray } from "@/helpers";
import { Button } from "@/components/ui/button";
import { Cross2Icon } from "@radix-ui/react-icons";

interface DataTableToolbarFilter {
    title: string;
    columnName: string;
    defaultValues?: string[];
    options: {
        label: string;
        value: string;
    }[]
}

export interface DataTableToolbarFilterOptions {
    includeSearch?: boolean;
    searchPlaceholder?: string;
    filters?: DataTableToolbarFilter[];
}

interface DataTableToolbarProps<TData> extends DataTableToolbarFilterOptions {
    table: Table<TData>;
}

function DataTableToolbar<TData>({ table, includeSearch, searchPlaceholder, filters }: DataTableToolbarProps<TData>) {

    useEffect(() => filters && setDefaultFilterValues(), []);

    const setDefaultFilterValues = () => {

        table.setGlobalFilter(undefined);

        filters
            ?.forEach(({ columnName, defaultValues }) =>
                table.getColumn(columnName)
                    ?.setFilterValue(defaultValues || []));
    }

    const findFilter = (columnName: string) => filters?.find(filter => filter.columnName === columnName);

    const isFiltered = () => {

        if (table.getState().globalFilter) {
            return true;
        }

        const { columnFilters } = table.getState();

        for (const { id, value } of columnFilters) {

            const targetFilter = findFilter(id);
            if (!targetFilter || !targetFilter.defaultValues) {
                continue;
            }

            if (isStringArray(value)) {
                if (targetFilter.defaultValues.every(v => value.includes(v))) {
                    continue;
                }
            }

            return true;

        }

        return false;

    }

    const onSearch = (val: string) => table.setGlobalFilter(val);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                {includeSearch && (
                    <CustomTextBox
                        placeholder={searchPlaceholder || "Filter ..."}
                        value={table.getState().globalFilter || ''}
                        handleInputChange={onSearch}
                        endDecorator={<SearchIcon style={{ height: 25 }} />}
                        style={{
                            width: 250,
                            height: 20,
                            color: '#000',
                            borderRadius: '5px',
                            padding: '0 10px'
                        }}
                    />
                )}
                {filters?.map((filter) => (
                    <DataTableFilter
                        key={filter.columnName}
                        title={filter.title}
                        column={table.getColumn(filter.columnName)}
                        options={filter.options}
                    />
                ))}
                {isFiltered() && (
                    <Button
                        variant="ghost"
                        onClick={setDefaultFilterValues}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )

}

export default DataTableToolbar;