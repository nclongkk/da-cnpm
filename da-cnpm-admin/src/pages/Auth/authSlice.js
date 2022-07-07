
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authApi";

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await authApi.login(payload);

  //   save data to local storage
  localStorage.setItem("access_token", data.token);

  return data.user;
});

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await authApi.register(payload);

  //   save data to local storage
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("access_token", data.jwt);

  return data.user;
});

export const updateAccount = createAsyncThunk(
  "user/update",
  async (userData) => {
    const { id, ...fields } = userData;
    const response = await authApi.updateAccount(fields, id);

    localStorage.setItem("user", JSON.stringify(response.user));

    return response.user;
  }
);

export const fetchUserById = createAsyncThunk(
  "user/fetchByIdStatus",
  async (userId) => {
    const response = await authApi.getUser(userId);
    return response.user;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem("user")) || {},
  },

  reducers: {
    logout: (state) => {
      // clear local storage
      localStorage.clear();

      state.current = {};
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [updateAccount.fulfilled]: (state, action) => {
      state.current = action.payload;
    },

    [fetchUserById.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
