function isBoolean(value: any) {
    return typeof value === 'boolean' 
    || (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false'))
    || (typeof value === 'number' && (value === 1 || value === 0));
}

export default isBoolean;