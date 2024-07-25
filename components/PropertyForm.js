import React, { useState, useEffect, useContext } from "react";

import styles from "../styles/dashboard.module.css";
import AuthContext from "../context/Authcontext";

const communities = ["CommunityA", "CommunityB"];
const buildings = ["Building1", "Building2"];

const PropertyForm = ({ onCreate, onUpdate, selectedProperty }) => {
  const { user } = useContext(AuthContext);
  const [property, setProperty] = useState({
    community: "",
    building: "",
    unitNo: "",
    userId: user._id,
  });

  useEffect(() => {
    if (selectedProperty) {
      setProperty(selectedProperty);
    }
  }, [selectedProperty]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (property._id) {
      onUpdate(property);
    } else {
      onCreate(property);
    }
    setProperty({
      community: "",
      building: "",
      unitNo: "",
      userId: user._id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form_container}>
      <select
        name="community"
        value={property.community}
        onChange={handleChange}
      >
        <option value="">Select Community</option>
        {communities.map((community, index) => (
          <option key={index} value={community}>
            {community}
          </option>
        ))}
      </select>
      <select name="building" value={property.building} onChange={handleChange}>
        <option value="">Select Building</option>
        {buildings.map((building, index) => (
          <option key={index} value={building}>
            {building}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="unitNo"
        placeholder="Unit No"
        value={property.unitNo}
        onChange={handleChange}
      />
      <button className={styles.form_btn} type="submit">
        {property._id ? "Update" : "Create"}
      </button>
    </form>
  );
};

export default PropertyForm;
