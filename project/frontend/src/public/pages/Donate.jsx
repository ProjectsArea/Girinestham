import React, { useEffect, useState } from "react";
import { fetchDonateInfo } from "../api/donateApi";
import Navbar from "../components/Navbar";

function Donate() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDonateInfo().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1>Donate & Support Us</h1>

      <p>{data.donationMessage}</p>

      <h2>Bank Details</h2>
      <p>Account Name: {data.bankDetails.accountName}</p>
      <p>Bank: {data.bankDetails.bankName}</p>
      <p>Account No: {data.bankDetails.accountNumber}</p>
      <p>IFSC: {data.bankDetails.ifscCode}</p>

      <h2>UPI</h2>
      <p>{data.upiId}</p>
    </div>
  );
}

export default Donate;