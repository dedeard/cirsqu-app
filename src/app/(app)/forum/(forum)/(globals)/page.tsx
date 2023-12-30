import QuestionItem from '../components/QuestionItem'

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
    <ul className="flex flex-col gap-3 pt-3 xl:pb-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <QuestionItem question={dummyQuestion} />
        </li>
      ))}
    </ul>
  )
}
