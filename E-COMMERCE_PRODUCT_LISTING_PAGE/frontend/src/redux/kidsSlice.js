import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchKidsWear = createAsyncThunk(
  'men/fetchKidsWear',
  async () => {
    const response = await axios.get('http://localhost:3000/api/kids_clothing');
    return response.data; 
  }
);

const kidsSlice = createSlice({
  name: 'kids',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKidsWear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKidsWear.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchKidsWear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});



export default kidsSlice.reducer;
