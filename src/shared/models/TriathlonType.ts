interface TriathlonType {
    ID: number;
    name: string;
    swimKm: number;
    bikeKm: number;
    runKm: number;
    organizationID: number;
}

type TriathlonNameType = 'IRONMAN' | 'IRONMAN 70.3' | 'Double-Ultra' | 'Triple-Ultra';

const triathlonTypeProps: (keyof TriathlonType)[] = [
    'ID',
    'name',
    'swimKm',
    'bikeKm',
    'runKm',
    'organizationID'
];

export {
    triathlonTypeProps
};
export type {
    TriathlonType,
    TriathlonNameType
};

