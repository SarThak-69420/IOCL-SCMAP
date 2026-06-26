import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
  console.log("LOGIN COMPONENT RENDERED");
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("users/login/", {
      username,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    navigate("/");
  } catch (error) {
    alert("Invalid username or password");
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        fontFamily: "Segoe UI, sans-serif",
        background:
          "linear-gradient(135deg,#001845 0%,#003566 100%)",
      }}
    >
      <div
        style={{
          flex: 1,
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <img
          src="/indianoil.webp"
          alt="IOCL"
          style={{
            width: "120px",
            marginBottom: "30px",
            background: "white",
            borderRadius: "20px",
            padding: "10px",
          }}
        />

        <h1
          style={{
            fontSize: "56px",
            marginBottom: "20px",
            fontWeight: "700",
          }}
        >
          IOCL SCMS
        </h1>

        <h2
          style={{
            fontSize: "28px",
            fontWeight: "500",
            marginBottom: "20px",
            color: "#dbeafe",
          }}
        >
          Smart Complaint Management System
        </h2>

        <p
          style={{
            fontSize: "18px",
            lineHeight: "32px",
            color: "#cbd5e1",
            maxWidth: "600px",
          }}
        >
          Streamline complaint registration,
          assignment, escalation, resolution,
          analytics and reporting across
          departments with a centralized
          enterprise platform.
        </p>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          {[
            "Track",
            "Assign",
            "Resolve",
            "Analyse",
            "Report",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "10px 18px",
                background:
                  "rgba(255,255,255,0.12)",
                borderRadius: "999px",
                fontSize: "14px",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          width: "520px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <form
          onSubmit={login}
          style={{
            width: "100%",
            background:
              "rgba(255,255,255,0.96)",
            backdropFilter: "blur(20px)",
            border:
              "1px solid rgba(255,255,255,0.3)",
            borderRadius: "30px",
            padding: "50px",
            boxShadow:
              "0 25px 60px rgba(0,0,0,0.25)",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            Welcome Back
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "35px",
              lineHeight: "24px",
            }}
          >
            Sign in to access the IOCL
            Smart Complaint Management
            System.
          </p>

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              marginBottom: "20px",
              fontSize: "15px",
            }}
          />

          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "600",
              color: "#334155",
            }}
          >
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              marginBottom: "25px",
              fontSize: "15px",
            }}
          />

          <button
  type="submit"
  style={{
    width: "100%",
    padding: "18px",
    background: "linear-gradient(135deg,#2563eb,#1d4ed8)",
    color: "white",
    border: "none",
    borderRadius: "16px",
    fontSize: "20px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(37,99,235,0.3)",
  }}
>
  Log In
</button>

<div
  style={{
    marginTop: "20px",
    textAlign: "center",
  }}
>
  <span
    style={{
      color: "#64748b",
      fontSize: "15px",
    }}
  >
    Don't have an account?
  </span>

  <button
    type="button"
    onClick={() => navigate("/register")}
    style={{
      background: "none",
      border: "none",
      color: "#2563eb",
      fontWeight: "700",
      cursor: "pointer",
      marginLeft: "6px",
      fontSize: "15px",
    }}
  >
    Register
  </button>
</div>

          

          <div
            style={{
              marginTop: "40px",
              paddingTop: "20px",
              borderTop:
                "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Version 1.0.0
            </div>

            <div
              style={{
                marginTop: "8px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Internship Project
            </div>

            <div
              style={{
                marginTop: "4px",
                fontSize: "12px",
                color: "#94a3b8",
              }}
            >
              Indian Oil Corporation Ltd.
            </div>

            <div
              style={{
                marginTop: "12px",
                fontSize: "13px",
                fontWeight: "700",
                color: "#2563eb",
              }}
            >
              Sarthak Sidhant
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;