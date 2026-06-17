import { useEffect, useState } from "react";
import api from "../services/api";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    api
      .get("complaints/complaints/")
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];

        setComplaints(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalComplaints = complaints.length;

  const openCount = complaints.filter((c) =>
    ["OPEN", "ASSIGNED", "IN_PROGRESS"].includes(c.status)
  ).length;

  const resolvedCount = complaints.filter((c) =>
    ["RESOLVED", "CLOSED"].includes(c.status)
  ).length;

  const escalatedCount = complaints.filter(
    (c) => c.status === "ESCALATED"
  ).length;

  const statusData = [
    { name: "Open", value: openCount },
    { name: "Resolved", value: resolvedCount },
    { name: "Escalated", value: escalatedCount },
  ];

  const categories = [
    "SAFETY",
    "MAINTENANCE",
    "OPERATIONS",
    "IT",
    "HR",
    "FINANCE",
    "SECURITY",
    "ENVIRONMENT",
  ];

  const categoryData = categories.map((category) => ({
    category,
    count: complaints.filter(
      (c) => c.category === category
    ).length,
  }));

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#ef4444",
  ];

  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(135deg,#001845,#00509d)",
          borderRadius: "28px",
          padding: "40px",
          color: "white",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "48px",
            fontWeight: "800",
          }}
        >
          Analytics Center
        </h1>

        <p
          style={{
            marginTop: "12px",
            color: "#dbeafe",
            fontSize: "18px",
          }}
        >
          Real-time complaint intelligence &
          operational insights
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <Card
          title="Total Complaints"
          value={totalComplaints}
          color="#2563eb"
        />

        <Card
          title="Open Cases"
          value={openCount}
          color="#f59e0b"
        />

        <Card
          title="Resolved"
          value={resolvedCount}
          color="#22c55e"
        />

        <Card
          title="Escalated"
          value={escalatedCount}
          color="#ef4444"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "24px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "28px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Category Analysis
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="count"
                fill="#2563eb"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "28px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Status Distribution
          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                outerRadius={110}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "28px",
          boxShadow:
            "0 10px 30px rgba(0,0,0,0.05)",
        }}
      >
        <h2
          style={{
            marginBottom: "24px",
          }}
        >
          Recent Complaints
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                textAlign: "left",
                color: "#64748b",
              }}
            >
              <th>ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {complaints.slice(0, 5).map((item) => (
              <tr
                key={item.id}
                style={{
                  height: "55px",
                }}
              >
                <td>{item.complaint_id}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.priority}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "22px",
        padding: "24px",
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <p
        style={{
          color: "#64748b",
          fontSize: "15px",
          marginBottom: "12px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          color: "#0f172a",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default Analytics;