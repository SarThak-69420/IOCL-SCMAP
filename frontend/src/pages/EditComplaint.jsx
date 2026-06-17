import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState({
    complaint_id: "",
    title: "",
    description: "",
    category: "",
    priority: "",
    status: "",
    resolution_notes: "",
  });

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(
        `complaints/complaints/${id}/`
      );

      setComplaint(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setComplaint({
      ...complaint,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.put(
        `complaints/complaints/${id}/`,
        complaint
      );

      alert("Complaint updated successfully");

      navigate("/complaints");
    } catch (error) {
      console.error(error);
      alert("Update failed");
    }
  };

  const statusColor = {
    OPEN: "#f59e0b",
    ASSIGNED: "#3b82f6",
    IN_PROGRESS: "#8b5cf6",
    RESOLVED: "#10b981",
    CLOSED: "#64748b",
    ESCALATED: "#ef4444",
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "24px",
          padding: "35px",
          boxShadow: "0 12px 40px rgba(15,23,42,0.08)",
        }}
      >
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              margin: 0,
              color: "#0f172a",
              fontSize: "40px",
              fontWeight: "700",
            }}
          >
            Complaint Workflow
          </h1>

          <p
            style={{
              color: "#64748b",
              marginTop: "10px",
            }}
          >
            Review, assign and resolve complaints.
          </p>
        </div>

        <div
          style={{
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: "999px",
            color: "white",
            background:
              statusColor[complaint.status] || "#64748b",
            marginBottom: "25px",
            fontWeight: "600",
          }}
        >
          {complaint.status}
        </div>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label>Complaint ID</label>

              <input
                value={complaint.complaint_id}
                disabled
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                  background: "#f8fafc",
                  marginTop: "8px",
                }}
              />
            </div>

            <div>
              <label>Status</label>

              <select
                name="status"
                value={complaint.status}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                  marginTop: "8px",
                }}
              >
                <option value="OPEN">Open</option>
                <option value="ASSIGNED">Assigned</option>
                <option value="IN_PROGRESS">
                  In Progress
                </option>
                <option value="RESOLVED">
                  Resolved
                </option>
                <option value="CLOSED">
                  Closed
                </option>
                <option value="ESCALATED">
                  Escalated
                </option>
              </select>
            </div>

            <div>
              <label>Category</label>

              <select
                name="category"
                value={complaint.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                  marginTop: "8px",
                }}
              >
                <option value="SAFETY">Safety</option>
                <option value="MAINTENANCE">
                  Maintenance
                </option>
                <option value="OPERATIONS">
                  Operations
                </option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="FINANCE">
                  Finance
                </option>
                <option value="SECURITY">
                  Security
                </option>
                <option value="ENVIRONMENT">
                  Environment
                </option>
              </select>
            </div>

            <div>
              <label>Priority</label>

              <select
                name="priority"
                value={complaint.priority}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                  marginTop: "8px",
                }}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">
                  Medium
                </option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">
                  Critical
                </option>
              </select>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Title</label>

            <input
              name="title"
              value={complaint.title}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #dbe2ea",
                marginTop: "8px",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Description</label>

            <textarea
              name="description"
              value={complaint.description}
              onChange={handleChange}
              rows="5"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #dbe2ea",
                marginTop: "8px",
              }}
            />
          </div>

          <div style={{ marginTop: "20px" }}>
            <label>Resolution Notes</label>

            <textarea
              name="resolution_notes"
              value={complaint.resolution_notes || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Enter resolution details..."
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #dbe2ea",
                marginTop: "8px",
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              marginTop: "30px",
              background:
                "linear-gradient(135deg,#2563eb,#1d4ed8)",
              color: "white",
              border: "none",
              padding: "14px 30px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "15px",
            }}
          >
            Save Workflow Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditComplaint;