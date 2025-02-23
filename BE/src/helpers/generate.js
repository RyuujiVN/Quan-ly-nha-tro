export const generateNumber = (length) => {
    let randomNumber = ""

    for (let i = 1; i <= length; i++) {
        randomNumber = randomNumber + Math.floor(Math.random() * 10)
    }

    return randomNumber
}

export const generateString = (length) => {
    const string = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789"
    let stringRandom = ""

    for (let i = 1; i <= length; i++) {
        const char = string.charAt(Math.random() * string.length)
        stringRandom = stringRandom + char
    }

    return stringRandom
}