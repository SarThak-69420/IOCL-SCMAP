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
          background:
            "linear-gradient(180deg,#001845 0%, #00296b 100%)",
          color: "white",
          padding: "30px 20px",
          boxShadow: "4px 0 20px rgba(0,0,0,0.08)",
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
            }}
          >
            {item.name}
          </Link>
        ))}
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