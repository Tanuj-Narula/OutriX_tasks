import { createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    userId : localStorage.getItem("id") || null,
    token: localStorage.getItem("token") || null,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.userId = null
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("id");
    },
    setcredentials: (state, action)=>{
      console.log(action.payload);
      state.userId = action.payload.user.id;
      state.token = action.payload.token
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("id", action.payload.user.id);
    },
    setuser: (state, action)=>{
      state.currentUser = action.payload.user;
    }
  },
});

export const { logout, setcredentials , setuser } = userSlice.actions;
export default userSlice.reducer;
