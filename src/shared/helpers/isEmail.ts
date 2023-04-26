function isEmail(value: string): boolean {
    const re = /\S+@\S+\.\S+/;
    return re.test(value);
}

export default isEmail;