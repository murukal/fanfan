import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getRsaPublicKey} from '../apis';

export class App {
  isInitialized = false;
  rsaPublicKey?: string;
}

export const setRsaPublicKey = createAsyncThunk('setRsaPublicKey', async () => {
  return (await getRsaPublicKey()).data?.rsaPublicKey;
});

const slice = createSlice({
  name: 'App',
  initialState: {...new App()},
  reducers: {
    initialized: state => {
      state.isInitialized = true;
    },
  },
  extraReducers: builder =>
    builder.addCase(setRsaPublicKey.fulfilled, (state, action) => {
      state.rsaPublicKey = action.payload;
    }),
});

export const {initialized} = slice.actions;

export default slice.reducer;
