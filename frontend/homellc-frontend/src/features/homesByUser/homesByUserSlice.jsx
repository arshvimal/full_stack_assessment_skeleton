import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  homesByUser: [],
  currentPage: 1,
  totalPages: {},
  pageSize: 50,
};

const homesByUserSlice = createSlice({
  name: "homesByUser",
  initialState,
  reducers: {
    setHomesByUser: (state, action) => {
      state.homesByUser = action.payload;
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

export const { setHomesByUser, setCurrentPage, setTotalPages, setPageSize } = homesByUserSlice.actions;
export default homesByUserSlice.reducer;