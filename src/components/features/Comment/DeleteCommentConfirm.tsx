import React from 'react'
import { Modal, ModalContent, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/utils/firebase'
import toast from 'react-hot-toast'
import { XCircle } from 'react-feather'

type PropTypes = {
  comment: IComment | null
  setDeleteQueue: (comment: IComment | null) => void
}

const DeleteCommentConfirm: React.FC<PropTypes> = ({ comment, setDeleteQueue }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleDeleteComment = async () => {
    if (!comment) return null
    setIsLoading(true)

    try {
      await deleteDoc(doc(db, 'comments', comment.commentId))
      toast.success('The comment has been deleted successfully.')
    } catch (error: any) {
      toast.error(`Oops! The comment could not be deleted. Error: ${error.message}`)
    }
    setIsLoading(false)
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
                    isDisabled={isLoading}
                    onClick={() => setDeleteQueue(null)}
                  >
                    Cancel
                  </Button>
                  <Button size="lg" className="w-32 font-semibold" color="danger" isLoading={isLoading} onClick={handleDeleteComment}>
                    {!isLoading && 'Delete'}
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
