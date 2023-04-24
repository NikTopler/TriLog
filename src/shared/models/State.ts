interface State {
    ID: number;
    name: string;
    acronym: string;
    countryID: number;
}

const stateProps: (keyof State)[] = [
    'ID',
    'name',
    'acronym',
    'countryID'
];

export { stateProps };
export type { State };
