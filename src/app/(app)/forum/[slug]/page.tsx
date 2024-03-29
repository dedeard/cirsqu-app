import { RAW_TAGS } from '@/constants/raw-tags'
import OtherQuestions from './components/OtherQuestions'
import QuestionPanel from './components/QuestionPanel'
import AuthorCard from './components/AuthorCard'
import Comments from './components/Comments'

const dummyProfile: IAProfile = {
  objectID: '123',
  name: 'John Doe',
  username: 'johndoe123',
  avatar: '',
  premium: true,
}

const dummyQuestion: IAQuestion = {
  objectID: '12345',
  userId: '67890',
  title: 'How to create dummy data?',
  content: `
  I'm trying to generate dummy data for TypeScript interfaces, and I could use some help. Here are the details of my question:

  ## Background
  I have TypeScript interfaces defined for user profiles and questions. Now, I need to create dummy data for testing purposes.

  ## Problem
  I'm not sure about the best approach to generate realistic dummy data that adheres to these interfaces.

  ## Request
  Can someone provide guidance or examples on how to create dummy data for TypeScript interfaces? Any help would be greatly appreciated!

  ### Additional Information
  - User Profile:
    - Name: John Doe
    - Username: johndoe123
    - Avatar: [Link to Avatar](https://example.com/avatar.jpg)
    - Premium: true

  - Question Details:
    - Question ID: 12345
    - User ID: 67890
    - Title: How to create dummy data?
    - Tags: TypeScript, Dummy Data
    - Answered: false
    - Created At: [Timestamp]
    - Updated At: [Timestamp]
  `,
  answered: false,
  _tags: ['typescript', 'dummy-data'],
  answer_count: 18,
  createdAt: new Date('Fri Dec 29 2020 16:35:09 GMT+0800').getTime(),
  updatedAt: new Date('Fri Dec 29 2020 16:35:09 GMT+0800').getTime(),
  user: dummyProfile,
}

export default function ForumPage() {
  return (
    <div className="flex flex-col gap-3 xl:flex-row">
      <div className="pt-3 xl:flex-1">
        <div className="rounded-lg border border-neutral-200 bg-neutral-200/30 dark:border-neutral-800 dark:bg-neutral-800/30 md:mb-3">
          <QuestionPanel question={dummyQuestion} />
          <Comments questionId={dummyQuestion.objectID} />
        </div>
      </div>
      <div className="xl:w-72">
        <div className="sticky top-16 w-full pb-3 xl:py-3">
          <AuthorCard name="Dede ariansya" username="dedeard" />
          <OtherQuestions tags={RAW_TAGS} />
        </div>
      </div>
    </div>
  )
}
