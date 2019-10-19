import { h, Component } from 'preact'
import { css } from 'emotion'
import { lime, blueGrey, grey, teal, green, cyan } from '../../assets/colors'

export interface FormCheckboxProps {
    columnId: number
    checked: boolean
    onChange: any
}

export class FormCheckbox extends Component<FormCheckboxProps> {
    constructor(props: FormCheckboxProps) {
        super(props)
    }

    shouldComponentUpdate(nextProps) {
        if (this.props.checked === nextProps.checked) {
            return false
        } else {
            return true
        }
    }

    handleInput = value => {
        this.props.onChange(this.props.columnId, value)
    }

    render(props: FormCheckboxProps) {
        return (
            <div className={wrapper}>
                <div
                    className={CheckBoxClass(props.checked)}
                    onClick={() => this.handleInput(!props.checked)}
                >
                    {!!props.checked && <div className={Checkmark} />}
                </div>
                <input
                    hidden
                    type="checkbox"
                    checked={props.checked}
                    // onChange={()this.handleInput}
                />
            </div>
        )
    }
}
const wrapper = css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    justify-content: center;
    align-items: center;
    &:focus {
        border: 1px solid ${blueGrey[300]};
    }
`

const CheckBoxClass = checked => {
    const bg_color = checked ? cyan[800] : grey[300]
    const bg_color_hover = checked ? cyan[900] : grey[500]

    return css`
        position: relative;
        padding: 0.5rem 0.5rem;
        width: 20px;
        height: 20px;

        border: 1px solid transparent;
        border-radius: 3px;
        outline: none;
        background-color: ${bg_color};
        color: inherit;
        box-sizing: border-box;
        &:hover {
            background-color: ${bg_color_hover};
        }
    `
}

const Checkmark = css`
    position: absolute;
    left: 5px;
    top: 1px;
    width: 5px;
    height: 10px;
    border: solid ${blueGrey[900]};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
`
