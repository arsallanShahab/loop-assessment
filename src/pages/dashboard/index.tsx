import DataTable from "@/components/dashboard/data-table";
import FilterPanel from "@/components/system/filter-panel";
import { useFilter } from "@/context/filter-context";
import React from "react";

// Main dashboard component
const Dashboard: React.FC = () => {
  const { filteredData } = useFilter();

  return (
    <div className="min-h-screen bg-white p-20">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">
            Business Intelligence Dashboard
          </h1>
          <p className="text-gray-400">
            Dynamic filtering system with interdependent filters
          </p>
        </div>

        <FilterPanel />
        <DataTable data={filteredData || []} />
      </div>
    </div>
  );
};

export default Dashboard;
