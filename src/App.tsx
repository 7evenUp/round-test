import { BrowserRouter, Route, Routes } from "react-router"

import Auth from "./pages/Auth"
import Thread from "./pages/Thread"
import Profile from "./pages/Profile"

import Providers from "./components/Providers"
import RootLayout from "./components/RootLayout"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/auth" element={<Auth />} />
            <Route path="/thread" element={<Thread />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* <Route path="*"  /> */}
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
