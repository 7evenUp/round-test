import { useState } from "react"
import { Navigate, useNavigate } from "react-router"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addUser } from "@/redux/slices/users"
import { login } from "@/redux/slices/auth"

import Button from "@/shared/ui/Button"

const Auth = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")

  const dispatch = useAppDispatch()
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized)

  const onContinueClick = async () => {
    dispatch(addUser(name.trim()))
    dispatch(login())
    navigate("/thread")
  }

  if (isAuthorized) return <Navigate to="/profile" />

  return (
    <div className="flex w-xs flex-col items-center rounded-xl bg-zinc-800 px-4 py-6">
      <h1 className="text-2xl font-medium">Вход</h1>
      <label className="my-10 flex w-full flex-col gap-1.5">
        <p className="text-zinc-300">Введите имя</p>
        <input
          value={name}
          onChange={(evt) => setName(evt.currentTarget.value)}
          className="flex h-10 items-center rounded-xl border border-zinc-700 px-3 text-base/none outline-none placeholder:text-zinc-400 focus-within:border-zinc-500 hover:border-zinc-600/75 focus-within:hover:border-zinc-500"
          placeholder="Вот тут напиши..."
        />
      </label>
      <Button
        className="w-full"
        onClick={onContinueClick}
        disabled={name.trim().length <= 3}
      >
        Продолжить
      </Button>
    </div>
  )
}

export default Auth
