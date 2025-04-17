// components/GeoCapture.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

const GeoCapture = () => {
  const [image, setImage] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Get Geolocation on image capture
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          console.error("Location error:", err);
        }
      );
    }
  };

  return (
    <div className="p-4 space-y-4">
      <label className="block text-blue-600 font-medium mb-2">Capture Photo</label>
      <input
        type="file"
        accept="image/*"
        capture="environment" // Use "user" for front camera
        onChange={handleImageChange}
        className="block w-full"
        title="Click a photo of the property or upload an image"
      />

      {image && (
        <div>
          <Image
            src={image}
            alt="Captured"
            className="w-full max-w-md rounded shadow"
            title="Display Image"
            width={500}
            height={500}
          />
          
        </div>
      )}

      {location && (
        <p className="text-sm text-gray-600">
          Location: Lat {location.lat}, Lng {location.lng}
        </p>
      )}
    </div>
  );
};

export default GeoCapture;