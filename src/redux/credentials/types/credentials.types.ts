import { RequestStatus } from '@shared/types/responseStatus';

export interface ICredentials {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ICredentialsState {
  credentials: ICredentials;
  status: RequestStatus;
}

export type IStateInstace =
  | 'notAuthorized'
  | 'authorized'
  | 'blocked'
  | 'sleepMode'
  | 'starting';

export interface IStateInstanceResponse {
  stateInstance: IStateInstace;
}
