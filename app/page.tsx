'use client';

import { useState } from "react";
import TypeOfProperty from "../components/TypeOfProperty";
import WaterConnectionSelection from "../components/WaterConnectionSelection";
import ImageUploader from "../components/ImageUploader";

export default function Home() {
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("-");
  const [longitude, setLongitude] = useState("-");

  const handlePhotoCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Placeholder for photo processing logic
      const extractedAddress = "Extracted Address"; // Replace with actual logic
      const extractedLatitude = "Extracted Latitude"; // Replace with actual logic
      const extractedLongitude = "Extracted Longitude"; // Replace with actual logic

      setAddress(extractedAddress);
      setLatitude(extractedLatitude);
      setLongitude(extractedLongitude);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6">
          आलंदी नगरपरिषद, आलंदी
        </h1>
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Ward No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the ward number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">House No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the house number"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Name of Resident</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the name of the resident"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Mobile No</label>
            <input
              type="text"
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
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Enter the total number of households"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Type of Property</label>
            <TypeOfProperty />
          </div>
          <div>
            <WaterConnectionSelection />
          </div>
          <ImageUploader
            label="Take a Photo of the Property"
            title="Please use your device's camera to capture a photo of the property and upload it here."
            onChange={handlePhotoCapture}
          />
          <ImageUploader
            label="Take a Photo of the Water Pipeline"
            title="Please use your device's camera to capture a photo of the water pipeline and upload it here."
            onChange={() => {}}
          />
          <ImageUploader
            label="Upload Water Tax Bill"
            title="Upload the water tax bill"
            onChange={() => {}}
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
