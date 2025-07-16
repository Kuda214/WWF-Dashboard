import React from "react";
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
  },
];

const DownloadCenter = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-100 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-black mb-6">
        Download Center
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {dummyData.map((item, idx) => (
          <DownloadCard key={idx} data={item} />
        ))}
      </div>
    </div>
  );
};

export default DownloadCenter;
