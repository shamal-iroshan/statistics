import githubReducer from './github/slice';
import loginReducer from './login/slice';

const rootReducer = {
  login: loginReducer,
  gitHub: githubReducer
};

export default rootReducer;
