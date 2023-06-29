function changeFirstLetter(input: string, capitalize: boolean = true) {

    if (input.length === 0) {
        return input;
    }

    if (capitalize) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    return input.charAt(0).toUpperCase() + input.slice(1);

}

export default changeFirstLetter;