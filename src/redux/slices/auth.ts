import { createSlice } from "@reduxjs/toolkit"

interface AuthState {
  isAuthorized: boolean
}

const initialState: AuthState = {
  isAuthorized: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthorized = true
    },
    logout: (state) => {
      state.isAuthorized = false
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
