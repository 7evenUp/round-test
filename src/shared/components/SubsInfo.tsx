import { Link } from "react-router"

import { useAppSelector } from "@/redux/hooks"
import {
  selectFollowersCountByUserId,
  selectFollowingCountByUserId,
} from "@/redux/slices/subscriptions"

const SubsInfo = ({ userId }: { userId: number }) => {
  const followers = useAppSelector((state) =>
    selectFollowersCountByUserId(state, userId)
  )
  const followings = useAppSelector((state) =>
    selectFollowingCountByUserId(state, userId)
  )

  return (
    <div className="my-4 flex items-center gap-4">
      <Link
        to={`/followers/${userId}`}
        className="flex flex-1 flex-col items-center rounded-xl bg-sky-950/50 p-2 transition-colors hover:bg-sky-950/75"
      >
        <p className="text-lg font-bold text-white">{followers}</p>
        <p className="text-sm text-white/80">Подписчики</p>
      </Link>
      <Link
        to={`/followings/${userId}`}
        className="flex flex-1 flex-col items-center rounded-xl bg-sky-950/50 p-2 transition-colors hover:bg-sky-950/75"
      >
        <p className="text-lg font-bold text-white">{followings}</p>
        <p className="text-sm text-white/80">Подписки</p>
      </Link>
    </div>
  )
}

export default SubsInfo
