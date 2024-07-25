/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from "react";

import PropertyCard from "./PropertyCard";
import PropertyForm from "./PropertyForm";
import AuthContext from "../context/Authcontext";

import styles from "../styles/dashboard.module.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const { apiUrl, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const fetchProperties = async () => {
    await fetch(`${apiUrl}/api/properties/${user._id}`, {
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
    fetch(`${apiUrl}/api/properties/${user._id}`, {
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
    await fetch(`${apiUrl}/api/properties/${updatedProperty._id}`, {
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
    await fetch(`${apiUrl}/api/properties/${id}`, {
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
    await fetch(`${apiUrl}/api/properties/linkLead`, {
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
