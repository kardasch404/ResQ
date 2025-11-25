import { configureStore } from '@reduxjs/toolkit';
import ambulanceReducer from '../features/ambulances/ambulanceSlice';
import incidentReducer from '../features/incidents/incidentSlice';

export const store = configureStore({
  reducer: {
    ambulances: ambulanceReducer,
    incidents: incidentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
