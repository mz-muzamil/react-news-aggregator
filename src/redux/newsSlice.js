import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsData: [],
  loading: false,
  searchValue: "",
  filters: {
    date: "",
    category: "",
    source: "",
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewsData(state, action) {
      state.newsData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  setNewsData,
  setLoading,
  setSearchValue,
  setFilters,
  resetFilters,
  resetState,
} = newsSlice.actions;

export default newsSlice.reducer;
