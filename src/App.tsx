import { CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import RequireGuest from "./components/RequireGuest";
import { AuthProvider } from "./hooks/useAuth";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route element={<RequireGuest />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
