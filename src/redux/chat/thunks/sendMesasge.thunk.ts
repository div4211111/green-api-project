import { createAsyncThunk } from '@reduxjs/toolkit';
import { IMessage } from '../types/chat.types';
import { AppDispatch, RootState } from '@redux/store';
import { $api } from '@shared/api';
import { ISendMessageResponse } from '../types/sendMessageResponse';
import { addMessage } from '../chat.slice';

export const sendMessage = createAsyncThunk<
  void,
  Pick<IMessage, 'textMessage' | 'timestamp'>,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'chat/sendMessage',
  async (
    { textMessage, timestamp }: Pick<IMessage, 'textMessage' | 'timestamp'>,
    { getState, dispatch, rejectWithValue },
  ) => {
    try {
      const { credentials, chat } = getState();

      const { data } = await $api.post<ISendMessageResponse>(
        `/waInstance${credentials.credentials.idInstance}/sendMessage/${credentials.credentials.apiTokenInstance}`,
        {
          chatId: chat.currentChat,
          message: textMessage,
        },
      );
      dispatch(
        addMessage({
          type: 'outgoing',
          idMessage: data.idMessage,
          textMessage,
          chatId: chat.currentChat,
          timestamp,
        }),
      );
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);
