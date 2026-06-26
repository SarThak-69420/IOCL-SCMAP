import { useState, useMemo } from "react";

import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import Profile from "./pages/Profile";
import Dashboard from "./pages/dashboard";
import Complaints from "./pages/complaints";
import ComplaintDetails from "./pages/complaintDetails";
import EditComplaint from "./pages/EditComplaint";
import Analytics from "./pages/Analytics";
import NewComplaint from "./pages/NewComplaint";
import Users from "./pages/Users";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/ProtectedRoute";

import ThemeContext from "./ThemeContext";
import { lightTheme, darkTheme } from "./theme";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const theme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  const toggleTheme = () => {
    const next = !darkMode;

    setDarkMode(next);

    localStorage.setItem(
      "theme",
      next ? "dark" : "light"
    );
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  if (
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return (
      <Routes>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    );
  }

  let menuItems = [];

  switch (user.role) {
    case "ADMIN":
      menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Complaints", path: "/complaints" },
        { name: "Analytics", path: "/analytics" },
        { name: "Users", path: "/users" },
        { name: "Reports", path: "/reports" },
      ];
      break;

    case "MANAGER":
      menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Complaints", path: "/complaints" },
        { name: "Analytics", path: "/analytics" },
        { name: "Reports", path: "/reports" },
      ];
      break;

    case "OFFICER":
      menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Complaints", path: "/complaints" },
        { name: "Analytics", path: "/analytics" },
      ];
      break;

    default:
      menuItems = [
        { name: "Dashboard", path: "/" },
        { name: "Complaints", path: "/complaints" },
        { name: "New Complaint", path: "/new-complaint" },
      ];
  }

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
        theme,
      }}
    >
      <div
  style={{
    display: "flex",
    minHeight: "100vh",
    background: theme.background,

    fontFamily: "Segoe UI, sans-serif",
  }}
>
              {/* Sidebar */}

        <div
          style={{
            width: "220px",
            background:
              "linear-gradient(180deg,#001845 0%, #00296b 100%)",
            color: "white",
            padding: "30px 20px",
            boxShadow:
              "4px 0 20px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "50px",
            }}
          >
            <img
              src="/indianoil.webp"
              alt="IOCL"
              style={{
                width: "65px",
                height: "65px",
                borderRadius: "16px",
                background: "white",
                padding: "6px",
              }}
            />

            <h2
              style={{
                marginTop: "12px",
                marginBottom: "4px",
                fontSize: "26px",
              }}
            >
              IOCL SCMS
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "13px",
                lineHeight: "20px",
              }}
            >
              Smart Complaint System
            </p>
          </div>

          <div>
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                style={{
                  display: "block",
                  padding: "14px 18px",
                  marginBottom: "10px",
                  borderRadius: "12px",
                  color:
                    location.pathname === item.path
                      ? "#001845"
                      : "white",

                  background:
                    location.pathname === item.path
                      ? "white"
                      : "transparent",

                  textDecoration: "none",
                  fontWeight: "600",
                  transition: "0.3s",
                }}
              >
                {item.name}
              </Link>
            ))}
          </div>
                    <div
            style={{
              marginTop: "auto",
              paddingTop: "25px",
              borderTop:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              onClick={() =>
                navigate("/profile")
              }
              style={{
                textAlign: "center",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              <img
                src="/pic.jpg"
                alt="Profile"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border:
                    "3px solid #3b82f6",
                  margin:
                    "0 auto 10px",
                  display: "block",
                }}
              />

              <div
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: "16px",
                }}
              >
                {user.username || "Guest"}
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "12px",
                  marginTop: "4px",
                }}
              >
                {user.role || ""}
              </div>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                width: "100%",
                padding: "12px",
                background: darkMode
                  ? "#facc15"
                  : "#334155",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
                marginBottom: "12px",
              }}
            >
              {darkMode
                ? "☀ Light Mode"
                : "🌙 Dark Mode"}
            </button>

            <button
              onClick={logout}
              style={{
                width: "100%",
                padding: "12px",
                background: "#ef4444",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Logout
            </button>

            <div
              style={{
                marginTop: "20px",
                textAlign: "center",
                color: "#64748b",
                fontSize: "10px",
              }}
            >
              Version 1.0.0
            </div>
          </div>
        </div>
                {/* Main Content */}

        <div
          style={{
            flex: 1,
            padding: "40px",
            background: theme.background,
            transition: "all .3s ease",
            overflowY: "auto",
          }}
        >
          <Routes>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints"
              element={
                <ProtectedRoute>
                  <Complaints />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints/:id"
              element={
                <ProtectedRoute>
                  <ComplaintDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/complaints/:id/edit"
              element={
                <ProtectedRoute>
                  <EditComplaint />
                </ProtectedRoute>
              }
            />
                        <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            <Route
              path="/new-complaint"
              element={
                <ProtectedRoute>
                  <NewComplaint />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />

            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />

          </Routes>
        </div>
    </div>
  </ThemeContext.Provider>
);
}

export default App;