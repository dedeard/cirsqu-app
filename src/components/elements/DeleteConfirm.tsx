'use client'
import React from 'react'
import { XCircle } from 'react-feather'
import cn from 'classnames'
import Spinner from '../svg/Spinner'

type PropTypes = {
  isOpen?: boolean
  isLoading?: boolean
  title?: string
  message?: string
  onCancel?: () => void
  onConfirm?: () => void
}

const DeleteConfirm: React.FC<PropTypes> = ({ isOpen, isLoading, title, message, onCancel, onConfirm }) => {
  return (
    <div
      className={cn(
        isOpen && 'opacity-100',
        !isOpen && 'pointer-events-none opacity-0',
        'fixed bottom-0 left-0 right-0 top-0 z-[60] flex bg-white/30 p-3 backdrop-blur transition-opacity dark:bg-black/30',
      )}
    >
      <div className="m-auto max-w-md rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex pt-14">
          <XCircle strokeWidth={0.5} className="m-auto h-28 w-28 text-red-600" />
        </div>

        <div className="p-5 text-center">
          <h3 className="mb-4 text-3xl font-light">{title || 'Delete Confirmation'}</h3>
          <p className="mb-6 text-sm">{message || 'Are you sure you want to delete this item? This action cannot be undone.'}</p>

          <div className="flex justify-center gap-4">
            <button
              className="hoverable-default flex h-10 w-32 items-center justify-center rounded-lg border text-sm"
              disabled={isLoading}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className="hoverable-red flex h-10 w-32 items-center justify-center rounded-lg text-sm"
              disabled={isLoading}
              onClick={onConfirm}
            >
              {!isLoading && 'Delete'}
              {isLoading && <Spinner className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirm
