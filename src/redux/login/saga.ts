/* eslint-disable @typescript-eslint/no-explicit-any */
import { Effect, ForkEffect, takeEvery } from 'redux-saga/effects';
import { loginActions } from './slice';

export function* watchloginSaga(): Generator<Effect, boolean> {
  return true;
}

export function* watchLoginSagas(): Generator<ForkEffect, void> {
  yield takeEvery(loginActions.login, watchloginSaga);
}

const logInSagas = watchLoginSagas;
export default logInSagas;
