import type { MDXComponents } from 'mdx/types'
import React from 'react'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    pre({ children, className }) {
      return (
        <pre className={className}>
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child, {
              className: child.props.className || 'hljs',
            }),
          )}
        </pre>
      )
    },
    ...components,
  }
}
