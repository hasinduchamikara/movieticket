import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';

// context
import AuthContext from '../store/auth-context';

// components
import TextField from './TextField';
import Button from './Button';

// actions
import { userLogin } from '../actions/authActions';

// reducers
import { setModal } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onLogin } = useContext(AuthContext);

  const loginSuccess = useSelector(
    (state) => state.authentication.loginData.data
  );

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if (userName.trim() === '' || password.trim() === '') {
      setUserNameError('User name is required');
      setPasswordError('Password is required');
      return;
    }
    if (userName.trim() === '') {
      setUserNameError('User name is required');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
      return;
    }

    const data = {
      user_name: userName,
      password,
    };

    setPasswordError('');
    setUserNameError('');

    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (loginSuccess) {
      dispatch(setModal(false));
      onLogin(loginSuccess);
      
      if (loginSuccess.user.role === 'MOVIE_ADMIN') {
        navigate('/admin');
      }

      window.location.reload();
    }
  }, [dispatch, loginSuccess, navigate, onLogin]);

  return (
    <form onSubmit={submitHandler}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="User Name"
            name="userName"
            value={userName}
            error={!!userNameError}
            helperText={userNameError}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Password"
            name="password"
            value={password}
            error={!!passwordError}
            helperText={passwordError}
            onChange={onChangeHandler}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <Button label="Login" />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default LoginForm;
