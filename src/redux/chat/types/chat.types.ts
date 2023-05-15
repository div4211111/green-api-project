import { RequestStatus } from '@shared/types/responseStatus';

export interface IChatState {
  currentChat: string;
  currentChatUserName: string;
  currentChatAvatar: string;
  messages: IMessage[];
  notification: INotification | null;
  notificationStatus: RequestStatus;
}

export interface IMessage {
  type: 'outgoing' | 'incoming';
  idMessage: string;
  timestamp?: number;
  chatId: string;
  textMessage: string;
  statusMessage?: 'read' | 'delivered' | 'sent';
  sendByApi?: boolean;
  senderId?: string;
  senderName?: string;
}

export interface INotification {
  receiptId: number;
  body: IBodyNotification;
}

export interface IBodyNotification {
  typeWebhook:
    | 'outgoingAPIMessageReceived'
    | 'outgoingMessageReceived'
    | 'outgoingMessageStatus'
    | 'incomingMessageReceived';
  instanceData: IInstanceData;
  timestamp: number;
  idMessage: string;
  senderData?: ISenderData;
  messageData?: IMessageData;
  chatId?: string;
  status?: 'read' | 'delivered' | 'sent';
  sendByApi?: boolean;
}

export interface IInstanceData {
  idInstance: number;
  wid: string;
  typeInstance: string;
}

export interface ISenderData {
  chatId: string;
  chatName: string;
  sender: string;
  senderName: string;
}

export interface IMessageData {
  typeMessage: string;
  extendedTextMessageData?: IExtendedTextMessageData;
  textMessageData?: ITextMessageData;
}

export interface IExtendedTextMessageData {
  text: string;
  description: string;
  title: string;
  previewType: string;
  jpegThumbnail: string;
}

export interface ITextMessageData {
  textMessage: string;
}
