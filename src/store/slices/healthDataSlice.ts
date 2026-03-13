import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HealthDataState {
  heartRate: number | null;
  hrv: number | null; // Heart Rate Variability
  isConnected: boolean;
}

const initialState: HealthDataState = {
  heartRate: null,
  hrv: null,
  isConnected: false,
};

const healthDataSlice = createSlice({
  name: 'healthData',
  initialState,
  reducers: {
    setHeartRate(state, action: PayloadAction<number>) {
      state.heartRate = action.payload;
    },
    setConnectionStatus(state, action: PayloadAction<boolean>) {
      state.isConnected = action.payload;
    },
  },
});

export const { setHeartRate, setConnectionStatus } = healthDataSlice.actions;
export default healthDataSlice.reducer;
