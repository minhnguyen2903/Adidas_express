const ConvertString = (string) => {
    let splitTextArr = string.split("");
    splitTextArr.push(" ");
    const text = [];
    splitTextArr.forEach((element) => {
        const elementIndex = splitTextArr.indexOf(element);
        if (element === " ") {
            const validText = splitTextArr.slice(0, elementIndex);
            splitTextArr = splitTextArr.slice(elementIndex + 1, splitTextArr.length);
            text.push(validText.join(""));
        }
    })
    return text;
};

module.exports = ConvertString