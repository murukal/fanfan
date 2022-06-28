import {createSlice} from '@reduxjs/toolkit';

export interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

export class App {
  isInitialized = false;
  notification?: Notification = undefined;
  rsaPublicKey?: string;
}

const slice = createSlice({
  name: 'App',
  initialState: {...new App()},
  reducers: {
    initialized: state => {
      state.isInitialized = true;
    },
  },
});

export const {initialized} = slice.actions;

export default slice.reducer;
