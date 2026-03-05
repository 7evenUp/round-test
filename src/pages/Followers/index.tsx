import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { ArrowLeft } from "lucide-react"

import { useAppSelector } from "@/redux/hooks"
import { selectFollowerUsersPageByUserId } from "@/redux/slices/subscriptions"

import Button from "@/shared/ui/Button"

const PAGE_SIZE = 5

const Followers = () => {
  const navigate = useNavigate()
  const params = useParams()
  const userId = parseInt(params.userId!)

  const [page, setPage] = useState(1)

  const { hasNextPage, users } = useAppSelector((state) =>
    selectFollowerUsersPageByUserId(state, userId, 1, page * PAGE_SIZE)
  )

  return (
    <div className="flex w-full flex-col gap-5">
      <button
        className="flex items-center gap-2 text-sm font-bold text-white/75"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="size-4" />
        <p>Назад</p>
      </button>
      <div className="flex flex-col gap-2">
        {users.map((follower) => (
          <Link
            key={follower.id}
            to={`/profile/${follower.id}`}
            className="flex h-12 items-center justify-center rounded-xl bg-sky-950/50 transition-colors hover:bg-sky-950/75"
          >
            {follower.username}
          </Link>
        ))}
      </div>
      {hasNextPage && (
        <Button onClick={() => setPage((prev) => prev + 1)}>
          Загрузить ещё
        </Button>
      )}
    </div>
  )
}

export default Followers
