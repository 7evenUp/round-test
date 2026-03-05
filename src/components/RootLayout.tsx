import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-3 py-10 text-zinc-50">
      <div className="mx-auto flex w-[320px] flex-1 flex-col items-center">
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
