import { h, Component } from 'preact'
import { css } from 'emotion'
import { green, teal, lightGreen, blueGrey } from '../../assets/colors'

export interface FormInputProps {
    type: string
    value: string
    columnId: number
    onInput: (_: number, __: string | boolean) => void
}

class FormInput extends Component<FormInputProps> {
    constructor(props: FormInputProps) {
        super(props)
    }
    shouldComponentUpdate(nextProps) {
        if (this.props.value === nextProps.value) {
            return false
        } else {
            return true
        }
    }

    handleInput = event => {
        const newValue: string = event.target.value

        this.props.onInput(this.props.columnId, newValue)
    }

    render(props) {
        return (
            <input
                className={TextInputCell}
                type="text"
                value={props.value}
                onInput={this.handleInput}
            />
        )
    }
}

const TextInputCell = css`
    /* padding: 0.5rem 0.5rem; */
    min-width: 50px;
    width: 100%;
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
    color: inherit;
    font-size: 1rem;
    box-sizing: border-box;
    &:focus {
        border: 1px solid ${blueGrey[300]};
        background-color: ${green[300]}14;
    }
`

export default FormInput
