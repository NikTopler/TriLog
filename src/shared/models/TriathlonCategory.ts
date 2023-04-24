interface TriathlonCategory {
    ID: number;
    name: string;
    acronym: string;
    gender: 'male' | 'female'
}

const triathlonCategoryProps: (keyof TriathlonCategory)[] = [
    'ID',
    'acronym',
    'gender',
    'name'
];

export { triathlonCategoryProps };
export type { TriathlonCategory };
