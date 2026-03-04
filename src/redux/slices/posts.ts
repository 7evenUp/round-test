import { createSlice, createEntityAdapter } from "@reduxjs/toolkit"

import type { RootState } from "../store"

interface Post {
  id: number
  userId: number
  content: string
  createdAt: number
}

const postsAdapter = createEntityAdapter<Post>()

const initialState = postsAdapter.getInitialState(
  {
    nextId: 5,
  },
  [
    {
      id: 1,
      userId: 2,
      content: "Хочу есть пуддинг",
      createdAt: new Date("01.01.2026").getTime(),
    },
    {
      id: 2,
      userId: 2,
      content: "Чо то я устал малясь",
      createdAt: new Date("02.03.2026").getTime(),
    },
    {
      id: 3,
      userId: 1,
      content: "Случайный набор слов ляляля тополя",
      createdAt: new Date("02.02.2026").getTime(),
    },
    {
      id: 4,
      userId: 3,
      content: "Не хочу есть пуддинг",
      createdAt: new Date("03.03.2026").getTime(),
    },
  ]
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: postsAdapter.addOne,
  },
})

export const { addPost } = postsSlice.actions

export const postsSelectors = postsAdapter.getSelectors(
  (state: RootState) => state.posts
)

export default postsSlice.reducer
