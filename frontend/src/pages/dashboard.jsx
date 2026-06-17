import { useEffect, useState } from "react";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function Dashboard() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
  api
    .get("complaints/complaints/")
    .then((res) => {
      console.log("API RESPONSE:", res.data);
      setComplaints(res.data);
    })
    .catch((err) => console.log(err));
    }, []);

  const total = complaints.length;

  const openCount = complaints.filter(
    (c) =>
      c.status === "OPEN" ||
      c.status === "ASSIGNED" ||
      c.status === "IN_PROGRESS"
  ).length;

  const resolvedCount = complaints.filter(
    (c) =>
      c.status === "RESOLVED" ||
      c.status === "CLOSED"
  ).length;

  const slaBreached = complaints.filter(
    (c) =>
      c.sla_deadline &&
      new Date(c.sla_deadline) < new Date() &&
      c.status !== "RESOLVED" &&
      c.status !== "CLOSED"
  ).length;

  const statusData = [
    {
      name: "Open",
      value: complaints.filter((c) => c.status === "OPEN").length,
    },
    {
      name: "Assigned",
      value: complaints.filter((c) => c.status === "ASSIGNED").length,
    },
    {
      name: "In Progress",
      value: complaints.filter((c) => c.status === "IN_PROGRESS").length,
    },
    {
      name: "Resolved",
      value: complaints.filter((c) => c.status === "RESOLVED").length,
    },
    {
      name: "Closed",
      value: complaints.filter((c) => c.status === "CLOSED").length,
    },
  ];

  const categoryList = [
    "SAFETY",
    "MAINTENANCE",
    "OPERATIONS",
    "IT",
    "HR",
    "FINANCE",
    "SECURITY",
    "ENVIRONMENT",
  ];

  const categoryData = categoryList.map((cat) => ({
    category: cat,
    count: complaints.filter((c) => c.category === cat).length,
  }));

  const COLORS = [
    "#2563eb",
    "#f59e0b",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
  ];

  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(135deg,#001f5b,#003b8e,#0057d8)",
          borderRadius: "28px",
          padding: "40px",
          color: "white",
          marginBottom: "35px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "48px",
            fontWeight: "800",
          }}
        >
          Executive Dashboard
        </h1>

        <p
          style={{
            marginTop: "10px",
            opacity: 0.9,
            fontSize: "18px",
          }}
        >
          Indian Oil Corporation Limited
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        {[
          {
            title: "Total Complaints",
            value: total,
            color: "#2563eb",
          },
          {
            title: "Open",
            value: openCount,
            color: "#f59e0b",
          },
          {
            title: "Resolved",
            value: resolvedCount,
            color: "#10b981",
          },
          {
            title: "SLA Breached",
            value: slaBreached,
            color: "#ef4444",
          },
        ].map((card, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              borderRadius: "24px",
              padding: "28px",
              borderTop: `5px solid ${card.color}`,
              boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
            }}
          >
            <p
              style={{
                color: "#64748b",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              {card.title}
            </p>

            <h1
              style={{
                margin: 0,
                fontSize: "56px",
                color: "#0f172a",
              }}
            >
              {card.value}
            </h1>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2>Status Distribution</h2>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={120}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "24px",
            padding: "30px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <h2>Quick Summary</h2>

          <div style={{ marginTop: "25px" }}>
            <h3>Total Records</h3>
            <h1>{total}</h1>

            <h3>Active Cases</h3>
            <h1>{openCount}</h1>

            <h3>Resolved</h3>
            <h1>{resolvedCount}</h1>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          marginBottom: "30px",
        }}
      >
        <h2>Category Analysis</h2>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={categoryData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="category" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="count"
              fill="#2563eb"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "24px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
        }}
      >
        <h2>Recent Complaints</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Title</th>
              <th align="left">Category</th>
              <th align="left">Priority</th>
              <th align="left">Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.slice(0, 5).map((c) => (
              <tr key={c.id}>
                <td>{c.complaint_id}</td>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.priority}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;