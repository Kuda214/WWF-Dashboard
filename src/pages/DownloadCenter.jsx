import React, { useState }  from "react";
import DownloadCard from "../components/DownloadCard";

const dummyData = [
  {
    title: "INSURANCE_DATA",
    source: "dth_s3_mainframe_entity",
    operational: 100,
    quality: 100,
    popularity: 0,
    entity: "MANAGED",
    rows: 15654,
    lastLoad: "2018-09-25",
    category: "Oceans"
  },
  {
    title: "CRM_02_2017_Orders",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 44,
    entity: "MANAGED",
    rows: 3762,
    lastLoad: "2018-09-04",
    category: "Land"
  },
  {
    title: "REC_TRL",
    source: "dth_s3_mainframe_entity",
    operational: 100,
    quality: 100,
    popularity: 0,
    entity: "MANAGED",
    rows: 1,
    lastLoad: "2018-09-25",
    category: "Oceans"
  },
  {
    title: "Air_Quality_Measures",
    source: "data.gov",
    operational: 100,
    quality: 86,
    popularity: 9,
    entity: "MANAGED",
    rows: 157575,
    lastLoad: "2018-08-28",
    category: "Land"
  },
  {
    title: "NHS_DeathRates",
    source: "data.gov",
    operational: 100,
    quality: 100,
    popularity: 6,
    entity: "MANAGED",
    rows: 1044,
    lastLoad: "2018-08-28",
    category: "Wildlife"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Food"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Climate & Energy"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Water"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Wildlife"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Wildlife"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Climate & Energy"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Food"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Climate & Energy"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Land"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Wildlife"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Climate & Energy"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Water"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Oceans"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Land"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Wildlife"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Food"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Food"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Oceans"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Oceans"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Water"
  },
  {
    title: "new_suppliers_pk",
    source: "Salesforce_DB",
    operational: 100,
    quality: 100,
    popularity: 35,
    entity: "MANAGED",
    rows: 18487,
    lastLoad: "2018-09-21",
    category: "Water"
  },
  {
    title: "NDNSS_Table",
    source: "data.gov",
    operational: 100,
    quality: 45,
    popularity: 60,
    entity: "MANAGED",
    rows: 796,
    lastLoad: "2018-08-28",
    category: "Wildlife"
  },
];

const DownloadCenter = () => {
  const [category, setCategory] = useState('All');
  const [userType, setUserType] = useState("employee"); // "employee" or "partner"
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-100 px-6 py-2">
      
        <div className="w-full bg-gray-500 p-2 rounded text-white shadow-lg flex flex-wrap items-center justify-between gap-4 border-1 border-green-200 mb-6">
          <div className="flex items-center ">
            <h1 className="text-xl font-bold text-white ">
              Download Center
            </h1>
          </div>

           {/* Toggle: WWF Employee / Partner */}
          <div className="flex justify-start ">
            <button
              onClick={() => setUserType("report")}
              className={`px-4 py-2 text-sm font-semibold border rounded-l-lg ${
                userType === "report"
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              Report
            </button>
              <button
                onClick={() => setUserType("Data")}
                className={`px-4 py-2 text-sm font-semibold border rounded-r-lg ${
                  userType === "Data"
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-gray-100 text-gray-600 border-gray-300"
                }`}
              >
                Data
              </button>
            </div>


          {/* Search Bar */}
          <div className="flex justify-start ">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 text-sm font-semibold border rounded-l-lg"
            />
            <button className="px-4 py-2 text-sm font-semibold border rounded-r-lg bg-white hover:bg-green-400  text-black">
              Search
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-white font-medium">Filter by Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 border rounded text-white"
            >
              <option className=" text-gray-900" >All</option>
              <option className=" text-gray-900" >Oceans</option>
              <option className=" text-gray-900">Land</option>
              <option className=" text-gray-900">Wildlife</option>
              <option className=" text-gray-900">Circular Economy</option>
              <option className=" text-gray-900">Food</option>
              <option className=" text-gray-900">Climate & Energy</option>
              <option className=" text-gray-900">Water</option>
            </select>
          </div>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
       {dummyData
          .filter((item) => category === "All" || item.category === category)
          .map((item, idx) => (
            <DownloadCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
};

export default DownloadCenter;
