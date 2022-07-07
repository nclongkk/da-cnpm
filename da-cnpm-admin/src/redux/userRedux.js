import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/userApi";
import { toast } from "react-toastify";

export const getUsers = createAsyncThunk("user/getUsers", async (params) => {
  const response = await userApi.getAll(params);
  if (response.result) return response.result;
  return [];
});

export const updateStatus = createAsyncThunk(
  "user/updateStatus",
  async (data, thunkAPI) => {
    const response = await userApi.updateStatus(data.id, data.data);
    if (response.result) {
      toast.success("SUCCESS");
      return data.id;
    } else toast.error("ERROR");
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (data, thunkAPI) => {
    const response = await userApi.delete(data);
    if (response.result.success) {
      toast.success("SUCCESS");
      return data;
    } else toast.error("ERROR");
  }
);

export const getShops = createAsyncThunk("user/getShops", async (params) => {
  const response = await userApi.getShops(params);
  if (response.result) return response.result;
  return [];
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    users: [],
    shops: [],
    currentPage: 1,
    totalUsers: 0,
    totalShops: 0,
    isLoading: false,
    isUpdating: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      state.currentPage = action.payload.currentPage;
      state.totalUsers = action.payload.totalUsers;
    },

    [deleteUser.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users.splice(
        state.users.findIndex((item) => +item.id === +action.payload),
        1
      );
    },
    [updateStatus.pending]: (state) => {
      // state.isLoading = true;
    },
    [updateStatus.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [updateStatus.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.users = state.users.map((user) =>
        +user.id === +action.payload
          ? { ...user, isActive: !user.isActive }
          : user
      );
    },

    [getShops.pending]: (state) => {
      state.isLoading = true;
    },
    [getShops.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getShops.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.shops = action.payload.shops;
      state.totalShops = action.payload.totalShops;
      state.currentPage = action.payload.currentPage;
    },
  },
});

// export const {} = userSlice.actions;
export default userSlice.reducer;
