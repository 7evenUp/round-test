import { useNavigate } from "react-router"

import CreatePost from "./CreatePost"

import { useAppSelector } from "@/redux/hooks"
import { selectUserByUsername } from "@/redux/slices/users"
import { selectPostsByUserId } from "@/redux/slices/posts"

import Button from "@/shared/ui/Button"

import PostItem from "@/shared/components/PostItem"
import SubsInfo from "@/shared/components/SubsInfo"

const Profile = () => {
  const navigate = useNavigate()

  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const currentUser = useAppSelector((state) =>
    selectUserByUsername(state, authenticatedUsername || "")
  )
  const myPosts = useAppSelector((state) =>
    selectPostsByUserId(state, currentUser!.id)
  )

  if (!currentUser) return null

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center gap-2">
        <div className="flex size-10 items-center justify-center rounded-full bg-sky-950">
          <p className="text-lg font-bold text-sky-100">
            {currentUser.username[0].toUpperCase()}
          </p>
        </div>
        <p className="text-lg font-medium text-sky-300">
          {currentUser.username}
        </p>
      </div>

      <SubsInfo userId={currentUser.id} />

      <CreatePost />

      {myPosts.length === 0 ? (
        <p className="mt-6 text-center text-lg/tight text-white/80">
          ☝️ Кажись, у тебя ещё нет постов☝️
        </p>
      ) : (
        <>
          <p className="mt-6 mb-1 text-lg font-medium text-white/80">
            Все посты
          </p>
          <div className="flex flex-col gap-2">
            {myPosts
              .sort((a, b) => b.createdAt - a.createdAt)
              .map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
          </div>
        </>
      )}

      <Button className="mt-6" onClick={() => navigate("/thread")}>
        Перейти в ленту
      </Button>
    </div>
  )
}

export default Profile
