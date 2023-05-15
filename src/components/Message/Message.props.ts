import { IMessage } from '@redux/chat/types/chat.types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IMessageProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  message: IMessage;
}
