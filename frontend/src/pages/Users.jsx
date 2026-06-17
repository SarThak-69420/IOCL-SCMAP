import { useEffect, useState } from "react";
import api from "../services/api";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("users/users/");

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`users/users/${id}/`);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.username || "")
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      (user.email || "")
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const employeeCount = users.filter(
    (u) => u.role === "EMPLOYEE"
  ).length;

  const officerCount = users.filter(
    (u) => u.role === "OFFICER"
  ).length;

  const managerCount = users.filter(
    (u) => u.role === "MANAGER"
  ).length;

  const adminCount = users.filter(
    (u) => u.role === "ADMIN"
  ).length;

  const getRoleColor = (role) => {
    switch (role) {
      case "ADMIN":
        return "#ef4444";
      case "MANAGER":
        return "#f59e0b";
      case "OFFICER":
        return "#3b82f6";
      default:
        return "#10b981";
    }
  };

  return (
    <div>
      <h1
        style={{
          fontSize: "48px",
          fontWeight: "700",
          color: "#0f172a",
          marginBottom: "10px",
        }}
      >
        Users Management
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
          fontSize: "18px",
        }}
      >
        Manage employees, officers and administrators.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <h4>Total Users</h4>
          <h1>{users.length}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <h4>Employees</h4>
          <h1>{employeeCount}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <h4>Officers</h4>
          <h1>{officerCount}</h1>
        </div>

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
            boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
          }}
        >
          <h4>Managers/Admins</h4>
          <h1>{managerCount + adminCount}</h1>
        </div>
      </div>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "350px",
          padding: "12px",
          borderRadius: "10px",
          border: "1px solid #d1d5db",
          marginBottom: "25px",
        }}
      />

      <div
        style={{
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead
            style={{
              background: "#0f172a",
              color: "white",
            }}
          >
            <tr>
              <th style={{ padding: "16px" }}>Username</th>
              <th style={{ padding: "16px" }}>Email</th>
              <th style={{ padding: "16px" }}>Role</th>
              <th style={{ padding: "16px" }}>Employee ID</th>
              <th style={{ padding: "16px" }}>Phone</th>
              <th style={{ padding: "16px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {user.username}
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {user.email}
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span
                    style={{
                      background: getRoleColor(user.role),
                      color: "white",
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "600",
                    }}
                  >
                    {user.role}
                  </span>
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {user.employee_id || "-"}
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  {user.phone || "-"}
                </td>

                <td
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <button
                    onClick={() => deleteUser(user.id)}
                    style={{
                      background: "#ef4444",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;