import { BrowserRouter, Route, Routes } from "react-router"

import Auth from "./pages/Auth"
import Thread from "./pages/Thread"
import Profile from "./pages/Profile"
import AuthorProfile from "./pages/AuthorProfile"
import Followers from "./pages/Followers"
import Followings from "./pages/Followings"
import NotFound from "./pages/NotFound"

import Providers from "./components/Providers"
import RootLayout from "./components/RootLayout"
import ProtectedRoute from "./components/ProtectedRoute"

const App = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<ProtectedRoute />}>
              <Route path="/thread" element={<Thread />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:authorId" element={<AuthorProfile />} />
              <Route path="/followers/:userId" element={<Followers />} />
              <Route path="/followings/:userId" element={<Followings />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
