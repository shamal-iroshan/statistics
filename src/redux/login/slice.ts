import { createSlice } from '@reduxjs/toolkit';

interface ILoginState {
  isLoggedIn: boolean;
}

const initialState: ILoginState = {
  isLoggedIn: false
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { actions: loginActions } = loginSlice;
const loginReducer = loginSlice.reducer;
export default loginReducer;
