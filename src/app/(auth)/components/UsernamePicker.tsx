/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import { usernameNotExist } from '@/utils/firebase/firestore'
import Button from './elements/Button'
import Input from './Input'

const schema = yup
  .string()
  .required()
  .min(6)
  .max(20)
  .test('alphanumeric', 'Username must only contain alphanumeric characters.', (value) => /^[a-zA-Z0-9]*$/.test(value))
  .test('username-unique', 'Username is already taken, please choose another one.', usernameNotExist)
  .label('Username')

type PropTypes = {
  onPicked: (value: string) => void
}

export const UsernamePicker: React.FC<PropTypes> = ({ onPicked }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [isStart, setIsStart] = useState(false)
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>()
  const [username, setUsername] = useState('')
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout)
      setTypingTimeout(undefined)
    }
    if (username) {
      setIsStart(true)
    }
    setSuccess(false)
    setIsTyping(true)
    setError('')
    setIsLoading(false)

    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false)
      }, 1000),
    )

    return () => {
      if (typingTimeout) clearTimeout(typingTimeout)
    }
  }, [username])

  useEffect(() => {
    if (!isTyping && isStart) {
      setIsLoading(true)
      setSuccess(false)
      schema
        .validate(username)
        .then(() => {
          setError('')
          setSuccess(true)
        })
        .catch((error: any) => {
          setError(error.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isTyping])

  return (
    <>
      <h2 className="mb-3 text-center text-lg uppercase">Pick Your Username</h2>
      <Input
        label="Username"
        type="text"
        value={username}
        loading={isStart && (isLoading || isTyping)}
        error={error}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="my-6">
        <Button disabled={!success} style={{ cursor: success ? '' : 'not-allowed' }} onClick={() => onPicked(username)}>
          Next
        </Button>
      </div>
    </>
  )
}

export default UsernamePicker
