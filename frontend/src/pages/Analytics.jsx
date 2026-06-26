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
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api
      .get("dashboard/")
      .then((res) => setStats(res.data))
      .catch(console.error);
  }, []);

  if (!stats) {
    return (
      <h2 style={{ padding: "40px" }}>
        Loading Analytics...
      </h2>
    );
  }

  const statusData = stats.status_chart.map((item) => ({
    name: item.status,
    value: item.count,
  }));

  const categoryData = stats.category_chart.map((item) => ({
    category: item.category,
    count: item.count,
  }));

  const priorityData = stats.priority_chart.map((item) => ({
    name: item.priority,
    value: item.count,
  }));

  const COLORS = [
    "#2563eb",
    "#22c55e",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
    "#06b6d4",
  ];

  return (
    <div>

      <div
        style={{
          background:
            "linear-gradient(135deg,#001845,#00509d)",
          color: "white",
          borderRadius: "28px",
          padding: "40px",
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
            color: "#dbeafe",
            marginTop: "12px",
            fontSize: "18px",
          }}
        >
          Executive Complaint Analytics Dashboard
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
          value={stats.total}
          color="#2563eb"
        />

        <Card
          title="Open"
          value={stats.open}
          color="#f59e0b"
        />

        <Card
          title="Resolved"
          value={stats.resolved}
          color="#22c55e"
        />

        <Card
          title="Critical"
          value={stats.critical}
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
            padding: "24px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2>Category Distribution</h2>

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
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2>Status Distribution</h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <PieChart>

              <Pie
                data={statusData}
                dataKey="value"
                label
                outerRadius={110}
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
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
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "24px",
        }}
      >

        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "24px",
            boxShadow:
              "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <h2>Priority Distribution</h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>

              <Pie
                data={priorityData}
                dataKey="value"
                label
                outerRadius={100}
              >
                {priorityData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
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
          <h2>Quick Summary</h2>

          <SummaryRow
            title="Assigned"
            value={stats.assigned}
          />

          <SummaryRow
            title="Unassigned"
            value={stats.unassigned}
          />

          <SummaryRow
            title="SLA Breached"
            value={stats.sla_breached}
          />

          <SummaryRow
            title="Critical"
            value={stats.critical}
          />

          <SummaryRow
            title="Resolved"
            value={stats.resolved}
          />

          <SummaryRow
            title="Open"
            value={stats.open}
          />

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "22px",
        padding: "24px",
        borderTop: `5px solid ${color}`,
        boxShadow:
          "0 10px 30px rgba(0,0,0,0.05)",
      }}
    >
      <p
        style={{
          color: "#64748b",
          marginBottom: "10px",
        }}
      >
        {title}
      </p>

      <h1
        style={{
          margin: 0,
          fontSize: "42px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function SummaryRow({ title, value }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "16px 0",
        borderBottom: "1px solid #e2e8f0",
        fontSize: "17px",
      }}
    >
      <strong>{title}</strong>

      <span>{value}</span>
    </div>
  );
}

export default Analytics;