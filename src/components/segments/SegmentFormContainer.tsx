import { h } from 'preact'
import FormRow from '../TableForm/FormRow'
import { useState, useEffect, useContext } from 'preact/hooks'
import {
    useSegmentDataState,
    useSegmentActions,
} from '../../context/SegmentDataContext'
import { useDataState, useDataUpdater } from '../../context/DataContext'
import { css } from 'emotion'
import { blueGrey, lightGreen, cyan, green } from '../../assets/colors'
import { styled } from '../../utilities/preact-styled'
import { segmentFormRowTemplate } from '../../data/SegmentTemplate'
import Button from '../../ui-components/Button/Button'
import { questionToSegment } from './SegmentHelperFunctions'
import { without } from 'rambda'
import { Column } from '../../utilities/scaffolding'
import Chip from '../../ui-components/Chip'
import FormInput from '../TableForm/FormInput'
import { ThemeContext } from '../../context/theme-context'

export interface SegmentFormContainerProps {
    headers: string[]
    questions?: Question[]
}

const SegmentFormContainer = (props: SegmentFormContainerProps) => {
    const { headers, questions } = props
    const { setSegmentData, updateSegments } = useSegmentActions()

    useEffect(() => {
        // TODO: refactor this!!!
        const newForm: FormRowModel[] = questions
            .map(question => {
                return questionToSegment(question)
            })
            .flat(1)
        //setSegmentData(newForm)
    }, [props.questions])

    const handleAddRow = event => {
        const newQuestion = event.target.value
        const { addSegment } = useSegmentActions()
        addSegment(
            questionToSegment(questions.filter(q => q.key === newQuestion)[0])
        )
    }

    const handleRowChange = (newRow: FormRowModel) => {
        const foundSegment = segmentsFormState.filter(
            s => s.key === newRow.group
        )[0]
        const newResponses = foundSegment.responses.map(response => {
            return response.key === newRow.key ? newRow : response
        })

        updateSegments({
            key: foundSegment.key,
            name: foundSegment.name,
            responses: newResponses,
        })
    }

    const questionsData = useDataState()
    const { segmentsFormState, segmentsUsed } = useSegmentDataState()
    const theme = useContext(ThemeContext)
    return (
        <div>
            <FormTable>
                <tr>
                    {headers.map((columnHeader: any) => {
                        return (
                            <FormHeader theme={theme}>
                                {columnHeader}
                            </FormHeader>
                        )
                    })}
                </tr>
                {/* {questionsData
                    .filter(q => segmentsUsed.includes(q.key))
                    .map(question => {
                        return (
                            <TableRow>
                                <TableCell>
                                    <FlexCell>{question.name}</FlexCell>
                                </TableCell>
                                <TableCell>
                                    <FormInput
                                        type="text"
                                        value={question.name}
                                        columnId={2}
                                        onInput={() => {}}
                                    />
                                </TableCell>
                                <TableCell>
                                    <FlexChipCell>
                                        <Column>
                                            {question.labels.map(response => {
                                                return (
                                                    <Chip value={response.code}>
                                                        {response.label}
                                                    </Chip>
                                                )
                                            })}
                                        </Column>
                                    </FlexChipCell>
                                </TableCell>
                            </TableRow>
                        )
                    })} */}

                {segmentsFormState
                    .map(segment => {
                        return [
                            ...segment.responses.map((response, i) => {
                                const isLast =
                                    i === segment.responses.length - 1
                                return (
                                    <FormRow
                                        data={response}
                                        onChange={handleRowChange}
                                        className={
                                            isLast
                                                ? css`
                                                      border-bottom: 2px solid
                                                          ${blueGrey[500]};
                                                  `
                                                : null
                                        }
                                    />
                                )
                            }),
                            // <TableBreak>
                            //     <td colSpan={3}></td>
                            // </TableBreak>,
                            // <TableBreak>
                            //     <td colSpan={3}></td>
                            // </TableBreak>,
                        ]
                    })
                    .flat(1)}
            </FormTable>
            <AddSegment>
                <select value={-1} onChange={handleAddRow}>
                    <option value={-1}>Add a Segment</option>
                    {questions
                        .filter(q => {
                            return !segmentsUsed.includes(q.key)
                        })
                        .map((question, i) => {
                            return (
                                <option value={question.key}>
                                    {question.name}
                                </option>
                            )
                        })}
                </select>
            </AddSegment>
            {/* <Button variant="outlined" onClick={handleAddRow}>
                Add Row
            </Button> */}
        </div>
    )
}

const FormTable = styled('table')`
    border-collapse: collapse;
    /* border-spacing: 1em;
    border: 2px solid ${blueGrey[900]}; */
    width: 100%;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
`
const TableRow = styled('tr')`
    &:nth-child(even) {
        background-color: #212433;
    }
    &:nth-child(odd) {
        background-color: #292e40;
    }
`
const TableCell = styled('td')`
    vertical-align: top;
`
const FlexCell = styled('div')`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
    margin: 5px 20px 5px 5px;
`
const FlexChipCell = styled('div')`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
    margin: 5px 20px;
`
const FormHeader = styled('th')`
    padding: 0.5rem;
    border-right: 1px solid ${blueGrey[600]};
    border-bottom: 1px solid ${lightGreen[400]};
    background-color: ${(props: { theme: Theme }) =>
        props.theme.colors.background.tertiary};
    color: ${(props: { theme: Theme }) => props.theme.textOn.tertiary};
`
const AddSegment = styled('div')`
    margin: 5px 0px;
    padding: 0.5rem;
    border: 1px solid ${blueGrey[600]};
    border-radius: 5px;
    background-color: #212433;
`
const TableBreak = styled('tr')`
    height: 5px;
    border: none;
    background-color: transparent;
`

export default SegmentFormContainer
