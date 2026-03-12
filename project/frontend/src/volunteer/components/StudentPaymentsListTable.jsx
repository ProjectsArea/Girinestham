import { useState } from "react";
import Dialog from "./Dialog";

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
  onViewReceipt,
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
                <button onClick={() => handleView(payment)}>View</button>
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
        {/* TODO: show receipt details instead of duplicate table data */}
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
