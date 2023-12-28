import QuestionItem from '../components/QuestionItem'

export default function MyQuestionPage() {
  return (
    <ul className="flex flex-col gap-3 pt-3 xl:pb-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <QuestionItem question={{}} />
        </li>
      ))}
    </ul>
  )
}
