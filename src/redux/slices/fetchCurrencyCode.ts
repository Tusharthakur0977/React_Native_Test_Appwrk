import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const API_KEY = '7c77128c670d7f4c1d6b7d66';

export const fetchCurrencyCodes = createAsyncThunk(
  'currencyApi/fetchCurrencyCode',
  async () => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/codes`,
    );
    return response.json();
  },
);

interface currencyCodeState {
  data: any;
  loading: boolean;
  error: any;
}

const initialState: currencyCodeState = {
  data: null,
  loading: false,
  error: null,
};

const currencyCodeSlice = createSlice({
  name: 'currencyCode',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrencyCodes.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCurrencyCodes.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCurrencyCodes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default currencyCodeSlice.reducer;
