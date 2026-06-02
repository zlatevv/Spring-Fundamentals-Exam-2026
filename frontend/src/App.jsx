import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AuthPage      from './pages/AuthPage'
import FindSpotter   from './spotme/FindSpotter'
import CreateSession from './spotme/CreateSession'
import Profile       from './spotme/Profile'
import SessionDetail from './spotme/SessionDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth"           element={<AuthPage />} />
        <Route path="/"               element={<FindSpotter />} />
        <Route path="/create"         element={<CreateSession />} />
        <Route path="/profile"        element={<Profile />} />
        <Route path="/session/:id"    element={<SessionDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App