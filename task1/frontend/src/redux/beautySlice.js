import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBeauty = createAsyncThunk("men/fetchBeauty", async () => {
  const response = await axios.get("http://localhost:3000/api/beauty");
  return response.data;
});

const beautySlice = createSlice({
  name: "beauty",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBeauty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBeauty.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBeauty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default beautySlice.reducer;
