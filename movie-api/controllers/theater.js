import TheaterModal from '../models/theater.js';
import ResponseHelper from '../helpers/responseHelper.js';
import { codes, theaterConstant } from '../constants/index.js';

const { SUCCESS } = codes;
const { FETCH_THEATERS_SUCCESS } = theaterConstant;

/**
 * Handle fetching all theaters
 * @param {*} req 
 * @param {*} res 
 */
export const getTheaters = async (req, res) => {
  try {
    const theaters = await TheaterModal.find().populate('movies');

    return ResponseHelper.response(
      res,
      true,
      200,
      SUCCESS,
      FETCH_THEATERS_SUCCESS,
      { theaters }
    );
  } catch (error) {
    return ResponseHelper.error(res, error);
  }
};
