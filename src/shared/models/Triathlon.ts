interface Triathlon {
    ID: number;
    year: number;
    countryID: number | null;
    stateID: number | null;
    cityID: number | null;
    isWorldChampionship: boolean;
    triathlonTypeID: number;
}

const triathlonProps: (keyof Triathlon)[] = [
    'ID',
    'year',
    'countryID',
    'stateID',
    'cityID',
    'isWorldChampionship',
    'triathlonTypeID'
];

export { triathlonProps };
export type { Triathlon };
