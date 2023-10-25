import React from 'react'
import { Modal, ModalContent, ModalBody, Button } from '@nextui-org/react'
import { XCircle } from 'react-feather'
import useCommentActions from './hooks/useCommentActions'

type PropTypes = {
  comment: IComment | null
  setDeleteQueue: (comment: IComment | null) => void
}

const DeleteCommentConfirm: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const { isActionInProgress, handleDeleteComment } = useCommentActions(comment?.commentId || '')

  const handleConfirm = async () => {
    await handleDeleteComment()
    setDeleteQueue(null)
  }

  return (
    <>
      <Modal isOpen={!!comment} placement="center" backdrop="blur" isKeyboardDismissDisabled isDismissable={false} hideCloseButton>
        <ModalContent>
          {() => (
            <ModalBody className="p-0">
              <div className="flex pt-14">
                <XCircle className="m-auto h-28 w-28 text-danger" />
              </div>

              <div className="p-5 text-center">
                <h3 className="mb-4 text-3xl font-light">Are you absolutely certain?</h3>
                <p className="mb-6 text-sm">
                  Once you delete this comment, it will be gone forever, and cannot be recovered. Please be certain before proceeding.
                </p>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="bordered"
                    className="w-32 font-semibold"
                    size="lg"
                    isDisabled={isActionInProgress}
                    onClick={() => setDeleteQueue(null)}
                  >
                    Cancel
                  </Button>
                  <Button size="lg" className="w-32 font-semibold" color="danger" isLoading={isActionInProgress} onClick={handleConfirm}>
                    {!isActionInProgress && 'Delete'}
                  </Button>
                </div>
              </div>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteCommentConfirm
