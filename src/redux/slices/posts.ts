import {
  createSlice,
  createEntityAdapter,
  type PayloadAction,
} from "@reduxjs/toolkit"

import { createAppSelector } from "../hooks"
import type { RootState } from "../store"

export interface Post {
  id: number
  userId: number
  content: string
  createdAt: number
}

const postsAdapter = createEntityAdapter<Post>()

const initialState = postsAdapter.getInitialState(
  {
    nextId: 10,
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
    {
      id: 5,
      userId: 4,
      content: "Лорем Ипсум",
      createdAt: new Date("03.02.2026").getTime(),
    },
    {
      id: 6,
      userId: 5,
      content: "Почти закончил делать кстати",
      createdAt: new Date("02.19.2026").getTime(),
    },
    {
      id: 7,
      userId: 6,
      content: "Я из будущего",
      createdAt: new Date("03.08.2026").getTime(),
    },
    {
      id: 8,
      userId: 7,
      content: "Lorem Ипсум. Лорем Ipsum",
      createdAt: new Date("02.27.2026").getTime(),
    },
    {
      id: 9,
      userId: 8,
      content: "Хи-хи ха-ха. Ляляля. Это текст, просто текст",
      createdAt: new Date("01.10.2026").getTime(),
    },
  ]
)

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<Pick<Post, "content" | "userId">>
    ) => {
      postsAdapter.addOne(state, {
        id: state.nextId,
        userId: action.payload.userId,
        content: action.payload.content,
        createdAt: new Date().getTime(),
      })

      state.nextId += 1
    },
  },
})

export const { addPost } = postsSlice.actions

export const postsSelectors = postsAdapter.getSelectors(
  (state: RootState) => state.posts
)

export const selectPostsByUserId = createAppSelector(
  [postsSelectors.selectAll, (_, userId: number) => userId],
  (posts, userId) => posts.filter((post) => post.userId === userId)
)

export default postsSlice.reducer
