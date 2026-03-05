import { Link } from "react-router"

import { useAppSelector } from "@/redux/hooks"
import { usersSelectors } from "@/redux/slices/users"
import type { Post } from "@/redux/slices/posts"

const PostItem = ({ content, createdAt, userId }: Post) => {
  const users = useAppSelector((state) => usersSelectors.selectAll(state))

  const postAuthor = users.find((user) => user.id === userId)

  if (!postAuthor) return null

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-sky-950/40 p-5">
      <Link
        to={`/profile/${postAuthor.id}`}
        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-sky-950/50"
      >
        <div className="flex size-11 items-center justify-center rounded-full bg-sky-900 font-bold text-sky-100">
          {postAuthor.username[0].toUpperCase()}
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-base/none font-medium text-sky-300">
            {postAuthor.username}
          </p>
          <p className="text-[13px]/none font-light text-sky-200">
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>
      </Link>
      <p className="text-lg/tight text-sky-200">{content}</p>
    </div>
  )
}

export default PostItem
