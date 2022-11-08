import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: true,
  isLogin: false,
  user: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user
      state.isLogin = true
    },
    logout: (state) => {
      state.user = undefined
      state.isLogin = false
    },
    loaded: (state) => {
      state.isLoading = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, loaded } = authSlice.actions

export default authSlice.reducer
