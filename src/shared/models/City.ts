interface City {
    ID: number;
    name: string;
    countryID: number | null;
    stateID: number | null;
}

const cityProps: (keyof City)[] = [
    'ID',
    'name',
    'countryID',
    'stateID'
];

export { cityProps };
export type { City };
