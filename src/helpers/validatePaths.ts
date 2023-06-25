function validatePaths(paths: string[], pathname: string): boolean {
    return paths.some((path) => {
        const regex = new RegExp(`^${path.replace(/\*/g, '.*')}$`);
        return regex.test(pathname);
    });
}

export default validatePaths;