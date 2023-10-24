import React from 'react'
import Markdown, { Components, Options } from 'react-markdown'
import gfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const baseComponents: Partial<Components> = {
  h1: 'p',
  h2: 'p',
  h3: 'p',
  h4: 'p',
  h5: 'p',
  h6: 'p',
  img(props) {
    return (
      <a href={props.src} title={props.title} target="_blank" rel="noopener">
        {props.alt || props.src}
      </a>
    )
  },
  iframe(props) {
    return (
      <a href={props.src} title={props.title} target="_blank" rel="noopener">
        {props.about || props.src}
      </a>
    )
  },
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
  a(props) {
    return (
      <a href={props.href} title={props.title} target="_blank" rel="noopener">
        {props.children}
      </a>
    )
  },
}

const CommentMarkdown: React.FC<Readonly<Options>> = ({ components, children, ...props }) => {
  return (
    <Markdown
      {...props}
      components={{
        ...components,
        ...baseComponents,
      }}
      remarkPlugins={[gfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {children}
    </Markdown>
  )
}

export default CommentMarkdown
