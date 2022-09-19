import { loginStart, loginSuccess, loginError } from '../slices/authSlice';

import service from '../services/authService';

export const userLogin = (data) => {
  return async (dispatch) => {
    dispatch(loginStart());

    try {
      const response = await service.loginUser(data);

      if (response.status === 200) {
        dispatch(loginSuccess(response.data.body));
      } else {
        dispatch(loginError(response.data.body));
      }
    } catch (error) {
      dispatch(loginError(error.message));
    }
  };
};
