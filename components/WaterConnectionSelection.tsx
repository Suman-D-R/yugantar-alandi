"use client";

import { useState } from "react";

export default function WaterConnectionSelection() {
  const [hasWaterConnection, setHasWaterConnection] = useState<string | null>(null);
  const [authorizedConnections, setAuthorizedConnections] = useState<number>(0);
  const [unauthorizedConnections, setUnauthorizedConnections] = useState<number>(0);
  const [authorizedDiameters, setAuthorizedDiameters] = useState<string[]>([]);
  const [unauthorizedDiameters, setUnauthorizedDiameters] = useState<string[]>([]);

  const handleDiameterChange = (
    selectedDiameters: string[],
    setDiameters: React.Dispatch<React.SetStateAction<string[]>>,
    value: string
  ) => {
    if (selectedDiameters.includes(value)) {
      setDiameters(selectedDiameters.filter((d) => d !== value));
    } else {
      setDiameters([...selectedDiameters, value]);
    }
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
            onChange={() => setHasWaterConnection("yes")}
            title="Select 'Yes' if there is a municipal water connection"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="water_connection"
            value="no"
            onChange={() => setHasWaterConnection("no")}
            title="Select 'No' if there is no municipal water connection"
          />
          <span>No</span>
        </label>
      </div>

      {hasWaterConnection === "yes" && (
        <div className="mt-4 space-y-4">
          <div>
            <label
              className="block font-medium"
              title="Select the number of authorized water connections"
            >
              No of Authorized Water Connections:
            </label>
            <select
              className="border rounded p-2 w-20"
              value={authorizedConnections}
              onChange={(e) => setAuthorizedConnections(Number(e.target.value))}
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
                      onChange={() =>
                        handleDiameterChange(authorizedDiameters, setAuthorizedDiameters, size)
                      }
                      title={`Select diameter ${size} for authorized connections`}
                      className="w-5 h-5" // Increased size
                    />
                    <span>{size}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label
              className="block font-medium"
              title="Select the number of unauthorized water connections"
            >
              No of Un-Authorized Water Connections:
            </label>
            <select
              className="border rounded p-2 w-20"
              value={unauthorizedConnections}
              onChange={(e) => setUnauthorizedConnections(Number(e.target.value))}
              title="Choose the number of unauthorized water connections"
            >
              {[0, 1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          {unauthorizedConnections >= 2 && (
            <div>
              <label
                className="block font-medium"
                title="Select the diameter of unauthorized water connections"
              >
                Diameter of Un-Authorized Connections:
              </label>
              <div className="flex flex-wrap gap-2">
                {["0.5\"", "0.75\"", "1.0\"", "1.25\"", "1.5\"", "2\""].map((size) => (
                  <label key={size} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={size}
                      checked={unauthorizedDiameters.includes(size)}
                      onChange={() =>
                        handleDiameterChange(unauthorizedDiameters, setUnauthorizedDiameters, size)
                      }
                      title={`Select diameter ${size} for unauthorized connections`}
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
