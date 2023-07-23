import { createSlice } from '@reduxjs/toolkit';
import {
  loginUser,
  registrationUser,
  refreshToken,
  logOutUser,
  subscribeUser,
  addToFavoriteProduct,
  getAddFavoriteProduct,
} from './operation';

const authSlice = createSlice({
  name: 'user',
  initialState: {
    data: [],
    username: '',
    email: '',
    isLoading: false,
    isLogin: false,
    history: [],
    error: null,
    token: null,
    subscription: false,
    favorite: [],
    addFavorite: '',
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(loginUser.fulfilled, (state, { payload }) => ({
        ...state,
        data: payload, // по окончанию работ убрать эту свалку из кейсов
        isLoading: false,
        username: payload.username,
        email: payload.email,
        history: payload.history,
        token: payload.token,
        subscription: payload.subscription,
        favorite: payload.favorite,
        addFavorite: '',
        error: null,
      }))
      .addCase(loginUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(registrationUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(registrationUser.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        username: payload.username,
        email: payload.email,
        token: payload.token,
        subscription: payload.subscription,
      }))
      .addCase(registrationUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
      .addCase(refreshToken.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(refreshToken.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        data: payload,
        username: payload.username,
        email: payload.email,
        token: payload.token,
        subscription: payload.subscription,
        favorite: payload.favorite,
        addFavorite: '',
      }))
      .addCase(refreshToken.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(logOutUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(logOutUser.fulfilled, () => ({
        username: '',
        email: '',
        isLoading: false,
        history: [],
        token: null,
      }))
      .addCase(logOutUser.rejected, (_, action) => ({
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(subscribeUser.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(subscribeUser.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        subscription: true,
        data: payload,
      }))
      .addCase(subscribeUser.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(addToFavoriteProduct.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(addToFavoriteProduct.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        addFavorite: payload,
      }))
      .addCase(addToFavoriteProduct.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }))
      .addCase(getAddFavoriteProduct.pending, state => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getAddFavoriteProduct.fulfilled, (state, { payload }) => ({
        ...state,
        favorite: payload,
      }))
      .addCase(getAddFavoriteProduct.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        error: action.error.message,
      }));
  },
});

export default authSlice.reducer;
