function getCurrentTimestamp(inSeconds: boolean = false) {

    const timestamp = Date.now();

    if (inSeconds) {
        return Math.floor(timestamp / 1000);
    }

    return timestamp;

}

export default getCurrentTimestamp;