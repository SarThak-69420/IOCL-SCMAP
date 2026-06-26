import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    employee_id: "",
    phone: "",
    role: "EMPLOYEE",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {
      await api.post(
        "users/register/",
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          username: formData.username,
          employee_id: formData.employee_id,
          phone: formData.phone,
          role: formData.role,
          password: formData.password,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
      }}
    >
      {/* LEFT PANEL */}

      <div
        style={{
          flex: 1,
          background:
            "linear-gradient(135deg,#001845,#003566)",
          color: "white",
          padding: "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img
          src="/indianoil.webp"
          alt="IOCL"
          style={{
            width: "120px",
            marginBottom: "30px",
          }}
        />

        <h1
          style={{
            fontSize: "64px",
            marginBottom: "20px",
          }}
        >
          IOCL SCMS
        </h1>

        <h2
          style={{
            fontWeight: "400",
            marginBottom: "30px",
          }}
        >
          Smart Complaint Management System
        </h2>

        <p
          style={{
            maxWidth: "600px",
            lineHeight: "40px",
            fontSize: "24px",
            opacity: "0.9",
          }}
        >
          Create your account and start
          managing complaints across
          departments with enterprise
          workflow automation.
        </p>
      </div>

      {/* RIGHT PANEL */}

      <div
        style={{
          width: "650px",
          background: "#f8fafc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <form
          onSubmit={register}
          style={{
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h1
            style={{
              fontSize: "52px",
              marginBottom: "10px",
              color: "#0f172a",
            }}
          >
            Create Account
          </h1>

          <p
            style={{
              color: "#64748b",
              marginBottom: "30px",
            }}
          >
            Register for the IOCL Smart
            Complaint Management System
          </p>

          <input
            name="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            name="employee_id"
            placeholder="Employee ID"
            value={formData.employee_id}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="EMPLOYEE">
              Employee
            </option>

            <option value="OFFICER">
              Officer
            </option>

            <option value="MANAGER">
              Manager
            </option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "18px",
              border: "none",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              fontSize: "18px",
              fontWeight: "700",
              cursor: "pointer",
              marginTop: "10px",
            }}
          >
            Create Account
          </button>

          <div
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
              style={{
                color: "#2563eb",
                marginLeft: "8px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  marginBottom: "14px",
  borderRadius: "12px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  boxSizing: "border-box",
};

export default Register;