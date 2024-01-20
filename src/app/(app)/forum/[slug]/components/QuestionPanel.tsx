import React from 'react'
import moment from 'moment'
import Markdown from 'react-markdown'

const QuestionPanel: React.FC<{ question: IAQuestion }> = ({ question }) => {
  return (
    <>
      <div className="border-b border-neutral-200 px-3 py-5 dark:border-neutral-800">
        <h1 className="mb-3 text-2xl lg:text-3xl">{question.title}</h1>
        <p className="flex flex-wrap gap-3 text-sm">
          <span className="block">
            <span className="opacity-60">Asked </span>
            <span>{moment(question.createdAt).fromNow()}</span>
          </span>
          {!!question.updatedAt && (
            <span className="block">
              <span className="opacity-60">Modified </span>
              <span>{moment(question.updatedAt).fromNow()}</span>
            </span>
          )}
        </p>
      </div>

      <article className="prose prose-neutral w-full max-w-full p-3 dark:prose-invert">
        <Markdown>{question.content}</Markdown>
      </article>
    </>
  )
}

export default QuestionPanel
