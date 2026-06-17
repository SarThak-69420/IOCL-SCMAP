function Users() {
  return (
    <div>
      <h1
        style={{
          fontSize: "42px",
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
        }}
      >
        User administration module coming soon.
      </p>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <h3>System Users</h3>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">Role</th>
              <th align="left">Department</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Admin</td>
              <td>Administrator</td>
              <td>IT</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;