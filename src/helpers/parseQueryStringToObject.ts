function parseQueryStringToObject(text: string) {
    const searchParams = new URLSearchParams(text);
    return Object.fromEntries(searchParams.entries());
}

export default parseQueryStringToObject;