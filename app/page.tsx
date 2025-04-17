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
      // Extract address, latitude, and longitude from the photo
      const extractedAddress = "Extracted Address"; // Replace with actual logic
      const extractedLatitude = "Extracted Latitude"; // Replace with actual logic
      const extractedLongitude = "Extracted Longitude"; // Replace with actual logic

      setAddress(extractedAddress);
      setLatitude(extractedLatitude);
      setLongitude(extractedLongitude);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-4">
          आलंदी नगरपरिषद, आलंदी
        </h1>
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Ward No</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                title="Enter the ward number"
              />
            </div>
            <div>
              <label className="block font-medium">House No</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                title="Enter the house number"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium">Name of Resident</label>
            <input
              type="text" 
              className="w-full border border-gray-300 rounded-md p-2"
              title="Enter the name of the resident"
            />
          </div>
          <div>
            <label className="block font-medium">Mobile No</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              title="Enter the mobile number"
            />
          </div>
          <div>
            <label className="block font-medium">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              title="Enter the address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Latitude</label>
              <p className="w-full rounded-md p-2">
                {latitude}
              </p>
            </div>
            <div>
              <label className="block font-medium">Longitude</label>
              <p className="w-full rounded-md p-2">
                {longitude}
              </p>
            </div>
          </div>
          <div>
            <label className="block font-medium">
              Total Number of Households
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2"
              title="Enter the total number of households"
            />
          </div>
          <div>
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
              className="w-[80%] mt-5 bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );                                                                                                                                                                                                                                                                                                                                                                                                                                                               
}
