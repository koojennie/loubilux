'use client'

import Swal from 'sweetalert2'
import { useEffect } from 'react'

interface DeleteConfirmationProps {
  isOpen: boolean
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
  confirmColor?: string 
  cancelColor?: string
  onConfirm: () => void
  onClose: () => void
}

const DeleteConfirmation = ({
  isOpen,
  title = "Are you sure?",
  message = "You won't be able to revert this!",
  confirmText = "Yes",
  cancelText = "Cancel",
  confirmColor = '#493628',
  cancelColor = '#aaa',
  onConfirm,
  onClose
}: DeleteConfirmationProps) => {

  useEffect(() => {
    if (isOpen) {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: confirmColor,
        cancelButtonColor: cancelColor,
      }).then((result) => {
        if (result.isConfirmed) {
          onConfirm()
        } else {
          onClose()
        }
      })
    }
  }, [isOpen])

  return null
}

export default DeleteConfirmation