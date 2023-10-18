import React from 'react'

const Subjects: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h2>Pick a Subject</h2>
      <p>Cirsqu is packed with lessons on all of these Subjects.</p>

      <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {Array.from(Array(6).keys()).map((i) => (
          <li key={i}>
            <a href="#" className="block rounded-medium bg-content2 p-3 dark:bg-content1">
              <span>19 lessons</span>
              <h3>Livewire</h3>
              <p>A full-stack framework for Laravel that makes building dynamic interfaces simple.</p>
            </a>
          </li>
        ))}
      </ul>

      <a href="#">Browse all subjects</a>
    </div>
  )
}

export default Subjects
