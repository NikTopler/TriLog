function generateCode(numberOfDigits: number = 5): string {

    let code: string = '';
    for (let i = 0; i < numberOfDigits; i++) {
        code += Math.floor(Math.random() * 10);
    }

    return code;

}

export default generateCode;