import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { $api } from '../../shared/api';
import {
  ICredentials,
  ICredentialsState,
  IStateInstanceResponse,
} from './types/credentials.types';
import { RequestStatus } from '@shared/types/responseStatus';

const initialState: ICredentialsState = {
  credentials: { idInstance: '', apiTokenInstance: '' },
  status: RequestStatus.Default,
};

export const checkCredentials = createAsyncThunk(
  'credentials/checkCredentials',
  async ({ idInstance, apiTokenInstance }: ICredentials, APIThunk) => {
    try {
      const { data } = await $api.get<IStateInstanceResponse>(
        `/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`,
      );
      if (data.stateInstance === 'notAuthorized') {
        return APIThunk.rejectWithValue(`Your account dosen't authorized`);
      }
      if (data.stateInstance === 'blocked') {
        return APIThunk.rejectWithValue('Your account is blocked');
      }
      if (data.stateInstance === 'starting') {
        return APIThunk.rejectWithValue('Your account is starting');
      }
      if (data.stateInstance === 'sleepMode') {
        return APIThunk.rejectWithValue('Your account is sleeping');
      }
      APIThunk.dispatch(setCredentials({ idInstance, apiTokenInstance }));
    } catch (error) {
      if (error instanceof Error) {
        return APIThunk.rejectWithValue(error.message);
      }
    }
  },
);

export const credentialsSlice = createSlice({
  name: 'userCredentials',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.credentials = action.payload;
    },
    resetCredentials: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(checkCredentials.pending, (state) => {
      state.status = RequestStatus.Loading;
    }),
      builder.addCase(checkCredentials.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      });
    builder.addCase(checkCredentials.rejected, (state) => {
      state.status = RequestStatus.Error;
    });
  },
});

export const { resetCredentials, setCredentials } = credentialsSlice.actions;

export const selectCredentials = (state: RootState) => state.credentials;

export default credentialsSlice.reducer;
