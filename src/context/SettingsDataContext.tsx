import { h, createContext } from 'preact'
import { useState, useContext } from 'preact/hooks'
import { exportXLSX, formatForm_aoa } from '../utilities/xlsx-export'
import { headersArray } from '../data/SettingsTemplate'

const SettingsDataContext = createContext<FormRowModel[] | undefined>(undefined)
const SettingsDataUpdaterContext = createContext<any>(undefined)

function SettingsDataProvider(props) {
    const [settingsDataState, setSettingsDataState]: [
        FormRowModel[],
        any
    ] = useState([])

    // Define Updaters
    const setSettingsData = (settingsDataState: FormRowModel[]) => {
        setSettingsDataState(settingsDataState)
    }
    const updateQuestionSettings = (newRow: FormRowModel) => {
        const updatedFrom = settingsDataState.map(row => {
            return row.key === newRow.key ? newRow : row
        })
        setSettingsDataState(updatedFrom)
    }
    // const updateQuestionField = (
    //     name: string,
    //     col: number,
    //     newValue: string
    // ) => {
    //     const updatedFrom = settingsDataState.map(row => {
    //         return row.name === name
    //             ? {
    //                   name: row.name,
    //                   fields: row.fields.map(field => {
    //                       return field.col === col
    //                           ? { ...field, value: newValue }
    //                           : field
    //                   }),
    //               }
    //             : row
    //     })

    //     setSettingsDataState(updatedFrom)
    // }

    const exportSettingsData = () => {
        // const formattedData = formatForm_aoa(settingsDataState, headersArray)
        // exportXLSX(formattedData)
    }

    return (
        <SettingsDataContext.Provider value={settingsDataState}>
            <SettingsDataUpdaterContext.Provider
                value={{
                    setSettingsData,
                    updateQuestionSettings,
                    // updateQuestionField,
                }}
            >
                {props.children}
            </SettingsDataUpdaterContext.Provider>
        </SettingsDataContext.Provider>
    )
}

function useSettingsData() {
    const settingsDataState = useContext(SettingsDataContext)
    if (typeof settingsDataState === undefined) {
        throw new Error(
            'useSettingsData must be used within a SettingsDataProvider'
        )
    }
    return settingsDataState
}

function useSettingsDataUpdater() {
    const setSettingsDataState = useContext(SettingsDataUpdaterContext)
    if (typeof setSettingsDataState === undefined) {
        throw new Error(
            'useSettingsDataUpdater must be used within a SettingsDataProvider'
        )
    }
    return setSettingsDataState
}

export { SettingsDataProvider, useSettingsData, useSettingsDataUpdater }
