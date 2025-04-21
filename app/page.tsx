'use client';

import { useState } from "react";
import TypeOfProperty from "../components/TypeOfProperty";
import WaterConnectionSelection from "../components/WaterConnectionSelection";
import ImageUploader from "../components/ImageUploader";

export default function Home() {
  const [wardNo, setWardNo] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [residentName, setResidentName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [address, setAddress] = useState("");
  const [households, setHouseholds] = useState<number | null>(null);
  const [propertyType, setPropertyType] = useState("");
  const [hasWaterConnection, setHasWaterConnection] = useState<string | null>(null);
  const [authorizedConnections, setAuthorizedConnections] = useState<number>(0);
  const [authorizedDiameters, setAuthorizedDiameters] = useState<string[]>([]);
  const [propertyPhoto, setPropertyPhoto] = useState<File | null>(null);
  const [pipelinePhoto, setPipelinePhoto] = useState<File | null>(null);
  const [waterTaxBill, setWaterTaxBill] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("wardNo", wardNo);
    formData.append("houseNo", houseNo);
    formData.append("residentName", residentName);
    formData.append("mobileNo", mobileNo);
    formData.append("address", address);
    formData.append("households", households?.toString() || "");
    formData.append("propertyType", propertyType);
    formData.append(
      "waterConnection",
      JSON.stringify({ hasWaterConnection, authorizedConnections, authorizedDiameters })
    );
    if (propertyPhoto) formData.append("propertyPhoto", propertyPhoto);
    if (pipelinePhoto) formData.append("pipelinePhoto", pipelinePhoto);
    if (waterTaxBill) formData.append("waterTaxBill", waterTaxBill);

    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Form submitted successfully!");
    } else {
      alert("Failed to submit the form.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          आलंदी नगरपरिषद, आलंदी
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium mb-1">Ward No</label>
            <input
              type="text"
              value={wardNo}
              onChange={(e) => setWardNo(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the ward number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">House No</label>
            <input
              type="text"
              value={houseNo}
              onChange={(e) => setHouseNo(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the house number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Name of Resident</label>
            <input
              type="text"
              value={residentName}
              onChange={(e) => setResidentName(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the name of the resident"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile No</label>
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the mobile number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the address"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Total Number of Households</label>
            <input
              type="number"
              value={households || ""}
              onChange={(e) => setHouseholds(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the total number of households"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Type of Property</label>
            <TypeOfProperty onChange={(value) => setPropertyType(value)} />
          </div>
          <div>
            <WaterConnectionSelection
              onChange={({ hasWaterConnection, authorizedConnections, authorizedDiameters }) => {
                setHasWaterConnection(hasWaterConnection);
                setAuthorizedConnections(authorizedConnections);
                setAuthorizedDiameters(authorizedDiameters);
              }}
            />
          </div>
          <ImageUploader
            label="Take a Photo of the Property"
            title="Please use your device's camera to capture a photo of the property and upload it here."
            onChange={(e) => setPropertyPhoto(e.target.files?.[0] || null)}
          />
          <ImageUploader
            label="Take a Photo of the Water Pipeline"
            title="Please use your device's camera to capture a photo of the water pipeline and upload it here."
            onChange={(e) => setPipelinePhoto(e.target.files?.[0] || null)}
          />
          <ImageUploader
            label="Upload Water Tax Bill"
            title="Upload the water tax bill"
            onChange={(e) => setWaterTaxBill(e.target.files?.[0] || null)}
          />
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-800 text-white font-semibold py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
