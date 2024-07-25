/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";

import LeadForm from "./LeadForm";
import LeadCard from "./LeadCard";
import AuthContext from "../context/Authcontext";

import styles from "../styles/dashboard.module.css";

const LeadList = () => {
  const [leads, setLeads] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { apiUrl, user, refresh, setRefresh } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchCustomers();
    }
  }, [refresh]);

  const fetchCustomers = async () => {
    await fetch(`${apiUrl}/api/leads/${user._id}`, {
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
    fetch(`${apiUrl}/api/leads/${user._id}`, {
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
          setRefresh(!refresh);
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
