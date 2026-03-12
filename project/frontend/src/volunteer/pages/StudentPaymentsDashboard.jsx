import { useState, useEffect } from "react";
import StudentPaymentsStats from "../components/StudentPaymentsStats";
import StudentPaymentsListTable from "../components/StudentPaymentsListTable";
import StudentPaymentFilters from "../components/StudentPaymentFilters";
import StudentPaymentCollectionForm from "../components/StudentPaymentCollectionForm";
import {
  getPaymentsDashboard,
  listPayments,
  getPaymentMeta,
} from "../api/studentPaymentsApi";

const StudentPaymentsDashboard = () => {
  const [showCollectForm, setShowCollectForm] = useState(false);

  const [stats, setStats] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loadingPayments, setLoadingPayments] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState(null);

  const [purposes, setPurposes] = useState([]);
  const [modes, setModes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [membershipPlans, setMembershipPlans] = useState([]);

  const [currentFilters, setCurrentFilters] = useState({});

  useEffect(() => {
    fetchDashboardData();
    fetchFilterOptions();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await getPaymentsDashboard();
      setStats(statsRes.stats);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const metaRes = await getPaymentMeta();

      setPurposes(metaRes.paymentPurposes || []);
      setModes(metaRes.paymentModes || []);
      setStatuses(metaRes.paymentStatuses || []);
      setMembershipPlans(metaRes.membershipPlans || []);
    } catch (err) {
      console.error("Error fetching filter options:", err);
    }
  };

  const loadPaymentsList = async (
    filters = {},
    currentPage = 1,
    sortCol = "",
    sortOrd = null,
  ) => {
    setLoadingPayments(true);
    try {
      const result = await listPayments({
        ...filters,
        page: currentPage,
        sortColumn: sortCol,
        sortOrder: sortOrd,
      });
      setPayments(result.payments || result.data || []);
      if (result.meta && result.meta.totalPages) {
        setTotalPages(result.meta.totalPages);
      } else if (result.totalPages) {
        setTotalPages(result.totalPages);
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Error loading payments list:", err);
    } finally {
      setLoadingPayments(false);
    }
  };

  useEffect(() => {
    loadPaymentsList(currentFilters, page, sortColumn, sortOrder);
  }, [currentFilters, page, sortColumn, sortOrder]);

  const handleFilterApply = (newFilters) => {
    setCurrentFilters(newFilters);
    setPage(1);
  };

  const handleCollectSuccess = (msg) => {
    setShowCollectForm(false);
    fetchDashboardData();
    loadPaymentsList(currentFilters);
    alert(msg);
  };

  const handleViewReceipt = (paymentId) => {
    alert(`View receipt for: ${paymentId}`);
  };

  const handleApprove = (paymentId) => {
    //TODO: approve payment
    console.log("Approve payment", paymentId);
  };

  const handleReject = (paymentId) => {
    //TODO: reject payment
    console.log("Reject payment", paymentId);
  };

  return (
    <div>
      <div>
        <h2>Student Payments Collection</h2>
        <button onClick={() => setShowCollectForm(!showCollectForm)}>
          {showCollectForm ? "Back to Dashboard" : "Collect Payment"}
        </button>
      </div>

      <hr />

      {showCollectForm ? (
        <StudentPaymentCollectionForm
          purposes={purposes}
          modes={modes}
          membershipPlans={membershipPlans}
          onSuccess={handleCollectSuccess}
          onCancel={() => setShowCollectForm(false)}
        />
      ) : (
        <>
          <StudentPaymentsStats stats={stats} />
          <hr />
          <StudentPaymentFilters
            paymentModes={modes}
            paymentStatuses={statuses}
            paymentPurposes={purposes}
            onFilter={handleFilterApply}
          />
          <hr />
          <StudentPaymentsListTable
            payments={payments}
            loading={loadingPayments}
            page={page}
            totalPages={totalPages}
            setPage={setPage}
            sortColumn={sortColumn}
            sortOrder={sortOrder}
            setSortColumn={setSortColumn}
            setSortOrder={setSortOrder}
            onViewReceipt={handleViewReceipt}
            onApprove={handleApprove}
            onReject={handleReject}
          />
        </>
      )}
    </div>
  );
};

export default StudentPaymentsDashboard;
