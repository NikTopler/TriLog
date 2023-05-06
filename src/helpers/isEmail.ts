function isEmail(input: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(input);
}

export default isEmail;