import * as XLSX from 'xlsx'
import { WritingOptions } from 'xlsx'
import { saveAs } from 'file-saver'
import { flatten, curry } from 'rambda'

export const exportXLSX = (aoaData: any[][]) => {
    // const sample = {
    //     cols: [
    //         { name: 'A', key: 0 },
    //         { name: 'B', key: 1 },
    //         { name: 'C', key: 2 },
    //     ],
    //     data: [
    //         ['id', 'name', 'value'],
    //         [1, 'sheetjs', 7262],
    //         [2, 'js-xlsx', 6969],
    //     ],
    // }

    var worksheet = XLSX.utils.aoa_to_sheet(aoaData)
    var new_workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(new_workbook, worksheet, 'SheetJS')
    /* bookType can be any supported output type */
    const wopts: WritingOptions = {
        bookType: 'xlsx',
        bookSST: false,
        type: 'array',
    }

    const wbout = XLSX.write(new_workbook, wopts)

    /* the saveAs call downloads a file on the local machine */
    saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'test.xlsx')
    return true
}

export const readLabelsFile = async selectedFile => {
    // :( Mutable

    const fileText = await readFileAsText(selectedFile)
    const dataArray = parseLabelsFile(fileText)
    // console.log(dataArray)

    // reader.then((resolve) => {

    //     onfulfilled(reader)
    // })
    return dataArray
}

export const formatForm_aoa = (
    settingsData: FormRowModel[],
    headers: string[]
): any[][] => {
    const aoaData = settingsData.map(row => {
        const questionFields: FieldModel[] = row.fields.flatMap(field => {
            return !!field.ruleMap
                ? field.ruleMap[field.value.toString()]
                : field.value
        })
        return questionFields
    })
    return [headers, ...aoaData]
}

// export const formatSegments_aoa = (
//     segmentsData: SegmentsOutput,
//     headers: string[] = []
// ): any[][] => {
//     const aoaData = segmentsData
//         .map(segment => {
//             const rows = segment.labels.map((label, label_row) => {
//                 return label_row > 0
//                     ? [segment.name, segment.question, label.code.toString()]
//                     : ['', '', label.code.toString()]
//             })
//             console.log(...rows)
//             return rows
//         })
//         .flat(1)
//     console.log(aoaData)
//     return [headers, ...aoaData]
// }

const parseLabelsFile = fileText => {
    // console.info('Read file ' + fileInfo.name + ' of size ' + fileInfo.size)
    // // You can use fileInfo.content, which is a Uint8Array, here
    // let enc = new TextDecoder('utf-8')
    // const fileText = enc.decode(fileInfo.content)
    const fileLines = fileText.split('\n')
    let dataArray: Question[] = []
    let questionLabels: Question
    for (let i = 2; i < fileLines.length; i++) {
        const cols = fileLines[i].split('\t')
        if (cols[0].trim() !== '' && cols[0].trim() !== 'a') {
            let questionName: string = cols[0]
            questionLabels = {
                key: questionName,
                name: questionName,
                labels: [
                    {
                        code: parseInt(cols[1]),
                        label: cols[2],
                    },
                ],
            }
            dataArray.push(questionLabels)
        } else {
            questionLabels.labels.push({
                code: parseInt(cols[1]),
                label: cols[2],
            })
        }
    }
    return dataArray
}

/**
 * Utility function to read an entire file into memory.
 *
 * The handler function gets passed an array of objects:
 * {
 *     name: filename as string,
 *     size: size in bytes as number,
 *     type: MIME type as string,
 *     content: file content as Uint8Array
 * }
 * @param file The file to read
 * @param handler
 */
export const readFileAsText = file => {
    var reader = new FileReader()

    return new Promise((resolve, reject) => {
        reader.onerror = () => {
            reader.abort()
            reject(new DOMException('Problem parsing input file.'))
        }
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.readAsText(file)
    })
}
