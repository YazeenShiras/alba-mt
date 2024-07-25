import React from "react";

import styles from "../styles/dashboard.module.css";

const LeadCard = ({ customer }) => {
  return (
    <div className={styles.property_card}>
      <h3>{customer.name}</h3>
      <p>Contact Info: {customer.contactInfo}</p>
    </div>
  );
};

export default LeadCard;
