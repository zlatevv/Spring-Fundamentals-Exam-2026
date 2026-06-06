import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthPage      from "./pages/AuthPage";
import FindSpotter   from "./pages/FindSpotter";
import CreateSession from "./pages/CreateSession";
import Profile       from "./pages/Profile";
import SessionDetail from "./pages/SessionDetail";
import SessionReviews from "./pages/SessionReviews";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth"         element={<AuthPage />} />
          <Route path="/"             element={<FindSpotter />} />
          <Route path="/create"       element={<CreateSession />} />
          <Route path="/profile"      element={<Profile />} />
          <Route path="/session/:id"  element={<SessionDetail />} />
          <Route path="/session/:id/reviews" element={<SessionReviews />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;