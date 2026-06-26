import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();

  const [complaint, setComplaint] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const currentUser = {
    username: "Admin",
    role: "ADMIN",
  };

  useEffect(() => {
    fetchComplaint();
    fetchUsers();
  }, [id]);

  const fetchComplaint = async () => {
    try {
      const response = await api.get(
        `complaints/complaints/${id}/`
      );

      setComplaint(response.data);
      setResolutionNotes(
        response.data.resolution_notes || ""
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get(
        "users/users/"
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const assignComplaint = async () => {
    if (
      complaint.status === "RESOLVED" ||
      complaint.status === "CLOSED"
    ) {
      alert(
        "Resolved complaints cannot be reassigned"
      );
      return;
    }

    if (!selectedUser) {
      alert("Please select a user");
      return;
    }

    try {
      await api.patch(
        `complaints/complaints/${id}/`,
        {
          assigned_to: selectedUser,
          status: "ASSIGNED",
        }
      );

      alert("Complaint assigned successfully");
      fetchComplaint();
    } catch (error) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(
    JSON.stringify(
      error.response?.data,
      null,
      2
    )
  );
}
  };

  const updateStatus = async (newStatus) => {
    try {
      await api.patch(
        `complaints/complaints/${id}/`,
        {
          status: newStatus,
        }
      );

      alert(`Status updated to ${newStatus}`);
      fetchComplaint();
    } catch (error) {
      console.error(error);
      alert("Status update failed");
    }
  };

  const saveResolutionNotes = async () => {
    try {
      await api.patch(
        `complaints/complaints/${id}/`,
        {
          resolution_notes: resolutionNotes,
        }
      );

      alert("Resolution notes saved");
      fetchComplaint();
    } catch (error) {
      console.error(error);
      alert("Failed to save notes");
    }
  };
  const uploadAttachment = async () => {
  if (!selectedFile) {
    alert("Please select a file");
    return;
  }

  try {
    const formData = new FormData();

    formData.append("file", selectedFile);

    await api.post(
      `complaints/complaints/${id}/upload-attachment/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Attachment uploaded successfully");

    setSelectedFile(null);

    fetchComplaint();
  } catch (error) {
    console.error(error);
    console.log(error.response?.data);

    alert("Upload failed");
  }
};

  if (!complaint) {
    return <h2>Loading...</h2>;
  }

  const isBreached =
    complaint.sla_deadline &&
    new Date(complaint.sla_deadline) < new Date() &&
    complaint.status !== "RESOLVED" &&
    complaint.status !== "CLOSED";

  return (
    <div style={{ padding: "30px" }}>
      <h1
        style={{
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "20px",
          color: "#0f172a",
        }}
      >
        Complaint Details
      </h1>

      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow:
            "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <p>
          <strong>Complaint ID:</strong>{" "}
          {complaint.complaint_id}
        </p>

        <p>
          <strong>Title:</strong> {complaint.title}
        </p>

        <p>
          <strong>Description:</strong>{" "}
          {complaint.description}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {complaint.category}
        </p>

        <p>
          <strong>Priority:</strong>{" "}
          {complaint.priority}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {complaint.status}
        </p>

        <p>
          <strong>Created By:</strong>{" "}
          {complaint.created_by_username}
        </p>

        <p>
          <strong>Assigned To:</strong>{" "}
          {complaint.assigned_to_username ||
            "Unassigned"}
        </p>

        <p>
          <strong>SLA Status:</strong>{" "}
          {complaint.sla_deadline ? (
            isBreached ? (
              <span
                style={{
                  color: "#ef4444",
                  fontWeight: "700",
                }}
              >
                🔴 SLA Breached
              </span>
            ) : (
              <span
                style={{
                  color: "#10b981",
                  fontWeight: "700",
                }}
              >
                🟢 Within SLA
              </span>
            )
          ) : (
            <span
              style={{
                color: "#64748b",
                fontWeight: "600",
              }}
            >
              No SLA Defined
            </span>
          )}
        </p>

        <p>
          <strong>SLA Deadline:</strong>{" "}
          {complaint.sla_deadline
            ? new Date(
                complaint.sla_deadline
              ).toLocaleString()
            : "Not Set"}
        </p>

        {["ADMIN", "MANAGER"].includes(
          currentUser.role
        ) && (
          <>
            <hr
              style={{
                margin: "25px 0",
                border: "none",
                borderTop:
                  "1px solid #e5e7eb",
              }}
            />

            <h3>Assign Complaint</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <select
                value={selectedUser}
                onChange={(e) =>
                  setSelectedUser(
                    e.target.value
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border:
                    "1px solid #d1d5db",
                  minWidth: "250px",
                }}
              >
                <option value="">
                  Select Officer
                </option>

                {users
                  .filter(
                    (user) =>
                      user.role ===
                        "OFFICER" ||
                      user.role ===
                        "MANAGER"
                  )
                  .map((user) => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.username} (
                      {user.role})
                    </option>
                  ))}
              </select>

              <button
                onClick={assignComplaint}
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Assign
              </button>
            </div>

            <hr
              style={{
                margin: "25px 0",
                border: "none",
                borderTop:
                  "1px solid #e5e7eb",
              }}
            />

            <h3>Resolution Notes</h3>

            <textarea
              rows="5"
              value={resolutionNotes}
              onChange={(e) =>
                setResolutionNotes(
                  e.target.value
                )
              }
              placeholder="Enter resolution details..."
              style={{
                width: "100%",
                marginTop: "12px",
                padding: "12px",
                borderRadius: "8px",
                border:
                  "1px solid #d1d5db",
              }}
            />

            <button
              onClick={saveResolutionNotes}
              style={{
                marginTop: "12px",
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Save Notes
            </button>

            <hr
              style={{
                margin: "25px 0",
                border: "none",
                borderTop:
                  "1px solid #e5e7eb",
              }}
            />
            <hr
  style={{
    margin: "25px 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  }}
/>

<h3>Activity Timeline</h3>
<h3>Attachments</h3>

<div
  style={{
    marginTop: "15px",
    display: "flex",
    gap: "10px",
    alignItems: "center",
  }}
>
  <input
    type="file"
    onChange={(e) =>
      setSelectedFile(e.target.files[0])
    }
  />

  <button
    onClick={uploadAttachment}
    style={{
      background: "#2563eb",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Upload
  </button>
</div>

<div style={{ marginTop: "20px" }}>
  {complaint.attachments?.length > 0 ? (
    complaint.attachments.map(
      (attachment) => (
        <div
          key={attachment.id}
          style={{
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          <a
            href={`http://127.0.0.1:8000${attachment.file}`}
            target="_blank"
            rel="noreferrer"
          >
            {attachment.file.split("/").pop()}
          </a>
        </div>
      )
    )
  ) : (
    <p>No attachments uploaded</p>
  )}
</div>

<hr
  style={{
    margin: "25px 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  }}
/>

<div style={{ marginTop: "15px" }}>
  {complaint.history?.length > 0 ? (
    complaint.history.map((item) => (
      <div
        key={item.id}
        style={{
          padding: "12px",
          marginBottom: "10px",
          borderLeft: "4px solid #2563eb",
          background: "#f8fafc",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            fontWeight: "600",
            color: "#0f172a",
          }}
        >
          {item.action}
        </div>

        <div
          style={{
            fontSize: "14px",
            color: "#64748b",
            marginTop: "4px",
          }}
        >
          By {item.performed_by_username} •{" "}
          {new Date(item.created_at).toLocaleString()}
        </div>
      </div>
    ))
  ) : (
    <p>No history available</p>
  )}
</div>

<hr
  style={{
    margin: "25px 0",
    border: "none",
    borderTop: "1px solid #e5e7eb",
  }}
/>

            <h3>Status Workflow</h3>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "15px",
                flexWrap: "wrap",
              }}
            >
              {complaint.status ===
                "ASSIGNED" && (
                <button
                  onClick={() =>
                    updateStatus(
                      "IN_PROGRESS"
                    )
                  }
                  style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Start Work
                </button>
              )}

              {complaint.status ===
                "IN_PROGRESS" && (
                <button
                  onClick={() => {
                    if (
                      !resolutionNotes.trim()
                    ) {
                      alert(
                        "Please enter resolution notes before resolving the complaint"
                      );
                      return;
                    }

                    updateStatus(
                      "RESOLVED"
                    );
                  }}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Resolve Complaint
                </button>
              )}

              {complaint.status ===
                "RESOLVED" && (
                <button
                  onClick={() =>
                    updateStatus(
                      "CLOSED"
                    )
                  }
                  style={{
                    background: "#64748b",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Close Complaint
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}


export default ComplaintDetails;