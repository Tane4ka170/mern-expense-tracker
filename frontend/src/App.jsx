import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

const API_URL = "http://localhost:7339";

// To get transactions from localstorage
const getTransactionsFromStorage = () => {
  const saved = localStorage.getitem("transactions");
  return saved ? JSON.parse(saved) : [];
};

// To protect the routes
const ProtectedRoute = ({ user, children }) => {
  const localToken = localStorage.getItem("token");
  const sessionToken = sessionStorage.getItem("token");
  const hasToken = localToken || sessionToken;

  if (!user || !hasToken) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// To scroll to top when page gets reload or new page is visited
const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);
};

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const persistAuth = (userObj, tokenStr, remember = false) => {
    try {
      if (remember) {
        if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) localStorage.setItem("token", tokenStr);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
      } else {
        if (userObj) sessionStorage.setItem("user", JSON.stringify(userObj));
        if (tokenStr) sessionStorage.setItem("token", tokenStr);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
      setUser(userObj || null);
      setToken(tokenStr || null);
    } catch (err) {
      console.error("persistAuth error:", err);
    }
  };

  const clearAuth = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    } catch (error) {
      console.log("ClearAuth Error: ", error);
    }
    setUser(null);
    setToken(null);
  };

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  const handleLogin = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, remember, tokenFromApi);
    navigate("/");
  };

  const handleSignup = (userData, remember = false, tokenFromApi = null) => {
    persistAuth(userData, remember, tokenFromApi);
    navigate("/");
  };
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp onSignup={handleSignup} />} />
        <Route element={<Layout onLogout={handleLogout} />}>
          <Route path="/*" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
