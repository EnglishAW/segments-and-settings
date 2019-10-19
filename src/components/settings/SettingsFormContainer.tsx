import { h } from 'preact'
import FormRow from '../TableForm/FormRow'
import { headers, formRowTemplate } from '../../data/SettingsTemplate'
import { useEffect, useContext } from 'preact/hooks'
import {
    useSettingsData,
    useSettingsDataUpdater,
} from '../../context/SettingsDataContext'
import { css } from 'emotion'
import { blueGrey, lightGreen } from '../../assets/colors'
import { compose } from 'rambda'
import { styled } from '../../utilities/preact-styled'
import { ThemeContext } from '../../context/theme-context'

export interface FormContainerProps {
    questions: Question[]
}

const FormContainer = (props: FormContainerProps) => {
    const { setSettingsData, updateQuestionSettings } = useSettingsDataUpdater()

    useEffect(() => {
        // initial values for form
        compose(
            setSettingsData,
            initializeFormFields
        )(props.questions)
    }, [props.questions])

    const handleRowChange = (newRow: FormRowModel) => {
        updateQuestionSettings(newRow)
    }

    const formContext = useSettingsData()
    const theme = useContext(ThemeContext)

    return (
        <div>
            <table className={FormTable}>
                {headers.map((columnHeader: any) => {
                    return (
                        <FormHeader theme={theme}>
                            {columnHeader.name}
                        </FormHeader>
                    )
                })}
                {formContext.map(row => {
                    return <FormRow data={row} onChange={handleRowChange} />
                })}
            </table>
        </div>
    )
}

const initializeFormFields = (questions: Question[]) => {
    const newForm: FormRowModel[] = questions.map(question => {
        const initFileds = formRowTemplate.map(field =>
            field.type === 'header'
                ? {
                      type: field.type,
                      col: field.col,
                      value: question.name,
                      readonly: field.readonly,
                  }
                : field
        )
        // const options = question.labels.map(()=>{

        // })
        return { key: question.name, fields: initFileds }
    })

    return newForm
}

const FormTable = css`
    border-collapse: collapse;
    /* border-spacing: 1em;
    border: 2px solid ${blueGrey[900]}; */
    width: 100%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`
const FormHeader = styled('th')`
    padding: 0.5rem;
    border-right: 1px solid ${blueGrey[600]};
    border-bottom: 1px solid ${lightGreen[400]};
    background-color: ${(props: { theme: any }) =>
        !!props.theme ? props.theme.table.header.backgroundColor : 'inherit'};
`

export default FormContainer
