import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type State = {
  tk: string | undefined;
  type: string | undefined;
};

const initialState: State = {
  tk: undefined,
  type: undefined,
};

export const serviceListSlice = createSlice({
  name: 'tk',
  initialState,
  reducers: {
    addTk: (state, action: PayloadAction<string>) => {
      state.tk = action.payload;
    },
    addType: (state, action: PayloadAction<string>) => {
      state.type = action.payload;
    },
  },
});

export const {addTk , addType} = serviceListSlice.actions;

export default serviceListSlice.reducer;
