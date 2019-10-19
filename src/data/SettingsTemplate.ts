export const headers = [
    { name: 'Name', key: 'name' },
    { name: 'Multiple Select', type: 'text', key: 'multipleSelect' },
    { name: 'Report Set', type: 'text', key: 'reportSet' },
    { name: 'Set Label', type: 'text', key: 'setLabel' },
    { name: 'Ingnore', type: 'boolean', key: 'ignore' },
    { name: 'Test (No)', type: 'boolean', key: 'test' },
    { name: 'Descriptive (Yes)', type: 'boolean', key: 'descriptive' },
    { name: 'Frequency (No)', type: 'boolean', key: 'frequency' },
]
export const headersArray = [
    'Name',
    'Multiple Select',
    'Report Set',
    'Set Label',
    'Ingnore',
    'Test (No)',
    'Descriptive (Yes)',
    'Frequency (No)',
]

export const formRowTemplate: FieldModel[] = [
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
        type: 'text',
        col: 2,
        value: '',
        readonly: false,
    },
    {
        type: 'text',
        col: 3,
        value: '',
        readonly: false,
    },
    {
        type: 'checkbox',
        col: 4,
        value: false,
        ruleMap: { false: '', true: 'Yes' },
        readonly: false,
    },
    {
        type: 'checkbox',
        col: 5,
        value: true,
        ruleMap: { false: 'No', true: '' },
        readonly: false,
    },
    {
        type: 'checkbox',
        col: 6,
        value: false,
        ruleMap: { false: '', true: 'Yes' },
        readonly: false,
    },
    {
        type: 'checkbox',
        col: 7,
        value: true,
        ruleMap: { false: 'No', true: '' },
        readonly: false,
    },
]
