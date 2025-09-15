import { toast } from 'react-toastify';

export const successToast = (msg: string) => {
  toast.success(msg, {
    theme: 'colored',
    hideProgressBar: true,
    toastId: 'success-toast', // ID único para reemplazar
  });
};
export const errorToast = (msg: string) => {
  toast(msg, {
    type: 'error',
    toastId: 'error-toast', // ID único para reemplazar
  });
};
