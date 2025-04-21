'use client';

import { useState } from "react";
import { SubmissionPayload } from "../types/submission"; // Use SubmissionPayload for form data

import TypeOfProperty from "../components/TypeOfProperty";
import WaterConnectionSelection from "../components/WaterConnectionSelection";
import ImageUploader from "../components/ImageUploader";

export default function Home() {
  const [formData, setFormData] = useState<SubmissionPayload>({
    wardNo: "",
    houseNo: "",
    residentName: "",
    mobileNo: "",
    address: "",
    households: 0,
    propertyType: "",
    waterConnection: {
      hasWaterConnection: false,
      authorizedConnections: 0,
      authorizedDiameters: [],
    },
    propertyPhoto: null,
    pipelinePhoto: null,
    waterTaxBill: null,
  });

  const [loading, setLoading] = useState(false); // Spinner state

  const validateForm = () => {
    if (!formData.wardNo || !formData.houseNo || !formData.residentName || !formData.mobileNo || !formData.address) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (formData.households <= 0) {
      alert("Households must be greater than 0.");
      return false;
    }
    if (!formData.propertyType) {
      alert("Please select a property type.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); // Show spinner
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "waterConnection") {
        payload.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        payload.append(key, value);
      } else {
        payload.append(key, value as string);
      }
    });

    const response = await fetch("/api/submit", {
      method: "POST",
      body: payload,
    });

    setLoading(false); // Hide spinner

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
              value={formData.wardNo}
              onChange={(e) => setFormData({ ...formData, wardNo: e.target.value })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the ward number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">House No</label>
            <input
              type="text"
              value={formData.houseNo}
              onChange={(e) => setFormData({ ...formData, houseNo: e.target.value })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the house number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Name of Resident</label>
            <input
              type="text"
              value={formData.residentName}
              onChange={(e) => setFormData({ ...formData, residentName: e.target.value })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the name of the resident"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile No</label>
            <input
              type="text"
              value={formData.mobileNo}
              onChange={(e) => setFormData({ ...formData, mobileNo: e.target.value })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the mobile number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the address"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Total Number of Households</label>
            <input
              type="number"
              value={formData.households || ""}
              onChange={(e) => setFormData({ ...formData, households: Number(e.target.value) })}
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the total number of households"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Type of Property</label>
            <TypeOfProperty onChange={(value) => setFormData({ ...formData, propertyType: value })} />
          </div>
          <div>
            <WaterConnectionSelection
              onChange={({ hasWaterConnection, authorizedConnections, authorizedDiameters }) => {
                setFormData({
                  ...formData,
                  waterConnection: { hasWaterConnection, authorizedConnections, authorizedDiameters },
                });
              }}
            />
          </div>
          <ImageUploader
            label="Take a Photo of the Property"
            title="Please use your device's camera to capture a photo of the property and upload it here."
            onChange={(e) => setFormData({ ...formData, propertyPhoto: e.target.files?.[0] || null })}
          />
          <ImageUploader
            label="Take a Photo of the Water Pipeline"
            title="Please use your device's camera to capture a photo of the water pipeline and upload it here."
            onChange={(e) => setFormData({ ...formData, pipelinePhoto: e.target.files?.[0] || null })}
          />
          <ImageUploader
            label="Upload Water Tax Bill"
            title="Upload the water tax bill"
            onChange={(e) => setFormData({ ...formData, waterTaxBill: e.target.files?.[0] || null })}
          />
          <div className="text-center">
            <button
              type="submit"
              className={`w-full bg-blue-800 text-white font-semibold py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Submitting...</span>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
