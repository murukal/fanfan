import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  nanoid,
} from '@reduxjs/toolkit';
import {getRsaPublicKey} from '../apis';

interface Notification {
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface NotificationWithId extends Notification {
  id: string;
}

export class App {
  isInitialized = false;
  notifications: NotificationWithId[] = [];
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

    notify: {
      reducer: (state, action: PayloadAction<NotificationWithId>) => {
        state.notifications.push(action.payload);
      },
      prepare: (notification: Notification) => {
        const id = nanoid();
        return {payload: {id, ...notification}};
      },
    },

    notified: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload,
      );
    },
  },
  extraReducers: builder =>
    builder.addCase(setRsaPublicKey.fulfilled, (state, action) => {
      state.rsaPublicKey = action.payload;
    }),
});

export const {initialized, notify, notified} = slice.actions;

export default slice.reducer;
