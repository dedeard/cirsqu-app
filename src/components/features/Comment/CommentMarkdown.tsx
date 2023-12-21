import React from 'react'
import Markdown, { Components, Options } from 'react-markdown'
import Link from 'next/link'
import gfm from 'remark-gfm'
import mentions from 'remark-mentions'
import highlight from 'rehype-highlight'

const baseComponents: Partial<Components> = {
  h1: 'p',
  h2: 'p',
  h3: 'p',
  h4: 'p',
  h5: 'p',
  h6: 'p',
  img(props) {
    return (
      <a href={props.src} title={props.title} target="_blank" rel="noopener noreferrer nofollow">
        {props.alt || props.src}
      </a>
    )
  },
  iframe(props) {
    return (
      <a href={props.src} title={props.title} target="_blank" rel="noopener noreferrer nofollow">
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
  a({ href, children }) {
    if (href?.startsWith('/')) {
      return <Link href={href}>{children}</Link>
    }

    if (href?.startsWith('#')) {
      return <a href={href}>{children}</a>
    }

    return (
      <a target="_blank" rel="noopener noreferrer nofollow" href={href}>
        {children}
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
      // @ts-ignore
      remarkPlugins={[gfm, [mentions, { usernameLink: (username) => `/@${username}` }]]}
      rehypePlugins={[highlight]}
    >
      {children}
    </Markdown>
  )
}

export default CommentMarkdown
