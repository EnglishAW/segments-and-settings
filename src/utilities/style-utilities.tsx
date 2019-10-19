import { PreactConsumer } from 'preact'

const getHexArray = (hex: string) => {
    return hex.length > 4
        ? hex.match(/[0-9,a-f,A-F]{1,2}/g)
        : hex.match(/[0-9,a-f,A-F]{1}/g)
}

export const hexToRGBA = (hex, opacity) => {
    const rgbArray = getHexArray(hex).map(subColor => {
        return subColor.length === 2
            ? parseInt(subColor, 16)
            : parseInt(subColor + subColor, 16)
        // return parseInt(subColor, 16)
    })
    return `rgba(${rgbArray[0]}, ${rgbArray[1]}, ${rgbArray[2]}, ${opacity})`
}
