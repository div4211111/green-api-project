import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@redux/store';
import { $api } from '@shared/api';
import { IDeleteNotificationResponse } from '../types/deleteNotificationResponse';
import { removeNotification } from '../chat.slice';

export const deleteNotification = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'chat/deleteNotification',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { credentials, chat } = getState();

      if (chat.notification === null) {
        return;
      }
      const { data } = await $api.delete<IDeleteNotificationResponse>(
        `/waInstance${credentials.credentials.idInstance}/deleteNotification/${credentials.credentials.apiTokenInstance}/${chat.notification?.receiptId}`,
      );
      if (data.result) {
        dispatch(removeNotification());
      }
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);
