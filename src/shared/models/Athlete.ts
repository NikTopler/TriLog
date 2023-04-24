interface Athlete {
    ID: number;
    firstName: string;
    lastName: string;
    age: number | null;
    countryID: number | null;
    stateID: number | null;
    cityID: number | null;
}

const athleteProps: (keyof Athlete)[] = [
    'ID',
    'firstName',
    'lastName',
    'age',
    'cityID',
    'countryID',
    'stateID'
];

export { athleteProps };
export type { Athlete };
