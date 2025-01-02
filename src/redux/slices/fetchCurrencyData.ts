import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const API_KEY = '7c77128c670d7f4c1d6b7d66';

export const fetchCurrencyData = createAsyncThunk(
  'currencyApi/fetchCurrencyDat',
  async (currencyCode: string) => {
    const response = await fetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${currencyCode}`,
    );

    const json = await response.json();
    return json;
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

const currencyDataSlice = createSlice({
  name: 'currencyData',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCurrencyData.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchCurrencyData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchCurrencyData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default currencyDataSlice.reducer;
