import { createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { usersSelectors } from "./users"
import { createAppSelector } from "../hooks"
import type { RootState } from "../store"

interface Subscription {
  id: string
  followerId: number
  followingId: number
  createdAt: number
}

interface PaginatedIds {
  ids: number[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
}

const getSubscriptionId = (followerId: number, followingId: number) =>
  `${followerId}-${followingId}`

const subscriptionsAdapter = createEntityAdapter<Subscription>()

const initialState = subscriptionsAdapter.getInitialState({}, [
  {
    id: getSubscriptionId(1, 2),
    followerId: 1,
    followingId: 2,
    createdAt: new Date("2026-01-10T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(2, 1),
    followerId: 2,
    followingId: 1,
    createdAt: new Date("2026-01-15T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(3, 2),
    followerId: 3,
    followingId: 2,
    createdAt: new Date("2026-02-20T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(4, 1),
    followerId: 4,
    followingId: 1,
    createdAt: new Date("2026-02-23T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(5, 2),
    followerId: 5,
    followingId: 2,
    createdAt: new Date("2026-02-25T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 1),
    followerId: 6,
    followingId: 1,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 2),
    followerId: 6,
    followingId: 2,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 3),
    followerId: 6,
    followingId: 3,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 4),
    followerId: 6,
    followingId: 4,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 5),
    followerId: 6,
    followingId: 5,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 7),
    followerId: 6,
    followingId: 7,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(6, 8),
    followerId: 6,
    followingId: 8,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(1, 6),
    followerId: 1,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(2, 6),
    followerId: 2,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(3, 6),
    followerId: 3,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(4, 7),
    followerId: 4,
    followingId: 7,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(5, 5),
    followerId: 5,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(7, 6),
    followerId: 7,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(8, 6),
    followerId: 8,
    followingId: 6,
    createdAt: new Date("2026-02-26T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(7, 4),
    followerId: 7,
    followingId: 4,
    createdAt: new Date("2026-02-28T12:00:00").getTime(),
  },
  {
    id: getSubscriptionId(8, 5),
    followerId: 8,
    followingId: 5,
    createdAt: new Date("2026-03-01T12:00:00").getTime(),
  },
])

const paginateIds = (
  ids: number[],
  page: number,
  pageSize: number
): PaginatedIds => {
  const total = ids.length
  const totalPages = total === 0 ? 0 : Math.ceil(total / pageSize)
  const safePage =
    totalPages === 0 ? 1 : Math.min(Math.max(page, 1), totalPages)
  const startIndex = (safePage - 1) * pageSize
  const paginatedIds = ids.slice(startIndex, startIndex + pageSize)

  return {
    ids: paginatedIds,
    total,
    page: safePage,
    pageSize,
    totalPages,
    hasNextPage: totalPages > 0 && safePage < totalPages,
    hasPreviousPage: totalPages > 0 && safePage > 1,
  }
}

const pickDefined = <T>(items: Array<T | undefined>): T[] =>
  items.filter((item): item is T => item !== undefined)

export const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {
    followUser: (
      state,
      action: PayloadAction<Pick<Subscription, "followerId" | "followingId">>
    ) => {
      const { followerId, followingId } = action.payload

      if (followerId === followingId) return

      const subscriptionId = getSubscriptionId(followerId, followingId)
      if (state.entities[subscriptionId]) return

      subscriptionsAdapter.addOne(state, {
        id: subscriptionId,
        followerId,
        followingId,
        createdAt: new Date().getTime(),
      })
    },

    unfollowUser: (
      state,
      action: PayloadAction<Pick<Subscription, "followerId" | "followingId">>
    ) => {
      const { followerId, followingId } = action.payload

      subscriptionsAdapter.removeOne(
        state,
        getSubscriptionId(followerId, followingId)
      )
    },
  },
})

export const { followUser, unfollowUser } = subscriptionsSlice.actions

export const subscriptionsSelectors = subscriptionsAdapter.getSelectors(
  (state: RootState) => state.subscriptions
)

export const selectFollowersIdsByUserId = createAppSelector(
  [subscriptionsSelectors.selectAll, (_, userId: number) => userId],
  (subscriptions, userId) =>
    subscriptions
      .filter((subscription) => subscription.followingId === userId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((subscription) => subscription.followerId)
)

export const selectFollowingIdsByUserId = createAppSelector(
  [subscriptionsSelectors.selectAll, (_, userId: number) => userId],
  (subscriptions, userId) =>
    subscriptions
      .filter((subscription) => subscription.followerId === userId)
      .sort((a, b) => b.createdAt - a.createdAt)
      .map((subscription) => subscription.followingId)
)

export const selectFollowersCountByUserId = createAppSelector(
  [selectFollowersIdsByUserId],
  (ids) => ids.length
)

export const selectFollowingCountByUserId = createAppSelector(
  [selectFollowingIdsByUserId],
  (ids) => ids.length
)

export const selectFollowersPageByUserId = createAppSelector(
  [
    selectFollowersIdsByUserId,
    (_, _userId: number, page: number) => page,
    (_, _userId: number, _page: number, pageSize: number) => pageSize,
  ],
  (ids, page, pageSize) => paginateIds(ids, page, pageSize)
)

export const selectFollowingPageByUserId = createAppSelector(
  [
    selectFollowingIdsByUserId,
    (_, _userId: number, page: number) => page,
    (_, _userId: number, _page: number, pageSize: number) => pageSize,
  ],
  (ids, page, pageSize) => paginateIds(ids, page, pageSize)
)

export const selectFollowerUsersPageByUserId = createAppSelector(
  [selectFollowersPageByUserId, usersSelectors.selectEntities],
  (pageData, userEntities) => ({
    ...pageData,
    users: pickDefined(pageData.ids.map((id) => userEntities[id])),
  })
)

export const selectFollowingUsersPageByUserId = createAppSelector(
  [selectFollowingPageByUserId, usersSelectors.selectEntities],
  (pageData, userEntities) => ({
    ...pageData,
    users: pickDefined(pageData.ids.map((id) => userEntities[id])),
  })
)

export const selectIsUserFollowing = createAppSelector(
  [
    subscriptionsSelectors.selectEntities,
    (_, sourceUserId: number) => sourceUserId,
    (_, __, targetUserId: number) => targetUserId,
  ],
  (entities, sourceUserId, targetUserId) =>
    Boolean(entities[getSubscriptionId(sourceUserId, targetUserId)])
)

export default subscriptionsSlice.reducer
