import { useLocation, useNavigate, useParams } from "react-router"

import FollowButton from "./FollowButton"

import { useAppSelector } from "@/redux/hooks"
import { usersSelectors } from "@/redux/slices/users"
import { selectPostsByUserId } from "@/redux/slices/posts"

import Button from "@/shared/ui/Button"

import PostItem from "@/shared/components/PostItem"
import SubsInfo from "@/shared/components/SubsInfo"

const AuthorProfile = () => {
  const navigate = useNavigate()

  const { state } = useLocation()

  const params = useParams()
  const authorId = parseInt(params.authorId!)

  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const { username } = useAppSelector((state) =>
    usersSelectors.selectById(state, authorId)
  )
  const authorPosts = useAppSelector((state) =>
    selectPostsByUserId(state, authorId)
  )

  const isMyProfile = authenticatedUsername === username

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-full bg-sky-950">
          <p className="text-lg font-bold text-sky-100">
            {username[0].toUpperCase()}
          </p>
        </div>
        <p className="text-lg font-medium text-sky-300">{username}</p>
      </div>

      <SubsInfo userId={authorId} />

      {!isMyProfile && <FollowButton authorId={authorId} />}

      <p className="mt-6 mb-1 text-lg font-medium text-white/80">Все посты</p>
      <div className="flex flex-col gap-2">
        {authorPosts
          .sort((a, b) => b.createdAt - a.createdAt)
          .map((post) => (
            <PostItem key={post.id} {...post} />
          ))}
      </div>

      {state !== null ? (
        <Button
          className="mt-6"
          onClick={() => navigate(state.from, { replace: true })}
        >
          Назад
        </Button>
      ) : (
        <Button className="mt-6" onClick={() => navigate("/thread")}>
          Перейти в ленту
        </Button>
      )}
    </div>
  )
}

export default AuthorProfile
