'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImageMetadata from "exif-js";

interface ImageUploaderProps {
  label: string;
  title: string;
  accept?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageUploader({
  label,
  title,
  accept = "image/*",
  onChange,
}: ImageUploaderProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [coordinates, setCoordinates] = useState<{ lat: string; lng: string } | null>(null);

  useEffect(() => {
    const updateWindowWidth = () => setWindowWidth(window.innerWidth);
    updateWindowWidth();
    window.addEventListener("resize", updateWindowWidth);
    return () => window.removeEventListener("resize", updateWindowWidth);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);

        // Extract ImageMetadata data for latitude and longitude
        ImageMetadata.getData(file, function (this: any) {
          const lat = ImageMetadata.getTag(this, "GPSLatitude");
          const lng = ImageMetadata.getTag(this, "GPSLongitude");
          const latRef = ImageMetadata.getTag(this, "GPSLatitudeRef");
          const lngRef = ImageMetadata.getTag(this, "GPSLongitudeRef");

          if (lat && lng) {
            const latitude = convertDMSToDD(lat, latRef);
            const longitude = convertDMSToDD(lng, lngRef);
            setCoordinates({ lat: latitude, lng: longitude });
          } else {
            setCoordinates({ lat: "Not Available", lng: "Not Available" });
          }
        });
      };
      reader.readAsDataURL(file);
    }
    onChange(event);
  };

  const convertDMSToDD = (dms: number[], ref: string): string => {
    if (!dms || dms.length !== 3) return "Invalid Data";
    const [degrees, minutes, seconds] = dms;
    let dd = degrees + minutes / 60 + seconds / 3600;
    if (ref === "S" || ref === "W") {
      dd = -dd;
    }
    return dd.toFixed(6);
  };

  return (
    <div>
      <label className="block font-medium">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-md p-2"
        title={title}
      />
      <p className="text-sm text-gray-500 mt-1">{title}</p>
      {preview && (
        <Image
          src={preview}
          alt="Preview"
          className="w-full max-w-md rounded shadow"
          width={windowWidth}
          height={windowWidth * 0.75}
        />
      )}
      {coordinates && (
        <p className="text-sm text-gray-600 mt-2">
          Latitude: {coordinates.lat}, Longitude: {coordinates.lng}
        </p>
      )}
    </div>
  );
}
