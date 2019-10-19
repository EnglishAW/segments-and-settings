// * * * Labels.txt Model Types * * * //

type Question = {
    key: string | number
    name: string
    labels: Array<QuestionLabel>
}

type QuestionLabel = {
    label: string
    code: number
}

// * * * Form Model Types * * * //

type FormRowModel =
    | {
          key: string
          group?: string | number
          fields: Array<FieldModel>
      }
    | SegmentFormRow

type FieldModel = {
    type: string
    col: number
    value: string | number | boolean
    readonly: boolean
    ruleMap?: BooleanRuleMap
    options?: Array<OptionType>
}

type BooleanRuleMap = {
    false: string
    true: string
}

type OptionType = {
    code: number | string | string[]
    label: string
}

// * * * Quesiton Settings Types * * * //

// type SettingsOutputType = Array<FormRowModel>

// * * * Segments * * * //

type Segment = {
    key: string | number
    name: string
    responses: FormRowModel[]
}
type SegmentFormRow = {
    key: string
    group: string | number
    fields: Array<FieldModel>
    allOptions?: Array<number | string>
    availableOptions?: Array<number | string>
}

type SegmentUsedOption = {
    key: string
    usedOptions: any[]
}

// type SegmentsOutput = Array<Segment>

// type Segment = {
//     name: string
//     question: string
//     labels: Array<QuestionLabel>
// }

// Use if we need more rigid order
// type SegmentLabels = {
//     // order: number
//     label: string
//     code: number
// }

// * * * Theme Types * * * //
type Theme = {
    colors: {
        primary: string
        default: string
        secondary: string
        tertiary: string
        highlight: {
            primary: string
        }
        background: {
            primary: string
            secondary: string
            tertiary: string
        }
        text: {
            primary: string
            secondary: string
            default: string
            dark: string
            light: string
        }
    }
    textOn: {
        primary: string
        default: string
        secondary: string
        tertiary: string
    }
    // typography: {

    // },
}
