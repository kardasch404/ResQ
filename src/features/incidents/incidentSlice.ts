import { createSlice } from '@reduxjs/toolkit';

interface IncidentState {
  selectedId: string | null;
}

const initialState: IncidentState = {
  selectedId: null,
};

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    selectIncident: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

export const { selectIncident } = incidentSlice.actions;
export default incidentSlice.reducer;
