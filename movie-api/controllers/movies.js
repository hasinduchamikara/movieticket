import MovieModal from '../models/movie.js';
import TheaterModal from '../models/theater.js';
import ResponseHelper from '../helpers/responseHelper.js';
import { codes, movieConstants } from '../constants/index.js';

const { CREATED, NOT_FOUND, SUCCESS, UPDATED } = codes;
const {
  MOVIE_ADD_SUCCESS,
  MOVIE_ADD_FAILED,
  MOVIE_LIST_FETCH_SUCCESS,
  MOVIE_UPDATE_SUCCESS,
  MOVIE_NOT_FOUND,
  MOVIE_DELETION_SUCCESS
} = movieConstants;

/**
 * Handle new movie request
 * @param {*} req
 * @param {*} res
 */
export const postMovie = async (req, res) => {
  const { name, show_time, cast, banner, theater, price } = req.body;

  try {
    const obj = new MovieModal({ name, show_time, cast, banner, theater, price });

    const movie = await obj.save();

    if (!movie) {
      return ResponseHelper.response(
        res,
        false,
        400,
        NOT_FOUND,
        MOVIE_ADD_FAILED,
        {}
      );
    }

    await TheaterModal.findByIdAndUpdate(theater, {
      $push: { movies: movie._doc._id },
    });

    return ResponseHelper.response(
      res,
      true,
      201,
      CREATED,
      MOVIE_ADD_SUCCESS,
      movie._doc
    );
  } catch (error) {
    return ResponseHelper.error(res, error);
  }
};

/**
 * Handle movie update
 * @param {*} req
 * @param {*} res
 */
export const putMovie = async (req, res) => {
  const { id, name, show_time, cast, banner, theater, price } = req.body;

  try {
    const obj = await MovieModal.findOneAndUpdate(
      { _id: id },
      {
        name,
        show_time,
        cast,
        banner,
        theater,
        price
      }
    );

    if (!obj) {
      return ResponseHelper.response(
        res,
        false,
        404,
        NOT_FOUND,
        MOVIE_NOT_FOUND,
        {}
      );
    }

    return ResponseHelper.response(
      res,
      true,
      200,
      UPDATED,
      MOVIE_UPDATE_SUCCESS,
      obj._doc
    );
  } catch (error) {}
};

/**
 * Handle movie deletion
 * @param {*} req
 * @param {*} res
 */
export const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const obj = await MovieModal.findOneAndDelete({ _id: id });

    if (!obj) {
      return ResponseHelper.response(
        res,
        false,
        404,
        NOT_FOUND,
        MOVIE_NOT_FOUND,
        {}
      );
    }

    return ResponseHelper.response(
      res,
      true,
      200,
      SUCCESS,
      MOVIE_DELETION_SUCCESS,
      obj._doc
    );
  } catch (error) {}
};

/**
 * Handle movie list fetch
 * @param {*} req
 * @param {*} res
 */
export const getMovies = async (req, res) => {
  const { search } = req.query;
  try {
    let pipeline = [
      {
        $lookup: {
          from: 'theaters',
          localField: 'theater',
          foreignField: '_id',
          as: 'theater',
        },
      },
    ];

    if (search) {
      pipeline.push({
        $match: { name: { $regex: `${search}`, $options: 'i' } },
      });
    }

    const movies = await MovieModal.aggregate(pipeline);

    return ResponseHelper.response(
      res,
      true,
      200,
      SUCCESS,
      MOVIE_LIST_FETCH_SUCCESS,
      { movies }
    );
  } catch (error) {
    return ResponseHelper.error(res, error);
  }
};
