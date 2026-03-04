import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  isAuthorized: boolean
  authenticatedUsername: string | null
}

const initialState: AuthState = {
  isAuthorized: false,
  authenticatedUsername: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthorized = true
      state.authenticatedUsername = action.payload
    },
    logout: (state) => {
      state.isAuthorized = false
      state.authenticatedUsername = null
    },
  },
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
