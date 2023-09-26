
// Convert number into pixels...
export const numToPx = (number) => {
    return `${number}px`;
}

// Convert pixelsto number...
export const pxToNum = (pxValue) => {
    return parseInt(pxValue, 10);
}

// get style in number...
export const getStyleValue = (ref, style) => {
    const styleString = getStyle(ref, style);
    return parseInt(styleString, 10);
}

// Get style for given ref...
export const getStyle = (ref, style) => {
    return window.getComputedStyle(ref).getPropertyValue(style);
}