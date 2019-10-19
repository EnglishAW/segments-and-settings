import { h, Component } from 'preact'
import { css } from 'emotion'
import { useContext } from 'preact/hooks'
import { ThemeContext } from '../../context/theme-context'

export interface AppBarProps {
    className?: string
    color?: string
    backgroundColor?: string
    children?: any
}

export const AppBar = (props: AppBarProps) => {
    const { color, backgroundColor } = props
    const theme = useContext(ThemeContext)
    return (
        <div>
            <div className={spacerClass}></div>
            <div className={wrapperClass}>
                <div className={navbarClass(props, theme)}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

const spacerClass = css`
    position: relative;
    width: 100%;
    height: 40px;
`

const wrapperClass = css`
    position: fixed;
    z-index: 9999;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 40px;
`

const navbarClass = (props, theme) => {
    const color = !!props.color ? props.color : theme.colors.text.primary
    const backgroundColor = !!props.backgroundColor
        ? props.backgroundColor
        : theme.colors.background.secondary

    return css`
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 100px;
        top: 0px;
        left: 0px;
        width: 100%;
        align-items: center;
        height: 40px;
        padding: 0px 15px;
        margin: 0px;
        background-color: ${backgroundColor};
        color: ${color};
        box-sizing: border-box;
        box-shadow: 0px 5px 8px #00000033;
        ${props.className};
    `
}

export default AppBar
