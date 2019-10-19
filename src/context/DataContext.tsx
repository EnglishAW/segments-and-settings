import { h, createContext } from 'preact'
import { useState, useContext, useCallback } from 'preact/hooks'

const DataStateContext = createContext<Question[]>([])
const DataUpdaterContext = createContext({
    setDataState: (_: Question[]) => {},
})

function DataProvider(props) {
    const [data, setData]: [Question[], any] = useState([])

    // Define Updaters

    const setDataState = (data: Question[]) => {
        setData(data)
        sessionStorage.setItem('questionData', JSON.stringify(data))
    }

    // Check if we have a cached version of questions
    if (data.length === 0 && sessionStorage.getItem('questionData')) {
        const cachedQuestions = JSON.parse(
            sessionStorage.getItem('questionData')
        )
        setDataState(cachedQuestions)
    }

    return (
        <DataStateContext.Provider value={data}>
            <DataUpdaterContext.Provider value={{ setDataState }}>
                {props.children}
            </DataUpdaterContext.Provider>
        </DataStateContext.Provider>
    )
}

function useDataState() {
    const dataState = useContext(DataStateContext)
    if (typeof dataState === undefined) {
        throw new Error('useDataState must be used within a DataProvider')
    }
    return dataState
}

function useDataUpdater() {
    const setData = useContext(DataUpdaterContext)
    if (typeof setData === undefined) {
        throw new Error('useDataUpdater must be used within a DataProvider')
    }
    return setData
}

export { DataProvider, useDataState, useDataUpdater }
