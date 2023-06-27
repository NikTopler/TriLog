import { parsePositiveInt } from "@/helpers";
import { RequestParams } from "@/interfaces";
import { OrganizationSchemaOptional } from "@/schemas";
import { OrganizationService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid organization ID";

type OrganizationParams = RequestParams<{
    organizationId: string;
}>;

export async function GET(req: NextRequest, { params }: OrganizationParams) {

    try {

        const ID = await parsePositiveInt(params.organizationId, INVALID_ID_ERROR_MESSAGE);

        return NextResponse.json({
            success: true,
            data: await OrganizationService.getById(ID)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function PUT(req: NextRequest, { params }: OrganizationParams) {

    try {

        const ID = await parsePositiveInt(params.organizationId, INVALID_ID_ERROR_MESSAGE);
        const body = await req.json();
        const organization = OrganizationSchemaOptional.parse(body);

        if (Object.keys(organization).length === 0) {
            throw new Error("No valid fields to update");
        }

        return NextResponse.json({
            success: true,
            data: await OrganizationService.update(ID, organization)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function DELETE(req: NextRequest, { params }: OrganizationParams) {

    try {

        const ID = await parsePositiveInt(params.organizationId, INVALID_ID_ERROR_MESSAGE);

        await OrganizationService.delete(ID);

        return NextResponse.json({
            success: true,
            data: { ID }
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}
