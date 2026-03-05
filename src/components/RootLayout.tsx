import { Link, Outlet } from "react-router"

const RootLayout = () => {
  return (
    <main className="flex min-h-screen flex-col bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 px-3 py-10 text-zinc-50">
      <h1 className="text-5xl">Hello world</h1>
      <Link to="/thread">thread</Link>
      <Link to="/profile">profile</Link>
      <Link to="/123">123</Link>

      <div className="mx-auto flex w-[320px] flex-1 flex-col items-center">
        <Outlet />
      </div>
    </main>
  )
}

export default RootLayout
