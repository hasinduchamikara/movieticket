import {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesError,
  addToCartStart,
  addToCartSuccess,
  addToCartError,
  addMovieStart,
  addMovieSuccess,
  addMovieError,
  getTheatersStart,
  getTheatersSuccess,
  getTheatersError,
  updateMovieStart,
  updateMovieSuccess,
  updateMovieError,
  deleteMovieStart,
  deleteMovieSuccess,
  deleteMovieError,
  getTicketStart,
  getTicketSuccess,
  getTicketError
} from '../slices/movieSlice';

import service from '../services/movieService';

export const fetchMovies = (data) => {
  return async (dispatch) => {
    dispatch(fetchMoviesStart());

    try {
      const response = await service.fetchMovies(data);

      if (response.status === 200) {
        dispatch(fetchMoviesSuccess(response.data.body));
      } else {
        dispatch(fetchMoviesError(response.data.body));
      }
    } catch (error) {
      dispatch(fetchMoviesError(error.message));
    }
  };
};

export const addToCart = (data) => {
  return async (dispatch) => {
    dispatch(addToCartStart());

    try {
      const response = await service.putCart(data);

      if (response.status === 200) {
        dispatch(addToCartSuccess(response.data.body));
      } else {
        dispatch(addToCartError(response.data.message));
      }
    } catch (error) {
      dispatch(addToCartError(error.message));
    }
  };
};

export const addMovie = (data) => {
  return async (dispatch) => {
    dispatch(addMovieStart());

    try {
      const response = await service.postMovie(data);

      if (response.status === 201) {
        dispatch(addMovieSuccess(response.data.body));
      } else {
        dispatch(addMovieError(response.data.message));
      }
    } catch (error) {
      dispatch(addMovieError(error.message));
    }
  };
};

export const updateMovie = (data) => {
  return async (dispatch) => {
    dispatch(updateMovieStart());
    try {
      const response = await service.putMovie(data);

      if (response.status === 200) {
        dispatch(updateMovieSuccess(response.data.body));
      } else {
        dispatch(updateMovieError(response.data.message));
      }
    } catch (error) {
      dispatch(updateMovieError(error.message));
    }
  };
};

export const deleteMovie = (data) => {
  return async (dispatch) => {
    dispatch(deleteMovieStart());

    try {
      const response = await service.deleteMovie(data);

      if (response.status === 200) {
        dispatch(deleteMovieSuccess(response.data.body));
      } else {
        dispatch(deleteMovieError(response.data.message));
      }
    } catch (error) {
      dispatch(deleteMovieError(error.message));
    }
  };
};

export const fetchTheaters = () => {
  return async (dispatch) => {
    dispatch(getTheatersStart());

    try {
      const response = await service.fetchTheaters();

      if (response.status === 200) {
        dispatch(getTheatersSuccess(response.data.body));
      } else {
        dispatch(getTheatersError(response.data.message));
      }
    } catch (error) {
      dispatch(getTheatersError(error.message));
    }
  };
};

export const fetchTickets = () => {
  return async (dispatch) => {
    dispatch(getTicketStart());

    try {
      const response = await service.fetchTickets();

      if (response.status === 200) {
        dispatch(getTicketSuccess(response.data.body));
      } else {
        dispatch(getTicketError(response.data.message));
      }
    } catch (error) {
      dispatch(getTicketError(error.message));
    }
  };
};
