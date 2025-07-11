import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMenWear = createAsyncThunk(
  'men/fetchMenWear',
  async () => {
    const response = await axios.get('http://localhost:3000/api/men_clothing');
    return response.data; 
  }
);

const menSlice = createSlice({
  name: 'men',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenWear.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenWear.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenWear.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});



export default menSlice.reducer;
