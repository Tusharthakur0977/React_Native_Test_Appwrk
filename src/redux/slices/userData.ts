import type {PayloadAction} from '@reduxjs/toolkit';
import {createSlice} from '@reduxjs/toolkit';

// Define a type for the slice state
export interface History {
  convertedFrom: string;
  convertedFromAmount: string;
  convertedTo: string;
  convertedToAmount: number;
}

interface UserState {
  currency1: string;
  currency1Value: string;
  currency2: string;
  currency2Value: string;
  history: History[];
}

// Define the initial state using that type
const initialState: UserState = {
  currency1: 'USD',
  currency1Value: '',
  currency2: '',
  currency2Value: '',
  history: [],
};

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setCurrency1: (state, action: PayloadAction<string>) => {
      state.currency1 = action.payload;
    },
    setCurrency1Value: (state, action: PayloadAction<string>) => {
      state.currency1Value = action.payload;
    },
    setCurrency2: (state, action: PayloadAction<string>) => {
      state.currency2 = action.payload;
    },
    setCurrency2Value: (state, action: PayloadAction<string>) => {
      state.currency1Value = action.payload;
    },
    setHistory: (state, action: PayloadAction<History>) => {
      console.log(action.payload, 'MMMM');

      state.history.push(action.payload);
    },
  },
});

export const {
  setCurrency1,
  setCurrency1Value,
  setCurrency2,
  setCurrency2Value,
  setHistory,
} = userData.actions;

export default userData.reducer;
