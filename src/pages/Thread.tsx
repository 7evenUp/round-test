import { useNavigate } from "react-router"

import { useAppSelector } from "@/redux/hooks"
import { postsSelectors } from "@/redux/slices/posts"
import { usersSelectors } from "@/redux/slices/users"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs"
import Button from "@/shared/ui/Button"

const Thread = () => {
  const navigate = useNavigate()

  const posts = useAppSelector((state) => postsSelectors.selectAll(state))
  const users = useAppSelector((state) => usersSelectors.selectAll(state))

  return (
    <Tabs defaultValue="all" className="w-full gap-4">
      <TabsList>
        <TabsTrigger value="all">Все</TabsTrigger>
        <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <div className="flex flex-col gap-2">
          {posts
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((post) => {
              const postAuthor = users.find((user) => user.id === post.userId)

              if (!postAuthor) return null

              return (
                <div className="flex flex-col gap-4 rounded-xl bg-sky-950/40 p-5">
                  <div className="flex items-center gap-2">
                    <div className="flex size-11 items-center justify-center rounded-full bg-sky-900 font-bold text-sky-100">
                      {postAuthor.username[0]}
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-base/none font-medium text-sky-300">
                        {postAuthor.username}
                      </p>
                      <p className="text-[13px]/none font-light text-sky-200">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg/tight text-sky-200">{post.content}</p>
                </div>
              )
            })}
          <Button onClick={() => navigate("/profile")}>
            Перейти в профиль
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="subscriptions"></TabsContent>
    </Tabs>
  )
}

export default Thread
