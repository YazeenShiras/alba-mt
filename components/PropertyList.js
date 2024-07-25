import React, { useState, useEffect, useContext } from "react";

import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import AuthContext from "../context/Authcontext";

import styles from "../styles/dashboard.module.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchProperties = async () => {
    await fetch(`http://localhost:5000/api/properties/${user._id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProperties(data.data);
        }
      });
  };

  const handleCreate = async (newProperty) => {
    fetch(`http://localhost:5000/api/properties/${user._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProperties([...properties, data.data]);
        }
      });
  };

  const handleUpdate = async (updatedProperty) => {
    await fetch(`http://localhost:5000/api/properties/${updatedProperty._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(updatedProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProperties(
            properties.map((property) =>
              property._id === updatedProperty._id ? data.data : property
            )
          );
          setSelectedProperty(null);
        }
      });
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/properties/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setProperties(properties.filter((property) => property._id !== id));
        }
      });
  };

  const handleLinkLead = async (propertyId, leadId) => {
    console.log(propertyId, leadId);
    await fetch(`http://localhost:5000/api/properties/linkLead`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        propertyId,
        leadId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          fetchProperties();
        }
      });
  };

  return (
    <div className={styles.list_outer}>
      <h2>Property Cards</h2>
      <PropertyForm
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        selectedProperty={selectedProperty}
      />
      <div className={styles.property_list}>
        {properties?.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onUpdate={setSelectedProperty}
            onDelete={handleDelete}
            onLinkLead={handleLinkLead}
          />
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
