import { useAppSelector } from "@/redux/hooks"
import { postsSelectors } from "@/redux/slices/posts"

import PostItem from "@/shared/components/PostItem"

const AllTabContent = () => {
  const posts = useAppSelector((state) => postsSelectors.selectAll(state))

  return (
    <div className="flex flex-col gap-2">
      {posts
        .sort((a, b) => b.createdAt - a.createdAt)
        .map((post) => (
          <PostItem key={post.id} {...post} />
        ))}
    </div>
  )
}

export default AllTabContent
