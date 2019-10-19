import { css } from 'emotion'
import { hexToRGBA } from '../../utilities/style-utilities'

const buttonBaseClass = css`
    position: relative;
    border: none;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 8px;
    &:hover {
        cursor: pointer;

        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }
    &:focus {
        outline: none;
    }
`

export const textButtonClass = ({
    color,
    textColor,
    overrides,
}: {
    color: string
    textColor: string
    overrides: string
}) => {
    const buttonColor = color

    return css`
        ${buttonBaseClass};
        background-color: transparent;
        color: ${buttonColor};
        border-radius: 5px;
        padding: 6px 8px;
        &:hover {
            background-color: ${hexToRGBA(buttonColor, 0.1)};
        }
        &:focus {
            /*box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);*/
        }
        ${overrides}
    `
}
export const containedButtonClass = ({
    color,
    textColor,
    overrides,
}: {
    color: string
    textColor: string
    overrides: string
}) => {
    const buttonColor = color

    return css`
        ${buttonBaseClass};
        background-color: ${buttonColor};
        color: ${textColor};
        border-radius: 5px;
        padding: 6px 16px;
        &:hover {
            filter: brightness(0.9);
        }
        ${overrides};
    `
}

export const outlinedButtonClass = ({
    color,
    textColor,
    overrides,
}: {
    color: string
    textColor: string
    overrides: string
}) => {
    const buttonColor = color

    return css`
        ${buttonBaseClass}
        background-color: transparent;
        color: ${buttonColor};
        border: 1px solid ${buttonColor};
        border-radius: 5px;
        padding: 6px 8px;
        &:hover {
            background-color: ${hexToRGBA(buttonColor, 0.1)};
        }
        &:focus {
            /*box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.1);*/
        }
        ${overrides}
    `
}
