function sanitizeRequestNumber(num: string | number | boolean | null | undefined): number | null | undefined {

    if (typeof num === 'number') {
        return num;
    }

    if (typeof num === 'string') {
        if (num.match(/^\d+$/)) {
            return Number(num);
        }

        if (num.length === 0) {
            return null;
        }
    }

    return undefined;

}

export default sanitizeRequestNumber;