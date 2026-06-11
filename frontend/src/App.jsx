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
          {/* Public Route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route 
            path="/" 
            element={<PrivateRoute><FindSpotter /></PrivateRoute>} 
          />
          <Route 
            path="/create" 
            element={<PrivateRoute><CreateSession /></PrivateRoute>} 
          />
          <Route 
            path="/profile" 
            element={<PrivateRoute><Profile /></PrivateRoute>} 
          />
          <Route 
            path="/session/:id" 
            element={<PrivateRoute><SessionDetail /></PrivateRoute>} 
          />
          <Route 
            path="/session/:id/reviews" 
            element={<PrivateRoute><SessionReviews /></PrivateRoute>} 
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
