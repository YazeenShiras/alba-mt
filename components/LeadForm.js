import { useState, useEffect } from "react";

import styles from "../styles/dashboard.module.css";

const LeadForm = ({ onCreate, onUpdate, selectedCustomer }) => {
  const [customer, setCustomer] = useState({ name: "", contactInfo: "" });

  useEffect(() => {
    if (selectedCustomer) {
      setCustomer(selectedCustomer);
    }
  }, [selectedCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (customer._id) {
      onUpdate(customer);
    } else {
      onCreate(customer);
    }
    setCustomer({ name: "", contactInfo: "" });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customer.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="contactInfo"
        placeholder="Contact Info (email/phone)"
        value={customer.contactInfo}
        onChange={handleChange}
      />
      <button className={styles.form_btn} type="submit">
        {customer._id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default LeadForm;
