import { h, Component } from 'preact'
import FormInput from './FormInput'
import { FormCheckbox } from './FormCheckbox'
import { css } from 'emotion'
import { lightGreen, blueGrey, green } from '../../assets/colors'
import FormComboBox from './FormComboBox'
import { styled } from '../../utilities/preact-styled'
import { useContext } from 'preact/hooks'
import { ThemeContext } from '../../context/theme-context'

export interface FormRowProps {
    data: FormRowModel
    onChange: (newRow: FormRowModel) => void
    className?: string
}

class FormRow extends Component<FormRowProps> {
    constructor(props: FormRowProps) {
        super(props)
    }
    shouldComponentUpdate(nextProps) {
        if (
            JSON.stringify(this.props.data) === JSON.stringify(nextProps.data)
        ) {
            return false
        } else {
            return true
        }
    }
    // const { name, fields } = props.data

    handleInput = (columnId, newValue) => {
        // console.log(newValue)

        const newData = this.props.data.fields.map(field => {
            return field.col === columnId
                ? { ...field, value: newValue }
                : field
        })

        this.props.onChange({
            key: this.props.data.key,
            group: this.props.data.group,
            fields: newData,
        })
    }

    render(props) {
        // console.log('Render Row')
        const theme = useContext(ThemeContext)
        return (
            <TableRow className={props.className} theme={theme}>
                {/* {!!props.data.name && (
                    <td className={FormCell}>
                        <div className={rowHeader}>{props.data.name}</div>
                    </td>
                )} */}
                {props.data.fields.map(field => {
                    return field.type === 'header' || field.readonly ? (
                        <td className={FormCell}>
                            <div className={rowHeader}>{field.value} </div>
                        </td>
                    ) : field.type === 'text' ? (
                        <td className={FormCell}>
                            <FormInput
                                type={field.type}
                                value={field.value}
                                columnId={field.col}
                                onInput={this.handleInput}
                            />
                        </td>
                    ) : field.type === 'combo' ? (
                        <td className={FormCell}>
                            <FormComboBox
                                value={field.value}
                                options={field.options}
                                inputId={field.col}
                                onChange={this.handleInput}
                            />
                        </td>
                    ) : (
                        <td className={FormCell}>
                            <FormCheckbox
                                checked={field.value}
                                columnId={field.col}
                                onChange={this.handleInput}
                            />
                        </td>
                    )
                })}
            </TableRow>
        )
    }
}

const rowHeader = css`
    display: inline-block;
    padding: 0px 10px 0px 0px;
`
const FormCell = css`
    padding: 0;

    border: 1px solid ${blueGrey[800]};
    height: 20px;

    background-color: transparent;
`

const TableRow = styled('tr')`
    &:nth-child(even) {
        /* background-color: #212433; */
        background-color: ${(props: { theme: any }) =>
            props.theme.table.row.backgroundColor};
    }
    &:nth-child(odd) {
        /* background-color: #292e40; */
        background-color: ${(props: { theme: any }) =>
            props.theme.table.row.backgroundColorAlt};
    }
`

export default FormRow
// export default memo(FormRow, (prevProps, nextProps) => {
//     // console.log(
//     //     JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
//     // )
//     return (
//         JSON.stringify(prevProps.data) === JSON.stringify(nextProps.data)
//     )
// })
