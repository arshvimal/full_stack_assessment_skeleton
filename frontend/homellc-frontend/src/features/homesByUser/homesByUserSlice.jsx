import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homesByUser: [],
  currentPage: 1,
  totalPages: 1,
  pageSize: 50,
};

const homesByUserSlice = createSlice({
  name: "homesByUser",
  initialState,
  reducers: {
    setHomesByUser: (state, action) => {
      state.homesByUser = action.payload;
    },
    clearHomesByUser: (state) => {
      state.homesByUser = [];
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const { setHomesByUser, clearHomesByUser, setCurrentPage, setTotalPages, setPageSize } = homesByUserSlice.actions;
export default homesByUserSlice.reducer;