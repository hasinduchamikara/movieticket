import jwtDecode from 'jwt-decode';

export const getUserId = async (token) => {
  const { id } = await jwtDecode(token);

  return id;
};
