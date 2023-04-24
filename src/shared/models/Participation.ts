interface Participation {
    ID: number;
    swimTimeSeconds: number | null;
    bikeTimeSeconds: number | null;
    runTimeSeconds: number | null;
    timeSeconds: number | null;
    startNumber: number | null;
    firstTransitionSeconds: number | null;
    secondTransitionSeconds: number | null;
    genderRank: number | null;
    divisionRank: number | null;
    rank: number | null;
    points: number | null;
    DNS: boolean;
    DNF: boolean;
    triathlonID: number;
    athleteID: number;
    triathlonCategoryID: number | null;
}

const participationProps: (keyof Participation)[] = [
    'ID',
    'swimTimeSeconds',
    'bikeTimeSeconds',
    'runTimeSeconds',
    'timeSeconds',
    'startNumber',
    'firstTransitionSeconds',
    'secondTransitionSeconds',
    'genderRank',
    'divisionRank',
    'rank',
    'points',
    'DNS',
    'DNF',
    'triathlonID',
    'athleteID',
    'triathlonCategoryID',
];

export { participationProps };
export type { Participation };

