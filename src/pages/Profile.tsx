const Profile = () => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <div className="flex size-14 items-center justify-center rounded-full bg-amber-950">
          <p className="text-xl font-bold text-amber-100">A</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-medium text-amber-800">Artyom</p>
          <p className="text-base/none text-amber-700">
            This is my profile page
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile
