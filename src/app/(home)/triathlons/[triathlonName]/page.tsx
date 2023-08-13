import { createPaginationOptionSchema } from "@/schemas";
import SpecificTriathlonView from "./SpecificTriathlonView";
import { AthleteService, BaseService } from "@/services";
import { Order, ParticipationColumns } from "@/types";
import { SpecificTriathlonParticipationColumns } from "@/components/tables/columns";

type SearchParams = { [key: string]: string | string[] | undefined };
type Params = { triathlonName: string };

interface SpecificTriathlonPageProps {
    params: Params;
    searchParams: SearchParams;
}

export default async function SpecificTriathlonPage({ params, searchParams }: SpecificTriathlonPageProps) {

    let page = 1;
    let perPage = 20;
    let order: Order = 'asc';
    let orderBy: ParticipationColumns = 'rank';

    const validatedPagination = createPaginationOptionSchema<ParticipationColumns>(
        BaseService.getColumnNames('Participations') || [],
        perPage,
        page,
        order,
        orderBy
    ).parse(searchParams);

    const triathlonName = params.triathlonName.replaceAll('_', ' ');
    const [count, participations] = await Promise.all([
        AthleteService.getAllByTriathlonName(triathlonName, validatedPagination, true) as Promise<number>,
        AthleteService.getAllByTriathlonName(triathlonName, validatedPagination) as Promise<SpecificTriathlonParticipationColumns[]>
    ]);

    return (
        <SpecificTriathlonView
            triathlonName={triathlonName}
            count={count}
            data={participations}
            pagination={validatedPagination}
        />
    );

}