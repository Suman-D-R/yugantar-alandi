import TypeOfProperty from "../components/TypeOfProperty";
import WaterConnectionSelection from "../components/WaterConnectionSelection";

export default function Home() {

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
              className="w-full border border-gray-300 rounded-md p-2"
              title="Enter the address"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium">Latitude</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                title="Enter the latitude"
              />
            </div>
            <div>
              <label className="block font-medium">Longitude</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md p-2"
                title="Enter the longitude"
              />
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
          <div>
            <label className="block font-medium">
              Upload Water Tax Bill
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md p-2"
              title="Upload the water tax bill"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
