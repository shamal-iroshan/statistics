import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const configureAppStore = (initialState = {}): any => {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

  const middleware = [sagaMiddleware];

  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([...middleware]),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production'
  });

  sagaMiddleware.run(rootSaga);
  return store;
};

export const store = configureAppStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
