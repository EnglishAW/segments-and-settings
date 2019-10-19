import { h, Component } from 'preact'
import { css } from 'emotion'

export interface AppBarTitleProps {
    className?: string
    onClick?: any
    children?: any
}

export class AppBarTitle extends Component<AppBarTitleProps> {
    render(props: AppBarTitleProps) {
        return (
            <div
                className={wrapperClass(props.className)}
                onClick={props.onClick}
            >
                <h3>{props.children}</h3>
            </div>
        )
    }
}

const wrapperClass = overrides => css`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 0px 10px;
    margin: 0px;
    &:hover {
        /*background-color: rgba(0, 0, 0, 0.2);*/
        cursor: pointer;

        user-select: none; /* supported by Chrome and Opera */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
    }
    ${overrides};
`

export default AppBarTitle
