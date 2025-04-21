"use client";

import { useState } from "react";

interface WaterConnectionSelectionProps {
  onChange: (value: {
    hasWaterConnection: string | null;
    authorizedConnections: number;
    authorizedDiameters: string[];
  }) => void;
}

export default function WaterConnectionSelection({ onChange }: WaterConnectionSelectionProps) {
  const [hasWaterConnection, setHasWaterConnection] = useState<string | null>(null);
  const [authorizedConnections, setAuthorizedConnections] = useState<number>(0);
  const [authorizedDiameters, setAuthorizedDiameters] = useState<string[]>([]);

  const handleDiameterChange = (value: string) => {
    const updatedDiameters = authorizedDiameters.includes(value)
      ? authorizedDiameters.filter((d) => d !== value)
      : [...authorizedDiameters, value];
    setAuthorizedDiameters(updatedDiameters);
    onChange({ hasWaterConnection, authorizedConnections, authorizedDiameters: updatedDiameters });
  };

  const handleHasWaterConnectionChange = (value: string) => {
    setHasWaterConnection(value);
    onChange({ hasWaterConnection: value, authorizedConnections, authorizedDiameters });
  };

  const handleAuthorizedConnectionsChange = (value: number) => {
    setAuthorizedConnections(value);
    onChange({ hasWaterConnection, authorizedConnections: value, authorizedDiameters });
  };

  return (
    <div>
      <label className="block font-medium" title="Select if there is a municipal water connection">
        Is there a Municipal Water Connection?
      </label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="water_connection"
            value="yes"
            onChange={() => handleHasWaterConnectionChange("yes")}
            title="Select 'Yes' if there is a municipal water connection"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="water_connection"
            value="no"
            onChange={() => handleHasWaterConnectionChange("no")}
            title="Select 'No' if there is no municipal water connection"
          />
          <span>No</span>
        </label>
      </div>

      {hasWaterConnection === "yes" && (
        <div className="mt-4 space-y-4">
          <div>
            <label
              className="block font-medium mb-1"
              title="Select the number of authorized water connections"
            >
              No of Authorized Water Connections:
            </label>
            <select
              className="w-full border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={authorizedConnections}
              onChange={(e) => handleAuthorizedConnectionsChange(Number(e.target.value))}
              title="Choose the number of authorized water connections"
            >
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {authorizedConnections >= 2 && (
            <div>
              <label
                className="block font-medium"
                title="Select the diameter of authorized water connections"
              >
                Diameter of Authorized Connections:
              </label>
              <div className="flex flex-wrap gap-2 ">
                {["0.5\"", "0.75\"", "1.0\"", "1.25\"", "1.5\"", "2\""].map((size) => (
                  <label key={size} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={size}
                      checked={authorizedDiameters.includes(size)}
                      onChange={() => handleDiameterChange(size)}
                      title={`Select diameter ${size} for authorized connections`}
                      className="w-5 h-5" // Increased size
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
