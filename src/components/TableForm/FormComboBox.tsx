'use strict'

import { h, Component } from 'preact'
import { css } from 'emotion'
import { green, teal, lightGreen, blueGrey } from '../../assets/colors'
import { styled } from '../../utilities/preact-styled'
// import { pluck} from 'rambda'

export interface FormComboBoxProps {
    value: number | string
    options: QuestionLabel[]
    inputId: number
    onChange: any
}

type FormComboBoxState = {
    value: string | number | string[]
}

class FormComboBox extends Component<FormComboBoxProps, FormComboBoxState> {
    constructor(props: FormComboBoxProps) {
        super(props)

        // this.state = { value: null }
    }
    // shouldComponentUpdate(nextProps) {
    //     if (this.props.value === nextProps.value) {
    //         return false
    //     } else {
    //         return true
    //     }
    // }

    handleInput = event => {
        const newCode = parseInt(event.target.value)
        // const newLabel = this.props.options.filter(label => {
        //     return label.code.toString() === newCode.toString() ? true : false
        // })[0]
        // this.setState({ value: event.target.value })
        this.props.onChange(this.props.inputId, newCode)
    }

    render(props: FormComboBoxProps) {
        return (
            <StyledSelect value={this.props.value} onChange={this.handleInput}>
                {props.options.map((option: QuestionLabel) => {
                    return <option value={option.code}>{option.label}</option>
                })}
            </StyledSelect>
        )
    }
}

const StyledSelect = styled('select')`
    width: 100%;
    background-color: transparent;
    color: ${(props: { theme: any }) =>
        !!props.theme ? props.theme.colors.text.default : 'inherit'};
    border: none;
    outline: none;
    /* padding: 0.5rem 0.5rem;
    min-width: 50px;
    width: 100%;
    border: 1px solid transparent;
    
    background-color: transparent;
    border-radius: 0px;
    color: inherit;
    font-size: 0.8rem;
    box-sizing: border-box; */
    &:focus {
        border: 1px solid ${blueGrey[300]};
        background-color: ${green[300]}14;
    }
`

export default FormComboBox
