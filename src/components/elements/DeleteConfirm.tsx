'use client'
import React from 'react'
import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'
import { XCircle } from 'react-feather'

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
    <>
      <Modal isOpen={isOpen} placement="center" backdrop="blur" isKeyboardDismissDisabled isDismissable={false} hideCloseButton>
        <ModalContent>
          <ModalBody className="p-0">
            <div className="flex pt-14">
              <XCircle strokeWidth={0.5} className="m-auto h-28 w-28 text-danger" />
            </div>

            <div className="p-5 text-center">
              <h3 className="mb-4 text-3xl font-light">{title || 'Delete Confirmation'}</h3>
              <p className="mb-6 text-sm">{message || 'Are you sure you want to delete this item? This action cannot be undone.'}</p>

              <div className="flex justify-center gap-4">
                <Button variant="bordered" className="w-32" isDisabled={isLoading} onClick={onCancel}>
                  Cancel
                </Button>
                <Button className="w-32" color="danger" isLoading={isLoading} onClick={onConfirm}>
                  {!isLoading && 'Delete'}
                </Button>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteConfirm
