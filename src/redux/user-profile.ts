import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {MONEY_PROFILE, WHO_AM_I} from '../apis/user';
import {User} from '../typings/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN_KEY} from '../utils';
import client from '../apis';

export class UserProfile {
  isLoggedIn = false;
  user?: User = undefined;
  token: string | null = null;
}

/**
 * token换用户信息
 */
export const authenticate = createAsyncThunk('authenticate', async () => {
  return (
    await client
      .query({
        query: WHO_AM_I,
        fetchPolicy: 'no-cache',
      })
      .catch(() => null)
  )?.data.whoAmI;
});

/**
 * 存储token
 */
export const setToken = createAsyncThunk(
  'set-token',
  async (token?: string) => token || (await AsyncStorage.getItem(TOKEN_KEY)),
);

/**
 * 更新用户的moneyProfile
 */
export const updateMoneyProfile = createAsyncThunk(
  'update-money-profile',
  async () => {
    return (
      await client
        .query({
          query: MONEY_PROFILE,
          fetchPolicy: 'no-cache',
        })
        .catch(() => null)
    )?.data.whoAmI;
  },
);

const slice = createSlice({
  name: 'user-profile',
  initialState: {...new UserProfile()},
  reducers: {
    logout: state => {
      state.isLoggedIn = false;
      state.user = undefined;
      state.token = '';
    },
  },
  extraReducers: builder =>
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLoggedIn = !!action.payload;
        state.user = action.payload;
      })
      .addCase(setToken.fulfilled, (state, action) => {
        state.token = action.payload;
      })
      .addCase(updateMoneyProfile.fulfilled, (state, action) => {
        if (!state.user) {
          return;
        }
        Object.assign(state.user, action.payload);
      }),
});

export const {logout} = slice.actions;

export default slice.reducer;
