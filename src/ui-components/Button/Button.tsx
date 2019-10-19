import { h } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { css } from 'emotion'

import {
    textButtonClass,
    containedButtonClass,
    outlinedButtonClass,
} from './ButtonVarients'
import { blueGrey, grey, lime, cyan, lightGreen } from '../../assets/colors'
import { ThemeContext } from '../../context/theme-context'

type ButtonVarientType = 'text' | 'outlined' | 'contained'
type ButtonColorType = 'default' | 'primary' | 'secondary'

export type ButtonProps = {
    className?: string
    variant?: ButtonVarientType
    color?: string
    textColor?: string
    children?: any
} & h.JSX.HTMLAttributes

export const Button = (props: ButtonProps) => {
    const [isFocused, setIsFocus] = useState(false)
    const theme = useContext(ThemeContext)
    // const { color, textColor } = props
    const color = props.color || theme.colors.primary
    const textColor = props.textColor || theme.textOn.primary
    const overrides = props.className
    const buttonClass =
        props.variant === 'contained'
            ? containedButtonClass({ color, textColor, overrides })
            : props.variant === 'outlined'
            ? outlinedButtonClass({ color, textColor, overrides })
            : textButtonClass({ color, textColor, overrides })
    return (
        <button
            className={buttonClass}
            onBlur={() => {
                setIsFocus(false)
            }}
            onKeyUp={e => {
                e.keyCode === 9 && setIsFocus(true)
            }}
            {...props}
        >
            <div>{props.children}</div>
            <span className={isFocused && focusButtonClass} />
        </button>
    )
}
//https://material-ui.com/static/images/cards/paella.jpg

const focusButtonClass = css`
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
    clip-path: circle(55% at 50% 50%);
`

export default Button
