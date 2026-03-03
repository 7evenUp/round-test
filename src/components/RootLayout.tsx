import { Outlet } from "react-router"

const RootLayout = () => {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-50">
      <h1 className="text-5xl">Hello world</h1>

      <Outlet />
    </main>
  )
}

export default RootLayout
