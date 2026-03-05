import { useState } from "react"

import Button from "@/shared/ui/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/shared/ui/Dialog"

import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { addPost } from "@/redux/slices/posts"
import { selectUserByUsername } from "@/redux/slices/users"

const CreatePost = () => {
  const [content, setContent] = useState("")

  const dispatch = useAppDispatch()
  const { authenticatedUsername } = useAppSelector((state) => state.auth)
  const currentUser = useAppSelector((state) =>
    selectUserByUsername(state, authenticatedUsername || "")
  )

  const onCreateClick = () => {
    if (content.trim().length === 0) return

    dispatch(addPost({ content: content.trim(), userId: currentUser!.id }))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Создать пост</Button>
      </DialogTrigger>
      <DialogContent>
        <p className="text-xl font-medium">Создаём пост</p>
        <div className="relative">
          <textarea
            value={content}
            onChange={(evt) => setContent(evt.currentTarget.value)}
            className="flex min-h-32 w-full resize-none items-center rounded-xl border border-zinc-700 p-3 text-base/none outline-none placeholder:text-zinc-400 focus-within:border-zinc-500 hover:border-zinc-600/75 focus-within:hover:border-zinc-500"
            placeholder="О чём ты думаешь?"
            maxLength={140}
          />
          <span className="absolute right-2 bottom-2 text-xs font-medium text-white/50">
            {content.length}/140
          </span>
        </div>
        <DialogClose asChild>
          <Button
            onClick={onCreateClick}
            disabled={content.trim().length === 0}
          >
            Опубликовать
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default CreatePost
