import { h } from 'preact'
import { css } from 'emotion'
import { DocumentUpload } from '../assets/icons/DocumentUpload'
import { green, blueGrey } from '../assets/colors'
import { useState } from 'preact/hooks'
import { Column, CenterBox } from '../utilities/scaffolding'

export interface FileUploaderProps {
    className?: string
    inputRef?: any
    onFileSelect: () => {}
}

export const FileUploader = (props: FileUploaderProps) => {
    const { inputRef, onFileSelect } = props
    const [isDragOver, setIsDragOver] = useState(false)
    // useEffect(() => {
    //     inputRef.addEventListener('drop', this.handleResize)
    // }, inputRef)
    return (
        <CenterBox
            className={wrapperClass(isDragOver)}
            onClick={e => {
                !!inputRef.current && inputRef.current.click()
                // setIsDragOver(true)
            }}
            onMouseDown={() => setIsDragOver(true)}
            onMouseUp={() => setIsDragOver(false)}
            onMouseLeave={() => setIsDragOver(false)}
            onDragEnter={() => setIsDragOver(true)}
            onDragLeave={() => setIsDragOver(false)}
            onDragOver={e => {
                e.preventDefault()
                e.stopPropagation()
            }}
            onDrop={e => {
                e.preventDefault()
                e.stopPropagation()
                setIsDragOver(false)
                // Add the file to the element and trigger the callback
                inputRef.current.files = e.dataTransfer.files
                onFileSelect()
            }}
        >
            <Column className={contentClass}>
                <DocumentUpload className={iconClass(isDragOver)} />
                <h3>Drag or Click to uplaod a file</h3>
                <input
                    className={inputClass}
                    ref={inputRef}
                    type="file"
                    id="input"
                    hidden
                    onChange={onFileSelect}
                />
            </Column>
        </CenterBox>
    )
}

const wrapperClass = isDragOver => css`
    z-index: 10;
    width: 100%;
    max-width: 600px;
    height: 300px;
    border: 3px dashed ${isDragOver ? green[200] : blueGrey[600]};
    border-radius: 10px;
    background-color: ${isDragOver ? `${green[300]}26` : 'transparent'};
    color: ${isDragOver ? green[200] : blueGrey[400]};
    margin: 20px;
    box-sizing: border-box;
    cursor: pointer;
`
const contentClass = css`
    pointer-events: none;
`

const inputClass = css`
    /* display: none; */
`
const iconClass = isDragOver => css`
    fill: ${isDragOver ? green[200] : blueGrey[400]};
    width: 50px;
`

export default FileUploader
