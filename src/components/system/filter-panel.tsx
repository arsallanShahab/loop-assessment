import { useFilter } from "@/context/filter-context";
import { Filter, Loader2 } from "lucide-react";
import { useCallback } from "react";
import MultiSelect from "./multi-select";

// Filter panel component
const FilterPanel: React.FC = () => {
  const { filters, setFilters, availableOptions, filterColumns, isLoading } =
    useFilter();

  const handleSelectionChange = useCallback(
    (column: string, values: Set<number>) => {
      setFilters((prev) => ({
        ...prev,
        [column]: values,
      }));
    },
    [setFilters]
  );

  const activeFiltersCount = Object.values(filters).reduce(
    (sum, filterSet) => sum + filterSet.size,
    0
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin mr-2" />
          <span className="text-gray-600">Loading filters...</span>
        </div>
      </div>
    );
  }

  if (filterColumns.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="text-center py-8 text-gray-500">
          No filter columns found in the dataset
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Filters
        </h3>
        {activeFiltersCount > 0 && (
          <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
            {activeFiltersCount} active
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterColumns.map((column) => (
          <MultiSelect
            key={column}
            label={column.toUpperCase()}
            column={column}
            options={availableOptions[column] || []}
            selectedValues={filters[column] || new Set()}
            onSelectionChange={handleSelectionChange}
            searchable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
