import { useState } from "react"
import { Edit } from "lucide-react"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { updateUser, usersSelectors } from "@/redux/slices/users"
import { changeCurrentUsername } from "@/redux/slices/auth"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/shared/ui/Dialog"
import Button from "@/shared/ui/Button"

import {
  USERNAME_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
} from "@/shared/constants/username-lengths"

const EditUsername = () => {
  const [name, setName] = useState("")

  const dispatch = useAppDispatch()

  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const users = useAppSelector((state) => usersSelectors.selectAll(state))

  const isUsernameAlreadyExist = users.find((user) => user.username === name)

  const onConfirmClick = () => {
    if (name.trim().length <= 3) return
    if (isUsernameAlreadyExist) return

    dispatch(
      updateUser({
        oldUsername: authenticatedUsername!,
        newUsername: name.trim(),
      })
    )
    dispatch(changeCurrentUsername(name.trim()))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sky-300 transition-colors hover:text-sky-200">
          <Edit className="size-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-xl font-medium">Меняем имя</p>
        <p className="mt-8 text-lg">
          Текущее имя: <b>{authenticatedUsername}</b>
        </p>
        <label className="mt-2 mb-10 flex w-full flex-col gap-1.5">
          <p className="text-zinc-300">Введите имя</p>
          <div className="relative">
            <input
              value={name}
              onChange={(evt) => setName(evt.currentTarget.value)}
              className="flex h-10 w-full items-center rounded-xl border border-zinc-700 px-3 text-base/none outline-none placeholder:text-zinc-400 focus-within:border-zinc-500 hover:border-zinc-600/75 focus-within:hover:border-zinc-500"
              placeholder="Вот тут напиши..."
              maxLength={USERNAME_MAX_LENGTH}
            />
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-xs text-zinc-400">
              {name.length}/{USERNAME_MAX_LENGTH}
            </span>
          </div>
          {isUsernameAlreadyExist && (
            <span className="text-xs font-medium text-red-200">
              Такое имя уже существует
            </span>
          )}
        </label>
        <DialogClose asChild>
          <Button
            onClick={onConfirmClick}
            disabled={
              name.trim().length < USERNAME_MIN_LENGTH ||
              Boolean(isUsernameAlreadyExist)
            }
          >
            Изменить
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default EditUsername
