import {configureStore} from '@reduxjs/toolkit';
import app, {App} from './app';
import userProfile, {UserProfile} from './user-profile';

export interface State {
  userProfile: UserProfile;
  app: App;
}

export const store = configureStore({
  reducer: {
    userProfile,
    app,
  },
});
