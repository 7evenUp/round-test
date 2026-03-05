import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import type { RootState } from "../store"

interface User {
  id: number
  username: string
}

const usersAdapter = createEntityAdapter<User>()

const initialState = usersAdapter.getInitialState(
  {
    nextId: 9,
  },
  [
    { id: 1, username: "Artyom" },
    { id: 2, username: "Felix" },
    { id: 3, username: "John" },
    { id: 4, username: "Marta" },
    { id: 5, username: "Nikita" },
    { id: 6, username: "Sofia" },
    { id: 7, username: "Leo" },
    { id: 8, username: "Diana" },
  ]
)

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<string>) => {
      const username = action.payload.trim()
      if (!username) return

      const isExist = Object.values(state.entities).some(
        (user) => user.username === username
      )
      if (isExist) return

      usersAdapter.addOne(state, { id: state.nextId, username })

      state.nextId += 1
    },

    // примеры на будущее
    removeUser: usersAdapter.removeOne,
    updateUser: usersAdapter.updateOne,
  },
})

export const { addUser } = usersSlice.actions

export const usersSelectors = usersAdapter.getSelectors(
  (state: RootState) => state.users
)
export const selectUserByUsername = (state: RootState, username: string) =>
  usersSelectors.selectAll(state).find((u) => u.username === username)

export default usersSlice.reducer
