import { h, Component } from 'preact'
import { css } from 'emotion'
import { cyan } from '../assets/colors'
import { useState } from 'preact/hooks/src'

export interface ChipProps {
    className?: string
    value: string | number
    color?: string
    children?: any
}

export const Chip = (props: ChipProps) => {
    return <div className={chipClass}>{props.children}</div>
}

const chipClass = css`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${cyan[800]};
    border-radius: 1em;
    padding: 2px 5px;
    margin: 2px;
    min-width: 75px;
    width: 100%;
    box-sizing: border-box;
    cursor: pointer;
`

export default Chip
