import { configureStore } from '@reduxjs/toolkit';

import userRedux from './slice/userSlice'
export const store = configureStore({
  reducer: {
    user : userRedux
  },
});