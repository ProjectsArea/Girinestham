import React, { useEffect, useState } from "react";
import { fetchContactInfo } from "../api/contactApi";
import Navbar from "../components/Navbar";

function Contact() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetchContactInfo().then(setData);
    }, []);

    if (!data) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <h1>Contact Us</h1>

            <p>Address: {data.officeAddress}</p>
            <p>Phone: {data.phone}</p>
            <p>Email: {data.email}</p>
            <p>Office Hours: {data.officeHours}</p>
        </div>
    );
}

export default Contact;