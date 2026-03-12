import { useState } from "react";
import Dialog from "./Dialog";
import jsPDF from "jspdf";
import { Download, Eye } from "lucide-react";

const COLUMNS = [
  { prop: "receipt_no", Label: "Receipt No", sortable: true },
  { prop: "student_name", Label: "Student Name", sortable: true },
  { prop: "purpose_name", Label: "Purpose" },
  { prop: "payment_type", Label: "Payment Mode", sortable: true },
  { prop: "amount", Label: "Amount", sortable: true },
  { prop: "status_name", Label: "Status" },
  { prop: "payment_decision", Label: "Decision" },
  { prop: "payment_date", Label: "Date", sortable: true },
];

const StudentPaymentsListTable = ({
  payments,
  loading,
  page,
  totalPages,
  setPage,
  sortColumn,
  sortOrder,
  setSortColumn,
  setSortOrder,
  onApprove,
  onReject,
}) => {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleView = (payment) => {
    setSelectedPayment(payment);
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
    setSelectedPayment(null);
  };

  const buildReceiptPdf = (payment) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Payment Receipt", 20, 20);

    doc.setFontSize(11);
    doc.text(`Receipt No: ${payment.receipt_no || "N/A"}`, 20, 40);
    doc.text(`Student Name: ${payment.student_name || "N/A"}`, 20, 50);
    doc.text(`Purpose: ${payment.purpose_name || "N/A"}`, 20, 60);
    doc.text(`Mode: ${payment.payment_type || "N/A"}`, 20, 70);
    doc.text(`Amount: ${payment.amount || "N/A"}`, 20, 80);
    doc.text(`Status: ${payment.payment_status || "N/A"}`, 20, 90);
    doc.text(`Payment Date: ${payment.payment_date || "N/A"}`, 20, 100);
    doc.setLineWidth(0.5);
    doc.line(20, 120, 190, 120);
    doc.setFontSize(10);

    return doc;
  };

  const handleOpenReceiptPdf = (payment) => {
    const doc = buildReceiptPdf(payment);
    const pdfBlobUrl = doc.output("bloburl");
    window.open(pdfBlobUrl, "_blank");
  };

  const handleDownloadReceipt = (payment) => {
    const doc = buildReceiptPdf(payment);
    doc.save(
      `receipt_${payment.receipt_no || payment.id}_${payment.student_name}.pdf`,
    );
  };

  if (loading) {
    return <div>Loading payments data...</div>;
  }

  if (!payments || payments.length === 0) {
    return <div>No payment records yet.</div>;
  }

  return (
    <div>
      <table border="1">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <th
                key={column.prop}
                onClick={() => {
                  if (column.sortable) {
                    if (sortColumn !== column.prop) {
                      setSortColumn(column.prop);
                      setSortOrder("ASC");
                    } else if (sortOrder === "ASC") {
                      setSortOrder("DESC");
                    } else if (sortOrder === "DESC") {
                      setSortColumn(null);
                      setSortOrder(null);
                    } else {
                      setSortOrder("ASC");
                    }
                  }
                }}
              >
                {column.Label}
                {sortColumn === column.prop && (
                  <span>{sortOrder === "ASC" ? " ▲" : " ▼"}</span>
                )}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.receipt_no || "N/A"}</td>
              <td>{payment.student_name}</td>
              <td>{payment.purpose_name}</td>
              <td>{payment.payment_type}</td>
              <td>{payment.amount}</td>
              <td>{payment.payment_status}</td>
              <td>{payment.payment_decision}</td>
              <td>{payment.payment_date}</td>
              <td>
                <button onClick={() => handleOpenReceiptPdf(payment)}>
                  <Eye size={16} />
                </button>
                {/* INFO: These actions are shown for every users.
                    TODO: only admins should see these actions.
                  */}
                {payment.payment_status === "pending" && (
                  <>
                    <button
                      onClick={() => onApprove(payment.id)}
                      disabled={payment.payment_mode === "online"}
                    >
                      Approve
                    </button>
                    <button onClick={() => onReject(payment.id)}>Reject</button>
                  </>
                )}
                <button onClick={() => handleDownloadReceipt(payment)}>
                  <Download size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {page} of {totalPages || 1}
        </span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next
        </button>
      </div>

      <Dialog
        open={openDialog}
        title="Payment Details"
        onClose={() => setOpenDialog(false)}
      >
        {/* TODO: show complete receipt details */}
        {selectedPayment && (
          <div>
            <p>
              <b>Receipt No:</b> {selectedPayment.receipt_no}
            </p>
            <p>
              <b>Student:</b> {selectedPayment.student_name}
            </p>
            <p>
              <b>Purpose:</b> {selectedPayment.purpose_name}
            </p>
            <p>
              <b>Amount:</b> {selectedPayment.amount}
            </p>
            <p>
              <b>Status:</b> {selectedPayment.payment_status}
            </p>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default StudentPaymentsListTable;
