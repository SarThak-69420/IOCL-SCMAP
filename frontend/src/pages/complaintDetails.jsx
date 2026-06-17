import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ComplaintDetails() {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    api
      .get(`complaints/complaints/${id}/`)
      .then((response) => {
        setComplaint(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!complaint) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Complaint Details</h1>

      <div
        style={{
          background: "white",
          padding: "25px",
          borderRadius: "12px",
          marginTop: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        <p><strong>Complaint ID:</strong> {complaint.complaint_id}</p>
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Description:</strong> {complaint.description}</p>
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Status:</strong> {complaint.status}</p>
      </div>
    </div>
  );
}

export default ComplaintDetails;