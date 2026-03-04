import { useAppSelector } from "@/redux/hooks"
import { selectUserByUsername } from "@/redux/slices/users"

const Profile = () => {
  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const currentUser = useAppSelector((state) =>
    selectUserByUsername(state, authenticatedUsername || "")
  )

  if (!currentUser) return null

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-950">
          <p className="text-xl font-bold text-amber-100">
            {currentUser.username[0].toUpperCase()}
          </p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium text-amber-800">
            {currentUser.username}
          </p>
          <p className="text-base/none text-amber-700">
            This is my profile page
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
