"use client";

export default function WaterConnectionSelection() {
  return (
    <div>
      <label className="block font-medium">
        Is there a Municipal Water Connection?
      </label>
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="water_connection"
            value="yes"
            title="Select if there is a municipal water connection"
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="water_connection"
            value="no"
            title="Select if there is no municipal water connection"
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
}
