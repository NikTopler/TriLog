interface Organization {
    ID: number;
    name: string;
    acronym: string;
}

const organizationProps: (keyof Organization)[] = [
    'ID',
    'name',
    'acronym'
];

export { organizationProps };
export type { Organization };
