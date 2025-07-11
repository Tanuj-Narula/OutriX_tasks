import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFootwear = createAsyncThunk(
  'men/fetchFootwear',
  async () => {
    const response = await axios.get('http://localhost:3000/api/footwear');
    return response.data; 
  }
);

const footwearSlice = createSlice({
  name: 'footwear',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFootwear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFootwear.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFootwear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});



export default footwearSlice.reducer;
