import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { selectUserByUsername } from "@/redux/slices/users"
import {
  followUser,
  unfollowUser,
  selectIsUserFollowing,
} from "@/redux/slices/subscriptions"

import Button from "@/shared/ui/Button"

const FollowButton = ({ authorId }: { authorId: number }) => {
  const dispatch = useAppDispatch()

  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const currentUser = useAppSelector((state) =>
    selectUserByUsername(state, authenticatedUsername || "")
  )
  const isFollowing = useAppSelector((state) =>
    selectIsUserFollowing(state, currentUser!.id, authorId)
  )

  if (currentUser!.id === authorId) return null

  const handleButtonClick = () => {
    dispatch(
      isFollowing
        ? unfollowUser({
            followerId: currentUser!.id,
            followingId: authorId,
          })
        : followUser({ followerId: currentUser!.id, followingId: authorId })
    )
  }

  return (
    <Button onClick={handleButtonClick}>
      {isFollowing ? "Отписаться" : "Подписаться"}
    </Button>
  )
}

export default FollowButton
