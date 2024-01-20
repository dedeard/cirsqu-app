'use client'

import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import Input from './Input'
import Textarea from './Textarea'
import TagInput from './TagInput'
import Button from './Button'
import { RAW_TAGS } from '@/constants/raw-tags'

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
          options={RAW_TAGS}
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
