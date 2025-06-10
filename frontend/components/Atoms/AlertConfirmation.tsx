'use client';

import Swal from 'sweetalert2';

interface AlertOptions {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: string;
  cancelColor?: string;
  icon?: 'warning' | 'info' | 'success' | 'error' | 'question';
}

export const showConfirmationAlert = async (
  options: AlertOptions = {}
): Promise<boolean> => {
  const {
    title = 'Are you sure?',
    text = "You won't be able to revert this!",
    confirmText = 'Yes',
    cancelText = 'Cancel',
    confirmColor = '#493628',
    cancelColor = '#aaa',
    icon = 'warning',
  } = options;

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });

  return result.isConfirmed;
};

export const showSuccessAlert = async (
  message: string,
  confirmColor: string = '#493628'
) => {
  await Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonColor: confirmColor, 
  });
};