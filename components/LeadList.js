import React, { useState, useEffect, useContext } from "react";
import LeadForm from "./LeadForm";
import LeadCard from "./LeadCard";
import AuthContext from "../context/Authcontext";

import styles from "../styles/dashboard.module.css";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCustomers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomers = async () => {
    await fetch(`http://localhost:5000/api/leads/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLeads(data.data);
        }
      });
  };

  const handleCreate = async (newlead) => {
    fetch(`http://localhost:5000/api/leads/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newlead),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setLeads([...leads, data.data]);
        }
      });
  };

  return (
    <div className={styles.list_outer}>
      <h2>Leads</h2>
      <LeadForm onCreate={handleCreate} selectedCustomer={selectedCustomer} />
      <div className={styles.property_list}>
        {leads.map((customer) => (
          <LeadCard key={customer._id} customer={customer} />
        ))}
      </div>
    </div>
  );
};

export default LeadList;
