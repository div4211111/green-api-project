import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { defaultToastConfig } from '@shared/config/toast.config';
import { toast } from 'react-toastify';

export const notificationMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    toast.error(action.payload as string, defaultToastConfig);
  }
  return next(action);
};
