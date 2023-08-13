import { PositiveIntSchema } from "@/schemas";
import { Athletes, Countries, Participations, TriathlonCategories } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTable";
import z from "zod";

export type SpecificTriathlonParticipationColumns = Participations & { Athletes: Athletes & { Countries: Countries }, TriathlonCategories: TriathlonCategories };

const ParticipationTableSchema = z.object({
    athleteID: PositiveIntSchema,
    athleteFirstName: z.string(),
    athleteLastName: z.string(),
    countryAcronym: z.string(),
    time: z.string().nullable(),
    swimTime: z.string().nullable(),
    bikeTime: z.string().nullable(),
    runTime: z.string().nullable(),
    firstTransition: z.string().nullable(),
    secondTransition: z.string().nullable(),
    startNumber: PositiveIntSchema.nullable(),
    placement: z.union([PositiveIntSchema, z.enum(['DNS', 'DNF', '---'])]),
    points: PositiveIntSchema
});

export type ParticipationTable = z.infer<typeof ParticipationTableSchema>;

const participationColumns: ColumnDef<ParticipationTable>[] = [
    {
        accessorKey: "placement",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Placement" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("placement")}
            </div>
        ),
    },
    {
        accessorKey: "athleteFirstName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First name" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("athleteFirstName")}
            </div>
        )
    },
    {
        accessorKey: "athleteLastName",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Last name" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("athleteLastName")}
            </div>
        )
    },
    {
        accessorKey: "countryAcronym",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Country" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("countryAcronym")}
            </div>
        )
    },
    {
        accessorKey: "startNumber",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Start number" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("startNumber")}
            </div>
        )
    },
    {
        accessorKey: "time",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Time" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("time")}
            </div>
        )
    },
    {
        accessorKey: "swimTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Swim Time" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("swimTime")}
            </div>
        )
    },
    {
        accessorKey: "bikeTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Bike Time" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("bikeTime")}
            </div>
        )
    },
    {
        accessorKey: "runTime",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Run Time" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("runTime")}
            </div>
        )
    },
    {
        accessorKey: "firstTransition",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="First transition" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("firstTransition")}
            </div>
        )
    },
    {
        accessorKey: "secondTransition",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Second transition" />
        ),
        cell: ({ row }) => (
            <div>
                {row.getValue("secondTransition")}
            </div>
        )
    }
];

export default participationColumns