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
    changeCurrentUsername: (state, action: PayloadAction<string>) => {
      state.authenticatedUsername = action.payload
    },
  },
})

export const { login, logout, changeCurrentUsername } = authSlice.actions

export default authSlice.reducer
