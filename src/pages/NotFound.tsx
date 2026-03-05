import { useNavigate } from "react-router"

import Button from "../shared/ui/Button"

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center gap-10 rounded-xl bg-zinc-800 px-8 py-6">
      <h1 className="text-2xl font-medium">Page Not Found</h1>
      <p className="text-center opacity-75">
        Please don't play with URL. You may brake something
      </p>
      <div className="flex items-center gap-2">
        <Button onClick={() => navigate("/profile")}>Go to Profile</Button>
        <Button onClick={() => navigate("/thread")}>Go to Threads</Button>
      </div>
    </div>
  )
}

export default NotFound
