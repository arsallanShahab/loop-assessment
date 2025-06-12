import FilterPanel from "@/components/system/filter-panel";
import { FilterProvider, useFilter } from "@/context/filter-context";
import React, { useState } from "react";

// Types
export interface DataRow {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
}

// Data table component
interface DataTableProps {
  data: DataRow[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleStart, setVisibleStart] = useState(0);

  const rowsPerPage = 100;
  const visibleRows = 20;

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const pageData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const visibleData = pageData.slice(visibleStart, visibleStart + visibleRows);

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "down" && visibleStart + visibleRows < pageData.length) {
      setVisibleStart((prev) => prev + 20);
    } else if (direction === "up" && visibleStart > 0) {
      setVisibleStart((prev) => prev - 20);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setVisibleStart(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Data Table ({data.length} records)
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mod 3
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mod 4
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mod 5
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Mod 6
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleData.map((row, index) => (
              <tr key={row.number} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * rowsPerPage + visibleStart + index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {row.number}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.mod3}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.mod4}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.mod5}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.mod6}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleScroll("up")}
              disabled={visibleStart === 0}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↑ Scroll Up
            </button>
            <button
              onClick={() => handleScroll("down")}
              disabled={visibleStart + visibleRows >= pageData.length}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ↓ Scroll Down
            </button>
            <span className="text-sm text-gray-600">
              Showing {visibleStart + 1}-
              {Math.min(visibleStart + visibleRows, pageData.length)} of{" "}
              {pageData.length} in page
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                handlePageChange(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

const App: React.FC = () => {
  return (
    <FilterProvider>
      <Dashboard />
    </FilterProvider>
  );
};

export default App;
