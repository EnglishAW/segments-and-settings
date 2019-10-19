import { h, createElement } from 'preact'
import { DataProvider } from './context/DataContext'
import { SettingsDataProvider } from './context/SettingsDataContext'
import Router from 'preact-router'
// import { createBrowserHistory } from 'history'
import QuestionSettingsPage from './pages/QuestionSettingsPage'
import AppBar from './ui-components/AppBar/AppBar'
import AppBarTitle from './ui-components/AppBar/AppBarTitle'
import { lime, green, lightGreen, blueGrey } from './assets/colors'
import SegmentsPage from './pages/SegmentsPage'
import { SegmentDataProvider } from './context/SegmentDataContext'
import { createHashHistory } from 'history'
import {
    ThemeContext,
    WiltonTheme,
    PaleNightMaterial,
} from './context/theme-context'
import { useContext } from 'preact/hooks/src'

const base_url = `/Users/aenglish/Dev/preact-forms/index.html`
// history.replaceState(0, '0', '/')
export const App = () => {
    // const theme = WiltonTheme
    const theme = PaleNightMaterial

    // Global Styles (TODO: find better way to do this)
    document.body.style.backgroundColor = theme.colors.background.primary
    document.body.style.color = theme.colors.text.default

    return (
        <div>
            <SettingsDataProvider>
                <SegmentDataProvider>
                    <DataProvider>
                        <ThemeContext.Provider value={theme}>
                            {/* <AppBar
                                color={lightGreen[400]}
                                backgroundColor="#1B1E2B"
                            > */}
                            <AppBar>
                                <AppBarTitle>Bayesian Bros.</AppBarTitle>
                            </AppBar>
                            <Router history={createHashHistory()}>
                                <QuestionSettingsPage path="/" />
                                <SegmentsPage path="/segments" />
                            </Router>
                        </ThemeContext.Provider>
                    </DataProvider>
                </SegmentDataProvider>
            </SettingsDataProvider>
        </div>
    )
}
