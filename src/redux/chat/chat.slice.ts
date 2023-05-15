import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { RequestStatus } from '@shared/types/responseStatus';
import { IChatState, IMessage, INotification } from './types/chat.types';
import { sendMessage } from './thunks/sendMesasge.thunk';

const initialState: IChatState = {
  currentChat: '',
  currentChatUserName: '',
  currentChatAvatar: '',
  messages: [],
  notification: null,
  notificationStatus: RequestStatus.Default,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<string>) => {
      state.currentChat = action.payload;
    },
    setCurrentChatUserName: (state, action: PayloadAction<string>) => {
      state.currentChatUserName = action.payload;
    },
    setCurrentChatAvatar: (state, action: PayloadAction<string>) => {
      state.currentChatAvatar = action.payload;
    },
    removeCurrentChat: (state) => {
      state.currentChat = '';
    },
    addMessage: (state, action: PayloadAction<IMessage>) => {
      state.messages.push(action.payload);
    },
    updateMessage: (state, action: PayloadAction<INotification>) => {
      const index = state.messages.findIndex(
        (el) => el.idMessage === action.payload.body.idMessage,
      );
      state.messages[index] = {
        ...state.messages[index],
        timestamp: action.payload.body.timestamp,
        statusMessage: action.payload.body.status,
      };
    },
    setNotification: (state, action: PayloadAction<INotification>) => {
      state.notification = action.payload;
    },
    removeNotification: (state) => {
      state.notification = null;
    },
    resetChat: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessage.pending, (state) => {
      state.notificationStatus = RequestStatus.Loading;
    }),
      builder.addCase(sendMessage.fulfilled, (state) => {
        state.notificationStatus = RequestStatus.Success;
      }),
      builder.addCase(sendMessage.rejected, (state) => {
        state.notificationStatus = RequestStatus.Error;
      });
  },
});

export const {
  addMessage,
  updateMessage,
  removeNotification,
  setNotification,
  setCurrentChat,
  removeCurrentChat,
  setCurrentChatAvatar,
  setCurrentChatUserName,
  resetChat,
} = chatSlice.actions;

export const selectChat = (state: RootState) => state.credentials;

export default chatSlice.reducer;
