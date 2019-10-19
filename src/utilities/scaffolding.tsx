import { h } from 'preact'
import { css } from 'emotion'
import { JSXInternal } from 'preact/src/jsx'

type ScaffoldingProps = h.JSX.HTMLAttributes

/**
 * Column will arange children in a column
 *
 * css properties
 *
 *div {
 *
 *      display: flex;
 *      flex-direction: column;
 *      justify-content: center;
 *      align-items: center;
 * }
 */

export const Column = (props: ScaffoldingProps) => {
    return (
        <div
            {...props}
            className={css`
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                ${props.className};
            `}
        >
            {props.children}
        </div>
    )
}

/**
 * CenterBox will center the content vertically and horizontally
 *
 * css properties
 *
 *div {
 *
 *      display: flex;
 *      justify-content: center;
 *      align-items: center;
 * }
 */

export const CenterBox = (props: ScaffoldingProps) => {
    return (
        <div
            {...props}
            className={css`
                display: flex;
                justify-content: center;
                align-items: center;
                ${props.className};
            `}
        >
            {props.children}
        </div>
    )
}
