import { toast } from 'react-toastify';

export const successToast = (msg: string) => {
  toast.success(msg, {
    theme: 'colored',
    hideProgressBar: true,
  });
};
export const errorToast = (msg: string) => {
  toast(msg, { type: 'error' });
};
