import { configureStore } from '@reduxjs/toolkit'
import menReducer from './menSlice.js';
import womenReducer from './womenSlice.js';
import kidsReducer from './kidsSlice.js';
import footwearReducer from './footwearSlice.js';
import beautyReducer from './beautySlice.js';

export default configureStore({
  reducer: {
    men: menReducer,
    women : womenReducer,
    kids : kidsReducer,
    footwear : footwearReducer,
    beauty : beautyReducer
  }
})