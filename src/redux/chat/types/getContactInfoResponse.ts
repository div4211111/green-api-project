export interface IGetContactInfoResponse {
  avatar: string;
  name: string;
  email: string;
  category: string;
  description: string;
  products: any[];
  chatId: string;
  lastSeen: any;
  isArchive: boolean;
  isDisappearing: boolean;
  isMute: boolean;
  messageExpiration: number;
  muteExpiration: any;
}
