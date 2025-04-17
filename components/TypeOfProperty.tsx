"use client";

import React, { useState } from "react";

export default function TypeOfProperty() {
  const [propertyType, setPropertyType] = useState("");

  return (
    <div>
      <div className="mb-4">
      <label className="block font-medium">Type of Property</label>
      <select
        className="w-full border border-gray-300 rounded-md p-2"
        title="Select the type of property"
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
      >
        <option value="">Select</option>
        <option value="Residential">Residential</option>
        <option value="Commercial">Commercial</option>
        <option value="Industrial">Industrial</option>
      </select>
      </div>
      {propertyType === "Residential" && (
        <div>
          <label className="block font-medium">Residential Options</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            title="Select residential option"
          >
            <option>Apartment</option>
            <option>Bunglow</option>
          </select>
        </div>
      )}
      {propertyType === "Commercial" && (
        <div>
          <label className="block font-medium">Commercial Options</label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            title="Select commercial option"
          >
            <option>School</option>
            <option>Shop</option>
            <option>Office</option>
            <option>Bank</option>
            <option>Hotel</option>
            <option>Gurukul</option>
            <option>Spiritual Centre</option>
            <option>Mangal Karyalaya</option>
            <option>Hotel with Lodging</option>
            <option>Hospital</option>
          </select>
        </div>
      )}
      {propertyType === "Industrial" && (
        <div>
          <label className="block font-medium">Type of Industry</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            title="Enter the type of industry"
          />
        </div>
      )}
    </div>
  );
}
