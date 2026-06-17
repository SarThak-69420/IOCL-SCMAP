import { Routes, Route, Link, useLocation } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Complaints from "./pages/complaints";
import ComplaintDetails from "./pages/complaintDetails";
import EditComplaint from "./pages/EditComplaint";
import Analytics from "./pages/Analytics";
import NewComplaint from "./pages/NewComplaint";
import Users from "./pages/Users";
import Reports from "./pages/Reports";

function App() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Complaints", path: "/complaints" },
    { name: "Analytics", path: "/analytics" },
    { name: "Users", path: "/users" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          width: "220px",
          background: "linear-gradient(180deg,#001845 0%, #00296b 100%)",
          color: "white",
          padding: "30px 20px",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
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
            borderTop: "1px solid rgba(255,255,255,0.08)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#94a3b8",
              fontSize: "11px",
              marginBottom: "8px",
              letterSpacing: "0.5px",
            }}
          >
            © 2026 IOCL SCMS
          </div>

          <div
            style={{
              color: "#e2e8f0",
              fontSize: "11px",
              marginBottom: "10px",
            }}
          >
            Smart Complaint Management System
          </div>

          <div
            style={{
              color: "#ffffff",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            Designed & Developed By
          </div>

          <div
            style={{
              color: "#60a5fa",
              fontSize: "14px",
              fontWeight: "700",
              marginTop: "4px",
            }}
          >
            Sarthak Sidhant
          </div>

          <div
            style={{
              marginTop: "12px",
              color: "#94a3b8",
              fontSize: "10px",
            }}
          >
            Version 1.0.0
          </div>

          <div
            style={{
              marginTop: "4px",
              color: "#64748b",
              fontSize: "9px",
            }}
          >
            Internship Project • Indian Oil Corporation Ltd.
          </div>
        </div>
      </div>

      <div
        style={{
          flex: 1,
          padding: "40px",
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/:id" element={<ComplaintDetails />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/new-complaint" element={<NewComplaint />} />
          <Route path="/users" element={<Users />} />
          <Route path="/reports" element={<Reports />} />
          <Route
            path="/complaints/:id/edit"
            element={<EditComplaint />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;