import { configureStore } from '@reduxjs/toolkit';
import ambulanceReducer from '../features/ambulances/ambulanceSlice';

export const store = configureStore({
  reducer: {
    ambulances: ambulanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
