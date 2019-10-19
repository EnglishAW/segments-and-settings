import { segmentFormRowTemplate } from '../../data/SegmentTemplate'

export const questionToSegment = (question: Question): Segment => {
    const responses = question.labels
        .map((option, row_num) => {
            const newFields = segmentFormRowTemplate.map(field =>
                field.type === 'header'
                    ? {
                          type: field.type,
                          col: field.col,
                          value: row_num === 0 ? question.name : '',
                      }
                    : field.type === 'combo'
                    ? {
                          type: field.type,
                          col: field.col,
                          value: question.labels[row_num].code,
                          options: question.labels,
                      }
                    : field.type === 'text'
                    ? {
                          type: field.type,
                          col: field.col,
                          value: row_num === 0 ? question.name : '',
                          readonly: row_num !== 0,
                          options: question.labels,
                      }
                    : field
            )
            return {
                key: `${question.name}-${row_num}`,
                group: question.name,
                fields: newFields,
            }
        })
        .flat(1)

    return { key: question.key, name: question.name, responses: responses }
}
