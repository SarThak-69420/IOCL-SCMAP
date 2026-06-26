import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Complaints() {
    const navigate = useNavigate();

    const [complaints, setComplaints] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            const response = await api.get("complaints/complaints/");

            const data = Array.isArray(response.data)
                ? response.data
                : response.data.results || [];

            setComplaints(data);
        } catch (error) {
            console.error("Failed to load complaints:", error);
            setComplaints([]);
        }
    };

    const filteredComplaints = complaints.filter((c) => {
        const matchesSearch =
            (c.title || "").toLowerCase().includes(search.toLowerCase()) ||
            (c.complaint_id || "").toLowerCase().includes(search.toLowerCase());

        const matchesStatus =
            statusFilter === "ALL" || c.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case "OPEN":
                return "#f59e0b";
            case "ASSIGNED":
                return "#3b82f6";
            case "IN_PROGRESS":
                return "#8b5cf6";
            case "RESOLVED":
                return "#10b981";
            case "ESCALATED":
                return "#ef4444";
            case "CLOSED":
                return "#64748b";
            default:
                return "#64748b";
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <h1
                    style={{
                        fontSize: "42px",
                        fontWeight: "700",
                        color: "#0f172a",
                    }}
                >
                    Complaints Management
                </h1>

                <button
                    onClick={() => navigate("/new-complaint")}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    + New Complaint
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "20px",
                }}
            >
                <input
                    type="text"
                    placeholder="Search complaints..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        padding: "10px",
                        width: "300px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                    }}
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #d1d5db",
                    }}
                >
                    <option value="ALL">All Status</option>
                    <option value="OPEN">Open</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="ESCALATED">Escalated</option>
                    <option value="CLOSED">Closed</option>
                </select>
            </div>

            <div
                style={{
                    background: "white",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
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
                            <th style={{ padding: "14px" }}>Complaint ID</th>
                            <th style={{ padding: "14px" }}>Title</th>
                            <th style={{ padding: "14px" }}>Category</th>
                            <th style={{ padding: "14px" }}>Priority</th>
                            <th style={{ padding: "14px" }}>Status</th>
                            <th style={{ padding: "14px" }}>Assigned To</th>
                            <th style={{ padding: "14px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredComplaints.length > 0 ? (
                            filteredComplaints.map((c) => (
                                <tr key={c.id}>
                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        {c.complaint_id}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        {c.title}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        {c.category}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        {c.priority}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        <span
                                            style={{
                                                background: getStatusColor(c.status),
                                                color: "white",
                                                padding: "6px 12px",
                                                borderRadius: "999px",
                                                fontSize: "12px",
                                                fontWeight: "600",
                                            }}
                                        >
                                            {c.status}
                                        </span>
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        {c.assigned_to_username ? (
                                            <span
                                                style={{
                                                    color: "#0f172a",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {c.assigned_to_username}
                                            </span>
                                        ) : (
                                            <span
                                                style={{
                                                    color: "#94a3b8",
                                                    fontStyle: "italic",
                                                }}
                                            >
                                                Unassigned
                                            </span>
                                        )}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom: "1px solid #e5e7eb",
                                        }}
                                    >
                                        <button
                                            onClick={() => navigate(`/complaints/${c.id}`)}
                                            style={{
                                                marginRight: "8px",
                                                padding: "6px 12px",
                                                border: "none",
                                                background: "#10b981",
                                                color: "white",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/complaints/${c.id}/edit`)
                                            }
                                            style={{
                                                marginRight: "8px",
                                                padding: "6px 12px",
                                                border: "none",
                                                background: "#f59e0b",
                                                color: "white",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={async () => {
                                                const confirmed = window.confirm(
                                                    `Delete ${c.complaint_id}?`
                                                );

                                                if (!confirmed) return;

                                                try {
                                                    await api.delete(
                                                        `complaints/complaints/${c.id}/`
                                                    );

                                                    fetchComplaints();

                                                    alert("Complaint deleted successfully");
                                                } catch (error) {
                                                    console.error(error);
                                                    alert("Delete failed");
                                                }
                                            }}
                                            style={{
                                                padding: "6px 12px",
                                                border: "none",
                                                background: "#ef4444",
                                                color: "white",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="7"
                                    style={{
                                        textAlign: "center",
                                        padding: "30px",
                                        color: "#6b7280",
                                    }}
                                >
                                    No complaints found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Complaints;