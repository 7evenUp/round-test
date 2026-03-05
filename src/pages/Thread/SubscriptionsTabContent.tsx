import { useAppSelector } from "@/redux/hooks"
import { postsSelectors } from "@/redux/slices/posts"
import { selectFollowingIdsByUserId } from "@/redux/slices/subscriptions"
import { selectUserByUsername } from "@/redux/slices/users"

import PostItem from "@/shared/components/PostItem"

const SubscriptionsTabContent = () => {
  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const currentUser = useAppSelector((state) =>
    selectUserByUsername(state, authenticatedUsername || "")
  )

  const posts = useAppSelector((state) => postsSelectors.selectAll(state))
  const followingIds = useAppSelector((state) =>
    selectFollowingIdsByUserId(state, currentUser!.id)
  )

  return (
    <div className="flex flex-col gap-2">
      {posts
        .filter(
          (post) =>
            followingIds.includes(post.userId) ||
            post.userId === currentUser!.id
        )
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
    </div>
  )
}

export default SubscriptionsTabContent
