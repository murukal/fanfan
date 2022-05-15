import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {whoAmI} from '../apis/auth';
import {User} from '../typings/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_KEY} from '../utils';

export class UserProfile {
  isLogin = false;
  user?: User = undefined;
  token: string | null = null;
}

export const authenticate = createAsyncThunk(
  'authenticate',
  async () => (await whoAmI()).data?.whoAmI,
);

export const setToken = createAsyncThunk(
  'set-token',
  async (token?: string) => token || (await AsyncStorage.getItem(TOKEN_KEY)),
);

const slice = createSlice({
  name: 'user-profile',
  initialState: {...new UserProfile()},
  reducers: {
    logout: state => {
      state.isLogin = false;
      state.user = undefined;
      state.token = '';
    },
  },
  extraReducers: builder =>
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLogin = !!action.payload;
        state.user = action.payload;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      }),
});

export const {logout} = slice.actions;

export default slice.reducer;
