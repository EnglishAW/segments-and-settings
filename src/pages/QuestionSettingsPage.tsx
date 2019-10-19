import { h, Component, createRef } from 'preact'
import { css } from 'emotion'
import { useDataState, useDataUpdater } from '../context/DataContext'
import {
    readLabelsFile,
    exportXLSX,
    formatForm_aoa,
} from '../utilities/xlsx-export'
import FormContainer from '../components/settings/SettingsFormContainer'
import { useSettingsData } from '../context/SettingsDataContext'
import FileUploader from '../components/FileUploader'
import Button from '../ui-components/Button/Button'
import { Column } from '../utilities/scaffolding'
import { headersArray } from '../data/SettingsTemplate'

export interface QuestionSettingsPageProps {}

class QuestionSettingsPage extends Component<QuestionSettingsPageProps> {
    fileInputRef = createRef()
    constructor(props: QuestionSettingsPageProps) {
        super(props)
    }

    // const [sbssData, setSbssData] = useState([])

    handleFileInput = async () => {
        const { setDataState } = useDataUpdater()
        const fileUploader: any = this.fileInputRef.current
        const selectedFile = !!fileUploader && fileUploader.files[0]
        const dataArray = await readLabelsFile(selectedFile)

        setDataState(dataArray)
    }

    handleXLSXCOnvert = () => {
        const formattedData = formatForm_aoa(useSettingsData(), headersArray)
        exportXLSX(formattedData)
    }

    render() {
        const questions = useDataState()
        return (
            <div>
                {questions.length === 0 ? (
                    <Column>
                        {/* <h1>Lets get started by uploading a questions.txt file</h1> */}
                        <FileUploader
                            inputRef={this.fileInputRef}
                            onFileSelect={this.handleFileInput}
                        />
                    </Column>
                ) : (
                    <Column className={ContentWrapper}>
                        <Button
                            variant="contained"
                            onClick={this.handleXLSXCOnvert}
                        >
                            Export
                        </Button>
                        <FormContainer questions={questions} />
                        <Button
                            variant="contained"
                            onClick={this.handleXLSXCOnvert}
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

export default QuestionSettingsPage
