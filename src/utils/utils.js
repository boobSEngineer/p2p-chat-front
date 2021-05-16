export const required = (values) => {
    if (values) return undefined;
    return "Field is required";
}

export const maxLengthCreator = (maxLength) => {
    return (values) => {
        if (values.length < maxLength) return undefined;
        return `Max length is ${maxLength} symbol`;
    }
}