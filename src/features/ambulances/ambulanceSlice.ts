import { createSlice } from '@reduxjs/toolkit';

interface AmbulanceState {
  selectedId: string | null;
}

const initialState: AmbulanceState = {
  selectedId: null,
};

const ambulanceSlice = createSlice({
  name: 'ambulances',
  initialState,
  reducers: {
    selectAmbulance: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { selectAmbulance } = ambulanceSlice.actions;
export default ambulanceSlice.reducer;
