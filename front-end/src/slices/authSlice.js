import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginData: {
    loading: false,
    data: null,
    error: null,
  },
  openModal: false,
  openCart: false,
  openPurchased: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setModal(state, action) {
      state.openModal = action.payload;
    },
    setCart(state, action) {
      state.openCart = action.payload;
    },
    loginStart(state) {
      state.loginData.loading = true;
    },
    loginSuccess(state, action) {
      state.loginData.loading = false;
      state.loginData.data = action.payload;
      state.loginData.error = null;
    },
    loginError(state, action) {
      state.loginData.loading = false;
      state.loginData.data = null;
      state.loginData.error = action.payload;
    },
    setPurchased(state, action) {
      state.openPurchased = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export const {
  setModal,
  setCart,
  loginStart,
  loginSuccess,
  loginError,
  setPurchased,
} = actions;

export default reducer;
