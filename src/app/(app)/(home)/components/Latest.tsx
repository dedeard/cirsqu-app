'use client'
import React from 'react'

const Latest: React.FC<React.HTMLAttributes<HTMLDivElement>> = (props) => {
  return (
    <div {...props}>
      <h2>The Latest</h2>

      <ul className="grid grid-cols-1 gap-3">
        {Array.from(Array(5).keys()).map((i) => (
          <li key={i}>
            <a href="#" className="block rounded-medium bg-content2 p-3 dark:bg-content1">
              <div>
                <a href="#laravel">LARAVEL</a>
                <a href="#livewire">LIVEWIRE</a>
              </div>
              <h3>Build a URL Shortener with Volt and Folio</h3>
              <div>
                <span>10 episodes</span>
                <span>53 minutes</span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <a href="#">Browse all lessons</a>
    </div>
  )
}

export default Latest
