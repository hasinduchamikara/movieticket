import { configureStore, combineReducers } from '@reduxjs/toolkit';

// reducers
import authentication from '../slices/authSlice';
import movie from '../slices/movieSlice';

const rootReducer = combineReducers({ authentication, movie });

export default function configureAppStore() {
  // const reduxSagaMonitorOptions = {};
  // const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  // const { run: runSaga } = sagaMiddleware;
  // const middlewares = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
  });

  // runSaga(rootSaga);

  return store;
}
