import { useEffect, useState } from "react";
import api from "../services/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Reports() {
  const [complaints, setComplaints] = useState([]);

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
      console.error(error);
    }
  };

  const exportExcel = () => {
    const excelData = complaints.map((c) => ({
      ComplaintID: c.complaint_id,
      Title: c.title,
      Category: c.category,
      Priority: c.priority,
      Status: c.status,
      CreatedAt: c.created_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Complaints"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob(
      [excelBuffer],
      {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }
    );

    saveAs(file, "IOCL_Complaints_Report.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text(
      "IOCL Complaint Report",
      14,
      20
    );

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "Complaint ID",
          "Title",
          "Category",
          "Priority",
          "Status",
        ],
      ],
      body: complaints.map((c) => [
        c.complaint_id,
        c.title,
        c.category,
        c.priority,
        c.status,
      ]),
    });

    doc.save("IOCL_Complaints_Report.pdf");
  };

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
        Reports Center
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "30px",
        }}
      >
        Generate and export complaint reports.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        <button
          onClick={exportExcel}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Export Excel
        </button>

        <button
          onClick={exportPDF}
          style={{
            background: "#10b981",
            color: "white",
            border: "none",
            padding: "14px 24px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Export PDF
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
          background: "white",
          borderRadius: "20px",
          padding: "25px",
          boxShadow:
            "0 10px 30px rgba(15,23,42,0.08)",
        }}
      >
        <h3>Total Complaints: {complaints.length}</h3>
      </div>
    </div>
  );
}

export default Reports;