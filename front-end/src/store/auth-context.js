import { createContext } from 'react';

const AuthContext = createContext({
  user: null,
  token: null,
  onLogin: (data) => {},
  onLogout: () => {},
});

export default AuthContext;
