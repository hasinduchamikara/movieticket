import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieData: {
    loading: false,
    data: [],
    error: null,
  },
  cartData: {
    movies: [],
    total_price: 0.0,
    user: null,
  },
  addToCartData: {
    loading: false,
    data: null,
    error: null,
  },
  addMovieData: {
    loading: false,
    data: null,
    error: null,
  },
  getTheatersData: {
    loading: false,
    data: [],
    error: null,
  },
  updateMovieData: {
    loading: false,
    data: null,
    error: null,
  },
  deleteMovieData: {
    loading: false,
    data: null,
    error: null,
  },
  getTicketsData: {
    loading: false,
    data: null,
    error: null,
  },
  openModal: false,
  selectedMovie: null,
};

const authSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchMoviesStart(state) {
      state.movieData.loading = true;
    },
    fetchMoviesSuccess(state, action) {
      state.movieData.loading = false;
      state.movieData.data = action.payload;
      state.movieData.error = null;
    },
    fetchMoviesError(state, action) {
      state.movieData.loading = false;
      state.movieData.data = [];
      state.movieData.error = action.payload;
    },
    setCartData(state, action) { //calculation movie tickets
      const { movie, no_of_tickets, price, title, img, user } = action.payload;

      const existingIndex = state.cartData.movies.findIndex(
        (item) => item.movie === movie
      );

      // if already exist
      if (existingIndex > -1) {
        const existingMovie = state.cartData.movies[existingIndex];
        existingMovie.no_of_tickets =
          Number(existingMovie.no_of_tickets) + Number(no_of_tickets);
        state.cartData.total_price = existingMovie.no_of_tickets * price;
        state.cartData.movies[existingIndex] = existingMovie;
      } else {
        // otherwise
        state.cartData.movies.push({ movie, no_of_tickets, title, img });
        state.cartData.total_price += no_of_tickets * price;
        state.cartData.user = user;
      }
    },
    addToCartStart(state) {
      state.addToCartData.loading = true;
    },
    addToCartSuccess(state, action) {
      state.addToCartData.loading = false;
      state.addToCartData.data = action.payload;
      state.addToCartData.error = null;
    },
    addToCartError(state, action) {
      state.addToCartData.loading = false;
      state.addToCartData.data = null;
      state.addToCartData.error = action.payload;
    },
    addToCartReset(state, action) {
      state.addToCartData = initialState.addMovieData;
    },
    cartDataReset(state) {
      state.cartData = initialState.cartData;
    },
    setModal(state, action) {
      state.openModal = action.payload;
    },
    addMovieStart(state) {
      state.addMovieData.loading = true;
    },
    addMovieSuccess(state, action) {
      state.addMovieData.loading = false;
      state.addMovieData.data = action.payload;
      state.addMovieData.error = null;
    },
    addMovieError(state, action) {
      state.addMovieData.loading = false;
      state.addMovieData.data = null;
      state.addMovieData.error = action.payload;
    },
    addMovieReset(state) {
      state.addMovieData = initialState.addMovieData;
    },
    getTheatersStart(state) {
      state.getTheatersData.loading = true;
    },
    getTheatersSuccess(state, action) {
      state.getTheatersData.loading = false;
      state.getTheatersData.data = action.payload
        ? action.payload.theaters
        : action.payload;
      state.getTheatersData.error = null;
    },
    getTheatersError(state, action) {
      state.getTheatersData.loading = false;
      state.getTheatersData.data = [];
      state.getTheatersData.error = action.payload;
    },
    setSelectedMovie(state, action) {
      state.selectedMovie = action.payload;
    },
    updateMovieStart(state) {
      state.updateMovieData.loading = true;
    },
    updateMovieSuccess(state, action) {
      state.updateMovieData.loading = false;
      state.updateMovieData.data = action.payload;
      state.updateMovieData.error = null;
    },
    updateMovieError(state, action) {
      state.updateMovieData.loading = false;
      state.updateMovieData.data = null;
      state.updateMovieData.error = action.payload;
    },
    updateMovieReset(state) {
      state.updateMovieData = initialState.updateMovieData;
    },
    deleteMovieStart(state) {
      state.deleteMovieData.loading = true;
    },
    deleteMovieSuccess(state, action) {
      state.deleteMovieData.loading = false;
      state.deleteMovieData.data = action.payload;
      state.deleteMovieData.error = null;
    },
    deleteMovieError(state, action) {
      state.deleteMovieData.loading = false;
      state.deleteMovieData.data = null;
      state.deleteMovieData.error = action.payload;
    },
    deleteMovieReset(state) {
      state.deleteMovieData = initialState.deleteMovieData;
    },
    getTicketStart(state) {
      state.getTicketsData.loading = true;
    },
    getTicketSuccess(state, action) {
      state.getTicketsData.loading = false;
      state.getTicketsData.data = action.payload;
      state.getTicketsData.error = null;
    },
    getTicketError(state, action) {
      state.getTicketsData.loading = false;
      state.getTicketsData.data = null;
      state.getTicketsData.error = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesError,
  setCartData,
  addToCartStart,
  addToCartSuccess,
  addToCartError,
  addToCartReset,
  cartDataReset,
  setModal,
  addMovieStart,
  addMovieSuccess,
  addMovieError,
  addMovieReset,
  getTheatersStart,
  getTheatersSuccess,
  getTheatersError,
  setSelectedMovie,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieError,
  updateMovieReset,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieError,
  deleteMovieReset,
  getTicketStart,
  getTicketSuccess,
  getTicketError,
} = actions;

export default reducer;
