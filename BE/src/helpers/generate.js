export const generateNumber = (length) => {
    let randomNumber = ""

    for(let i = 1; i <= length; i++) {
        randomNumber = randomNumber + Math.floor(Math.random() * 10)
    }

    return randomNumber
}