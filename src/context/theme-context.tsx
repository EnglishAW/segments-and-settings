//import { h, Component } from 'preact'
import { createContext } from 'preact'
import { lightGreen, grey } from '../assets/colors'

// export enum ThemeName {
//     Dark = 'dark',
//     Light = 'light',
// }

// Wilton
export const WiltonTheme = {
    colors: {
        primary: '#007278',
        default: '#CCCCCC',
        secondary: '#E13D9D',
        tertiary: '#FCCE01',
        highlight: {
            primary: '#5AD4BA',
        },
        background: {
            primary: '#FFFFFF',
            secondary: '#EDEDED',
            tertiary: '#F5F5F5',
        },
        text: {
            primary: '#4B4B4B',
            secondary: '#969696',
            default: '#4B4B4B',
            dark: '#000000',
            light: '#FFFFFF',
        },
    },
    textOn: {
        primary: '#FFFFFF',
        default: '#FFFFFF',
        secondary: '#FFFFFF',
        tertiary: '#000000',
    },
    table: {
        header: {
            color: '#4B4B4B',
            backgroundColor: '#007278',
        },
        row: {
            backgroundColor: '#FFFFFF',
            backgroundColorAlt: '#EDEDED',
            color: '#4B4B4B',
        },
    },
    // typography: {

    // },
}
// PaleNightMaterial
export const PaleNightMaterial = {
    colors: {
        primary: lightGreen[400],
        default: '#CCCCCC',
        secondary: '#E13D9D',
        tertiary: '#A5D6A7',
        highlight: {
            primary: '#5AD4BA',
        },
        background: {
            primary: '#292D3F',
            secondary: '#1B1E2A',
            tertiary: '#212433',
        },
        text: {
            primary: lightGreen[400],
            secondary: '#969696',
            default: grey[300],
            dark: '#000000',
            light: '#FFFFFF',
        },
    },
    textOn: {
        primary: '#000000',
        default: '#FFFFFF',
        secondary: '#FFFFFF',
        tertiary: '#FFFFFF',
    },
    table: {
        header: {
            color: '#FFFFFF',
            backgroundColor: '#212433',
        },
        row: {
            backgroundColor: '#292D3F',
            backgroundColorAlt: '#212433',
            color: grey[300],
        },
    },
    // typography: {

    // },
}

export const ThemeContext = createContext(WiltonTheme)
