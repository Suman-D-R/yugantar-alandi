"use client";

import React, { useState } from "react";

export default function TypeOfProperty() {
  const [propertyType, setPropertyType] = useState("");

  return (
    <div>
      <div className="mb-4">
        <select
          className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          title="Select the type of property"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option className="p-2" value="">Select</option>
          <option className="p-2" value="Residential">Residential</option>
          <option className="p-2" value="Commercial">Commercial</option>
          <option className="p-2" value="Industrial">Industrial</option>
        </select>
      </div>
      {propertyType === "Residential" && (
        <div>
          <label className="block font-medium">Residential Options</label>
          <select
            className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Select residential option"
          >
            <option className="p-2">Apartment</option>
            <option className="p-2">Bunglow</option>
          </select>
        </div>
      )}
      {propertyType === "Commercial" && (
        <div>
          <label className="block font-medium">Commercial Options</label>
          <select
            className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Select commercial option"
          >
            <option className="p-2">School</option>
            <option className="p-2">Shop</option>
            <option className="p-2">Office</option>
            <option className="p-2">Bank</option>
            <option className="p-2">Hotel</option>
            <option className="p-2">Gurukul</option>
            <option className="p-2">Spiritual Centre</option>
            <option className="p-2">Mangal Karyalaya</option>
            <option className="p-2">Hotel with Lodging</option>
            <option className="p-2">Hospital</option>
          </select>
        </div>
      )}
      {propertyType === "Industrial" && (
        <div>
          <label className="block font-medium">Type of Industry</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Enter the type of industry"
          />
        </div>
      )}
    </div>
  );
}
