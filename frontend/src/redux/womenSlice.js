import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchWomenWear = createAsyncThunk(
  'men/fetchWomenWear',
  async () => {
    const response = await axios.get('http://localhost:3000/api/women_clothing');
    return response.data; 
  }
);

const womenSlice = createSlice({
  name: 'women',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWomenWear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWomenWear.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchWomenWear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});



export default womenSlice.reducer;
