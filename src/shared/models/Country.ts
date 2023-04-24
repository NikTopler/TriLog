interface Country {
    ID: number;
    name: string;
    fullName: string;
    alpha2: string;
    alpha3: string;
    continentCode: string;
    number: string;
}

const countryProps: (keyof Country)[] = [
    'ID',
    'name',
    'fullName',
    'alpha2',
    'alpha3',
    'continentCode',
    'number'
];

export { countryProps };
export type { Country };
