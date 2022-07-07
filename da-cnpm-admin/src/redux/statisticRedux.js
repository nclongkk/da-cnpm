import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import statisticApi from "api/statisticApi";

export const getStatisticsUsers = createAsyncThunk(
  "statistic/getStatisticsUsers",
  async (data, thunkAPI) => {
    const response = await statisticApi.getStatisticsUsers(data);
    return response.result;
  }
);
export const getTransactions = createAsyncThunk(
  "statistic/getTransactions",
  async (data, thunkAPI) => {
    const response = await statisticApi.getTransactions(data);
    return response.result;
  }
);

const statisticsSlice = createSlice({
  name: "statistic",
  initialState: {
    transactions: [],
    totalTransactions: 0,
    currentPage: 1,
    isLoading: false,
    isUpdating: false,
    error: false,
  },
  reducers: {},
  extraReducers: {
    [getStatisticsUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getStatisticsUsers.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getStatisticsUsers.fulfilled]: (state, action) => {
      state.isLoading = false;
    },

    [getTransactions.pending]: (state) => {
      state.isLoading = true;
    },
    [getTransactions.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [getTransactions.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.transactions = action.payload.transactions;
      state.totalTransactions = action.payload.totalTransactions;
      state.currentPage = action.payload.currentPage;
    },
  },
});

// export const {} = statisticsSlice.actions;
export default statisticsSlice.reducer;
