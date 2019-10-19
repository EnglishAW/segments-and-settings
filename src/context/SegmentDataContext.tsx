import { h, createContext } from 'preact'
import { useState, useContext, StateUpdater } from 'preact/hooks'

const SegmentStateContext = createContext<{
    segmentsFormState: Segment[]
    segmentsUsed: Array<string | number>
}>({ segmentsFormState: [], segmentsUsed: [] })
const SegmentActionsContext = createContext({
    setSegmentData: (_: any) => {},
    addSegment: (_: Segment) => {},
    updateSegments: (_: Segment) => {},
})

const colKeyMap = {
    name: 0,
    question: 1,
    response: 2,
}

// CLean up in a separate types file
function SegmentDataProvider(props) {
    const [segmentsFormState, setData]: [
        Segment[],
        StateUpdater<Segment[]>
    ] = useState([])
    const [segmentsResponseOptions, setSegmentsResponseOptions] = useState([])
    const [segmentsUsed, setSegmentsUsed] = useState([])

    // Provate functions
    const initSegmentsResponseOptions = () => {
        return segmentsFormState.map(segmentGroup => {
            return segmentGroup.responses.map(response => {
                return {
                    key: response.key,
                    group: segmentGroup.key,
                    options: response.fields[2].options,
                }
            })
        })
    }
    const getColUsedOptions = (colKey: number, form: FormRowModel[]) => {
        //setSegmentsUsedOptions(
        return form.map((segment: FormRowModel) => {
            const newUsedOptions = segment.fields
                .filter(f => {
                    return f.col === colKey && f.value !== ''
                })
                .map(field => {
                    return field.value
                })
            return {
                key: segment.key,
                usedOptions: newUsedOptions,
            } as SegmentUsedOption
        })
        //)
    }

    const cacheSegments = data => {
        sessionStorage.setItem('segmentsCache', JSON.stringify(data))
    }

    // Define Updaters

    const setSegmentData = (segmentsFormState: Segment[]) => {
        setSegmentsResponseOptions(initSegmentsResponseOptions())
        setData(segmentsFormState)
        cacheSegments({ segmentsFormState, segmentsUsed })
    }

    const addSegment = (segment: Segment) => {
        setData([...segmentsFormState, segment])
        setSegmentsUsed([...segmentsUsed, segment.key])
        cacheSegments({
            segmentsFormState: [...segmentsFormState, segment],
            segmentsUsed: [...segmentsUsed, segment.key],
        })
    }

    const updateSegments = (newSegment: Segment) => {
        const updatedSegments = segmentsFormState.map(segment => {
            // const availableOptions = segmentsResponseOptions.filter
            return segment.key === newSegment.key ? newSegment : segment
        })
        setData(updatedSegments)
        cacheSegments({
            segmentsFormState: updatedSegments,
            segmentsUsed,
        })
        // console.log(getColUsedOptions(colKeyMap['response'], updatedSegments))
    }

    // const exportSegmentsData = () => {
    //     const formattedData = formatSegments_aoa(segmentsFormState, headersArray)
    //     exportXLSX(formattedData)
    // }

    // Check if we have a cached version of segments
    if (segmentsUsed.length === 0 && sessionStorage.getItem('segmentsCache')) {
        const { segmentsFormState, segmentsUsed } = JSON.parse(
            sessionStorage.getItem('segmentsCache')
        )
        setData(segmentsFormState)
        setSegmentsUsed(segmentsUsed)
    }

    return (
        <SegmentStateContext.Provider
            value={{ segmentsFormState, segmentsUsed }}
        >
            <SegmentActionsContext.Provider
                value={{ setSegmentData, addSegment, updateSegments }}
            >
                {props.children}
            </SegmentActionsContext.Provider>
        </SegmentStateContext.Provider>
    )
}

function useSegmentDataState() {
    const segmentState = useContext(SegmentStateContext)
    if (typeof segmentState === undefined) {
        throw new Error(
            'useSegmentDataState must be used within a SegmentDataProvider'
        )
    }
    return segmentState
}

function useSegmentActions() {
    const segmentState = useContext(SegmentActionsContext)
    if (typeof segmentState === undefined) {
        throw new Error(
            'useSegmentActions must be used within a SegmentDataProvider'
        )
    }
    return segmentState
}

export { SegmentDataProvider, useSegmentDataState, useSegmentActions }
