import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";
import NotFoundPage from "./pages/NotFoundPage";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* private routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="search/:searchValue" element={<SearchPage />} />
        </Route>
        {/* all routes */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
