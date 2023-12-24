import Link from 'next/link'
import React from 'react'

export default function RulesPage() {
  return (
    <div className="w-full rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30 md:max-w-2xl">
      <div className="flex h-[74px] items-center justify-between border-b border-neutral-200 px-3 dark:border-neutral-800 md:px-5">
        <h1 className="flex-1 text-lg uppercase md:text-xl md:tracking-widest">Community Guidelines</h1>
      </div>
      <div className="p-3  md:px-5">
        <p className="mb-3 text-lg">Please read these guidelines before posting</p>

        <ul className="mb-3 list-inside list-disc text-sm">
          <li>Choose a relevant title when asking questions; avoid generic titles like "HELP" or "TOLONG."</li>
          <li>Provide details about your efforts and what you've already attempted.</li>
          <li>If you find a solution, share it, or acknowledge helpful responses by marking them as correct.</li>
          <li>Clearly explain the context of your problem, detailing what occurred and your desired outcome.</li>
          <li>Include relevant portions of your code to facilitate a better understanding of your issue.</li>
          <li>Check if your question has been asked before posting a new one.</li>
          <li>Respect others' opinions and be courteous in your interactions.</li>
          <li>Avoid spamming or posting irrelevant content.</li>
          <li>Keep discussions focused on the topic and refrain from off-topic conversations.</li>
          <li>Refrain from using offensive language or engaging in personal attacks.</li>
          <li>Use appropriate tags to categorize your posts for easier navigation.</li>
          <li>Report any inappropriate behavior or content to the moderators.</li>
        </ul>

        <div className="flex justify-center py-3">
          <Link href="/forum/create" className="hoverable-blue block rounded-lg p-3 text-center text-sm">
            Start a New Discussion
          </Link>
        </div>
      </div>
    </div>
  )
}
