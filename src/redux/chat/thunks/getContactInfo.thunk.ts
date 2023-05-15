import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@redux/store';
import { $api } from '@shared/api';
import { setCurrentChatAvatar, setCurrentChatUserName } from '../chat.slice';
import { IGetContactInfoResponse } from '../types/getContactInfoResponse';

export const getContactInfo = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'chat/getContactInfo',
  async (chatId: string, { getState, dispatch, rejectWithValue }) => {
    const { credentials } = getState();
    try {
      const { data } = await $api.post<IGetContactInfoResponse>(
        `/waInstance${credentials.credentials.idInstance}/GetContactInfo/${credentials.credentials.apiTokenInstance}`,
        {
          chatId,
        },
      );
      dispatch(setCurrentChatUserName(data.name));
      dispatch(setCurrentChatAvatar(data.avatar));
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
    }
  },
);
