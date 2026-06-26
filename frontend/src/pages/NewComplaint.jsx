import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function NewComplaint() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "IT",
    priority: "MEDIUM",
    status: "OPEN",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const complaintResponse = await api.post(
        "complaints/complaints/",
        formData
      );

      const complaintId = complaintResponse.data.id;

      if (selectedFile) {
        const uploadData = new FormData();

        uploadData.append("file", selectedFile);

        await api.post(
          `complaints/complaints/${complaintId}/upload-attachment/`,
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Complaint created successfully");

      navigate("/complaints");
    } catch (error) {

  console.log(error);

  if (error.response) {

    console.log("Status:", error.response.status);
    console.log("Response:", error.response.data);

    alert(
      JSON.stringify(
        error.response.data,
        null,
        2
      )
    );

  } else {

    alert(error.message);

  }

}
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "24px",
          boxShadow: "0 10px 40px rgba(15,23,42,0.08)",
        }}
      >
        <h1
          style={{
            marginBottom: "10px",
            color: "#0f172a",
          }}
        >
          Create New Complaint
        </h1>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
          }}
        >
          Register a new complaint in the IOCL Complaint Management System
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label>Title</label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #dbe2ea",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Description</label>

            <textarea
              rows="6"
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              style={{
                width: "100%",
                marginTop: "8px",
                padding: "14px",
                borderRadius: "12px",
                border: "1px solid #dbe2ea",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label>Category</label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                }}
              >
                <option value="SAFETY">Safety</option>
                <option value="MAINTENANCE">Maintenance</option>
                <option value="OPERATIONS">Operations</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="FINANCE">Finance</option>
                <option value="SECURITY">Security</option>
                <option value="ENVIRONMENT">Environment</option>
              </select>
            </div>

            <div>
              <label>Priority</label>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  padding: "14px",
                  borderRadius: "12px",
                  border: "1px solid #dbe2ea",
                }}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: "30px" }}>
            <label>Upload Evidence</label>

            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
              style={{
                width: "100%",
                marginTop: "10px",
                padding: "12px",
                border: "1px solid #dbe2ea",
                borderRadius: "12px",
              }}
            />

            <p
              style={{
                color: "#64748b",
                fontSize: "13px",
                marginTop: "8px",
              }}
            >
              Upload screenshots, reports, PDFs or images
            </p>
          </div>

          <button
            type="submit"
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "14px 28px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Create Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewComplaint;