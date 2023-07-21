'use client'

import { ColumnDef } from "@tanstack/react-table"
import { z } from "zod";
import { DataTableColumnHeader } from "../DataTable";

const TriathlonTableSchema = z.object({
  worldChampionship: z.boolean(),
  year: z.number(),
  triathlonType: z.string(),
  location: z.string(),
  organization: z.string(),
});

export type TriathlonTable = z.infer<typeof TriathlonTableSchema>

const triathlonColumns: ColumnDef<TriathlonTable>[] = [
  {
    accessorKey: "worldChampionship",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="WC" />
    ),

    cell: ({ row }) => (
      <div>
        {row.getValue("worldChampionship") as boolean
          ? <span className="inline-block w-4 h-4 rounded-full bg-green-500" />
          : <span className="inline-block w-4 h-4 rounded-full bg-gray-300" />
        }
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => (
      <div >
        {row.getValue("year")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    accessorKey: "location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Location" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("location")}
      </div>
    ),
    enableSorting: true,
    enableHiding: false
  },
  {
    id: "triathlonType",
    accessorKey: "triathlonType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Triathlon type" />
    ),
    cell: ({ row }) => (
      <div >
        {row.getValue("triathlonType")}
      </div>
    ),
    filterFn: (row, id, value) => value.includes((row.getValue(id) as string)),
    enableSorting: true,
    enableHiding: true
  },
  {
    accessorKey: "organization",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Organization" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("organization")}
      </div>
    ),
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
    enableSorting: true,
    enableHiding: true
  }
];

export default triathlonColumns;