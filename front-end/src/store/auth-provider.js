import { useEffect, useState } from 'react';
import Context from './auth-context';

const MovieProvider = (props) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  const localStorageUser = localStorage.getItem('user');
  const localStorageToken = localStorage.getItem('token');

  const loginHandler = (data) => {
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);
  };

  const logoutHandler = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    if (localStorageUser) {
      setUser(JSON.parse(localStorageUser));
    }
    if (localStorageToken) {
      setToken(localStorageToken);
    }
  }, [localStorageUser, localStorageToken]);

  const context = {
    user,
    token,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return <Context.Provider value={context}>{props.children}</Context.Provider>;
};

export default MovieProvider;
