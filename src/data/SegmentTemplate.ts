export const headers = [
    { name: 'Name', key: 'name' },
    { name: 'Question', type: 'text', key: 'question' },
    { name: 'Response', type: 'text', key: 'response' },
]
export const headersArray = ['Name', 'Question', 'Response']

export const segmentFormRowTemplate: FieldModel[] = [
    {
        type: 'header',
        col: 0,
        value: '',
        readonly: false,
    },
    {
        type: 'text',
        col: 1,
        value: '',
        readonly: false,
    },
    {
        type: 'combo',
        col: 2,
        value: '',
        options: [],
        readonly: false,
    },
]
