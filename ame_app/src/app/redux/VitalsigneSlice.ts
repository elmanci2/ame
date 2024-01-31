import {createSlice} from '@reduxjs/toolkit';

interface VitalSignState {
  signe: Record<string, unknown>;
}

const initialState: VitalSignState = {
  signe: {},
};

export const VitalSignSlider = createSlice({
  name: 'vitalSign',
  initialState,
  reducers: {
    addSigne: (state, action) => {
      state.signe = {...state.signe, ...action.payload};
    },
  },
});

export const {addSigne} = VitalSignSlider.actions;

export default VitalSignSlider.reducer;
