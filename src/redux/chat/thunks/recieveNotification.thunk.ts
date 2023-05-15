import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '@redux/store';
import { $api } from '@shared/api';
import { addMessage, setNotification, updateMessage } from '../chat.slice';
import { INotification } from '../types/chat.types';

export const recieveNotification = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'chat/recieveNotification',
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { credentials, chat } = getState();

      const { data } = await $api.get<INotification>(
        `/waInstance${credentials.credentials.idInstance}/receiveNotification/${credentials.credentials.apiTokenInstance}`,
      );
      if (
        data !== null &&
        data.body.typeWebhook === 'incomingMessageReceived' &&
        !chat.messages.find(
          (message) => message.idMessage === data.body.idMessage,
        )
      ) {
        dispatch(
          addMessage({
            type: 'incoming',
            timestamp: data.body.timestamp,
            senderId: data.body.senderData?.sender,
            textMessage: data.body.messageData?.textMessageData
              ?.textMessage as string,
            chatId: data.body.senderData?.chatId as string,
            senderName: data.body.senderData?.senderName,
            idMessage: data.body.idMessage,
          }),
        );
      } else if (
        data !== null &&
        (data.body.typeWebhook === 'outgoingMessageReceived' ||
          data.body.typeWebhook === 'outgoingAPIMessageReceived' ||
          data.body.typeWebhook === 'outgoingMessageStatus')
      ) {
        dispatch(updateMessage(data));
      }
      dispatch(setNotification(data));
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        return rejectWithValue(error.message);
      }
    }
  },
);
