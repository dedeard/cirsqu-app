import React from 'react'
import { CheckCircle, MessageCircle } from 'react-feather'
import Link from 'next/link'
import moment from 'moment'
import Avatar from '@/components/elements/Avatar'

const QuestionItem: React.FC<{ question: IAQuestion }> = ({ question }) => {
  return (
    <Link
      href={`/forum/${question.objectID}`}
      className="hoverable-default group relative flex flex-col gap-5 overflow-hidden rounded-lg border p-3  lg:p-6"
    >
      <div className="flex justify-between gap-3">
        <h3 className="text-2xl">{question.title}</h3>
        {question.answered && (
          <span className="block h-5 w-5">
            <CheckCircle size={20} className="text-green-600" />
          </span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Avatar
          size={48}
          name={question.user.name}
          src={question.user.avatar}
          className="rounded-full bg-neutral-200 group-hover:bg-neutral-300 dark:bg-neutral-800 dark:group-hover:bg-neutral-700"
        />
        <span className="flex flex-col">
          <span className="mb-1 block text-sm leading-none">{question.user.name}</span>
          <span className="mb-2 block text-xs leading-none opacity-70">@{question.user.username}</span>
          <span className="block text-xs leading-none opacity-70">{moment(question.createdAt).fromNow()}</span>
        </span>
      </div>

      <div className="flex justify-between gap-3 opacity-70">
        <span className="flex flex-wrap gap-2 text-sm">
          {question._tags.map((tag) => (
            <span key={tag} className="block">
              {'#' + tag}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-2">
          <span className="block text-sm">{question.answer_count || 0}</span>
          <span className="block">
            <MessageCircle size={16} />
          </span>
        </span>
      </div>

      <div className="absolute right-0 top-1/2 z-0 -translate-y-1/2 text-[30vw] md:text-[23vw] lg:text-[15vw]">
        <div className="flex h-[1.2em] w-[1.2em] items-center justify-center leading-none transition-transform group-hover:rotate-12 group-hover:scale-110">
          <MessageCircle className="block h-3/4 w-3/4 opacity-10" />
        </div>
      </div>
    </Link>
  )
}

export default QuestionItem
