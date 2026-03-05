import { useNavigate } from "react-router"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs"
import Button from "@/shared/ui/Button"

import AllTabContent from "./AllTabContent"
import SubscriptionsTabContent from "./SubscriptionsTabContent"

const Thread = () => {
  const navigate = useNavigate()

  return (
    <Tabs defaultValue="all" className="w-full gap-4">
      <TabsList>
        <TabsTrigger value="all">Все</TabsTrigger>
        <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <AllTabContent />
      </TabsContent>
      <TabsContent value="subscriptions">
        <SubscriptionsTabContent />
      </TabsContent>
      <Button onClick={() => navigate("/profile")}>Перейти в профиль</Button>
    </Tabs>
  )
}

export default Thread
