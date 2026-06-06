import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthPage      from "./pages/AuthPage";
import FindSpotter   from "./pages/FindSpotter";
import CreateSession from "./pages/CreateSession";
import Profile       from "./pages/Profile";
import SessionDetail from "./pages/SessionDetail";
import SessionReviews from "./pages/SessionReviews";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/auth"         element={<AuthPage />} />
          <Route path="/"             element={<FindSpotter />} />
          <Route path="/create"       element={<PrivateRoute><CreateSession /></PrivateRoute>} />
          <Route path="/profile"      element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/session/:id"  element={<SessionDetail />} />
          <Route path="/session/:id/reviews" element={<SessionReviews />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
