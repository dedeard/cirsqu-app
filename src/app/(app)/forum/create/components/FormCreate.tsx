'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Input from './Input'
import Textarea from './Textarea'
import TagInput from './TagInput'
import Button from './Button'

const rawTags = [
  'html',
  'css',
  'javascript',
  'database',
  'php',
  'ruby',
  'design',
  'java',
  'tool',
  'bebas',
  'android',
  'hosting',
  'wordpress',
  'codeigniter',
  'laravel',
  'jquery',
  'nodejs',
  'vue',
  'angular',
  'mobile',
  'api',
  'ajax',
  'python',
  'game',
  'c',
  'c++',
  'swift',
  'ios',
  'objective-c',
  'seo',
  'website',
  'tips-dan-trik',
  'slim',
  'sharing',
  'linux',
  'UX',
  'testing',
  'firebase',
  'responsive',
  'progressive-web-app',
  'flask',
  'django',
  'data-science',
  'reactjs',
  'nuxtjs',
  'vuex',
  'react-native',
  'redux',
  'nextjs',
  'mysql',
  'mongodb',
  'graphql',
  'gatsbyjs',
  'go',
  'flutter',
  'nativescript',
  'kotlin',
  'sqlite',
  'karir',
  'produktivitas',
  'server',
  'windows',
  'mac',
  'AWS',
  'hugo',
  'machine-learning',
  'artificial-intelligence',
  'menulis',
  'softskill',
  'remote',
  'opensource',
  'algoritma',
  'dokumentasi',
  'rust',
  'typescript',
  'text-editor',
  'belajar',
  'security',
  'motivasi',
  'matematika',
  'static-site',
  'snippet',
  'Alpinejs',
  'Lumen',
  'Deno',
  'wawancara',
  'komunitas',
  'startup',
  'inspirasi',
  'keragaman',
  'git',
  'tailwindcss',
  'laravel-livewire',
  'inertiajs',
  'dart',
  'serverless',
  'struktur-data',
  'analisis',
  'fastAPI',
  'karya',
]

const validationSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  tags: yup.array().of(yup.string()).min(1).max(4).required(),
})

const FormCreate: React.FC = () => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tags: [],
    },
    validationSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    },
  })

  return (
    <div className="p-3">
      <form onSubmit={formik.handleSubmit}>
        <Input
          label="Question Title"
          placeholder="Enter your question title"
          className="mb-6"
          name="title"
          value={formik.values.title}
          error={formik.errors.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Textarea
          label="Question Content (supports Markdown)"
          placeholder="Enter your question using Markdown..."
          className="mb-6"
          name="content"
          rows={10}
          value={formik.values.content}
          error={formik.errors.content}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <TagInput
          label="Tags (up to 4)"
          className="mb-6"
          name="tags"
          options={rawTags}
          value={formik.values.tags}
          error={formik.errors.tags}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Button type="submit">Post Question</Button>
      </form>
    </div>
  )
}

export default FormCreate
