/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";

import styles from "../styles/dashboard.module.css";
import AuthContext from "@/context/Authcontext";

const PropertyCard = ({ property, onUpdate, onDelete, onLinkLead }) => {
  const [leads, setLeads] = useState([]);
  const [leadId, setLeadId] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchCustomers();
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

  return (
    <div className={styles.property_card}>
      <p>Community: {property.community}</p>
      <p>Building: {property.building}</p>
      <p>Unit No: {property.unitNo}</p>
      <div className={styles.btn_container}>
        <button className={styles.card_btn} onClick={() => onUpdate(property)}>
          Update
        </button>
        <button
          className={styles.card_btn}
          onClick={() => onDelete(property._id)}
        >
          Delete
        </button>
      </div>
      {property.linkedLeads ? (
        <div className={styles.linkedLeads_container}>
          <h4>Linked Lead: </h4>
          <p>Name:{property.linkedLeads.name}</p>
          <p>Contact info:{property.linkedLeads.contactInfo}</p>
        </div>
      ) : (
        <div className={styles.row_button}>
          <select
            name="leads"
            value={leadId}
            onChange={(e) => setLeadId(e.target.value)}
            className={styles.select_container}
          >
            <option>Link Lead to Property</option>
            {leads.map((lead, index) => (
              <option key={index} value={lead._id}>
                {lead.name} - {lead.contactInfo}
              </option>
            ))}
          </select>
          <button
            className={styles.card_btn}
            onClick={() => onLinkLead(property._id, leadId)}
          >
            Link
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
