/* Preact compatible emotion styled function
 * TODO: Better types
 */

import { h, createElement, Component } from 'preact'
import { css } from 'emotion'

type ComponentProps = {
    children?: any
}

export const styled = (Component: string | ((props: any) => any)) => (
    style_literal: TemplateStringsArray,
    ...tags: any[]
) => {
    const string_of_literal = (props: any) =>
        style_literal
            .map((string, i) => {
                // if the tag is a function we need to call it with props
                // and get its return value
                const tag_value =
                    !!tags[i] && typeof tags[i] === 'function'
                        ? tags[i](props)
                        : tags[i]
                return !!tag_value ? `${string}${tag_value}` : string
            })
            .join('')

    const concatClassName = props => {
        const style_class = css(string_of_literal(props))
        return !!props.className
            ? css`
                  ${style_class};
                  ${props.className};
              `
            : style_class
    }

    return typeof Component === 'string'
        ? (props: any) => {
              return h(
                  Component,
                  {
                      ...props,
                      className: concatClassName(props),
                  },
                  props.children
              )
          }
        : typeof Component === 'function'
        ? (props: any) => {
              return (
                  <Component {...props} className={concatClassName(props)}>
                      {props.children}
                  </Component>
              )
          }
        : null
}
