import { h, Component, createRef } from 'preact'
import { css } from 'emotion'
import { useDataState, useDataUpdater } from '../context/DataContext'
import {
    readLabelsFile,
    exportXLSX,
    formatForm_aoa,
} from '../utilities/xlsx-export'
import FormContainer from '../components/segments/SegmentFormContainer'
import { headersArray } from '../data/SegmentTemplate'
import FileUploader from '../components/FileUploader'
import Button from '../ui-components/Button/Button'
import { Column } from '../utilities/scaffolding'
import { useSegmentDataState } from '../context/SegmentDataContext'
import { compose, pipe, partial, map, curry } from 'rambda'
import { useContext } from 'preact/hooks'
import { ThemeContext } from '../context/theme-context'

export interface SegmentsPageProps {}

class SegmentsPage extends Component<SegmentsPageProps> {
    fileInputRef = createRef()
    constructor(props: SegmentsPageProps) {
        super(props)
    }

    handleFileInput = async () => {
        const { setDataState } = useDataUpdater()
        const fileUploader: any = this.fileInputRef.current
        const selectedFile = !!fileUploader && fileUploader.files[0]
        const dataArray = await readLabelsFile(selectedFile)

        setDataState(dataArray)
    }

    handleXLSXConvert = () => {
        const { segmentsFormState } = useSegmentDataState()
        const segmentResponses = segmentsFormState
            .map(segment => {
                return segment.responses.map(response => {
                    return response
                })
            })
            .flat(1)
        compose(
            exportXLSX,
            formatForm_aoa
        )(segmentResponses, headersArray)
    }

    render() {
        const questions = useDataState()
        const theme = useContext(ThemeContext)
        return (
            <div class="segments">
                {questions.length === 0 ? (
                    <Column>
                        {/* <h1>Lets get started by uploading a labels.txt file</h1> */}
                        <FileUploader
                            inputRef={this.fileInputRef}
                            onFileSelect={this.handleFileInput}
                        />
                    </Column>
                ) : (
                    <Column className={ContentWrapper}>
                        <h1>Segments</h1>
                        <Button
                            variant="contained"
                            // color={theme.colors.secondary}
                            onClick={this.handleXLSXConvert}
                        >
                            Export
                        </Button>
                        <FormContainer
                            headers={headersArray}
                            questions={questions}
                        />
                        <Button
                            variant="contained"
                            // color={theme.colors.secondary}
                            onClick={this.handleXLSXConvert}
                        >
                            Export
                        </Button>
                    </Column>
                )}
            </div>
        )
    }
}

const ContentWrapper = css`
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
`

export default SegmentsPage
