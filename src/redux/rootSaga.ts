import { AllEffect, ForkEffect, all, fork } from 'redux-saga/effects';
import logInSagas from './login/saga';
import githubSagas from './github/saga';

export default function* rootSaga(): Generator<
  AllEffect<ForkEffect<void>>,
  void,
  unknown
> {
  yield all([fork(logInSagas), fork(githubSagas)]);
}
