import { configureStore } from '@reduxjs/toolkit';
import healthDataReducer from './slices/healthDataSlice';

const store = configureStore({
  reducer: {
    healthData: healthDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
