import { useFilter } from "@/context/filter-context";
import { useState } from "react";

// Updated types to be more flexible
export interface DataRow {
  [key: string]: number | string; // Allow any column name with number or string values
}

interface DataTableProps {
  data: DataRow[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const { filterColumns } = useFilter(); // Get dynamic columns from context
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

  // Get all available columns from the first row of data (fallback to filterColumns)
  const allColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const displayColumns = ["number", ...filterColumns]; // Always show 'number' first, then dynamic columns

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
              {displayColumns.map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column === "number" ? "Number" : column.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {visibleData.map((row, index) => (
              <tr key={row.number || index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {(currentPage - 1) * rowsPerPage + visibleStart + index + 1}
                </td>
                {displayColumns.map((column) => (
                  <td
                    key={column}
                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                      column === "number"
                        ? "font-medium text-gray-900"
                        : "text-gray-500"
                    }`}
                  >
                    {row[column] ?? "N/A"}
                  </td>
                ))}
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

export default DataTable;
