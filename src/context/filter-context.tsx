import type { DataRow } from "@/components/dashboard/data-table";
import Papa from "papaparse";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface FilterState {
  [key: string]: Set<number>;
}

interface FilterContextType {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filteredData: DataRow[] | undefined;
  availableOptions: { [key: string]: number[] };
  filterColumns: string[];
  isLoading: boolean;
}

// Context for state management
const FilterContext = createContext<FilterContextType | null>(null);

// Custom hook to use filter context
export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within FilterProvider");
  }
  return context;
};

// Filter provider component
export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [rawData, setRawData] = useState<DataRow[]>();
  const [filters, setFilters] = useState<FilterState>({});
  const [filterColumns, setFilterColumns] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to extract mod columns from CSV headers
  const extractModColumns = (headers: string[]): string[] => {
    const modColumns = headers.filter(
      (header) => header.match(/^mod\d+$/i) // Match columns like mod3, mod350, mod8000
    );
    console.log("Found mod columns:", modColumns);
    return modColumns;
  };

  const loadCSVData = async (): Promise<{
    data: DataRow[];
    columns: string[];
  }> => {
    try {
      setIsLoading(true);

      let response: Response;

      if (import.meta.env.VITE_ENV === "development") {
        // small dataset for testing
        response = await fetch("/data/dataset_small.csv");
      } else {
        // large dataset for production
        response = await fetch("/data/dataset_large.csv");
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const csvContent = await response.text();
      console.log(csvContent);
      const parsed = Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      // Extract mod columns from the parsed headers
      const headers = parsed.meta.fields || [];
      const modColumns = extractModColumns(headers);

      console.log("CSV Headers:", headers);
      console.log("Extracted mod columns:", modColumns);

      return {
        data: parsed.data as DataRow[],
        columns: modColumns,
      };
    } catch (error) {
      console.error("Error loading CSV:", error);
      return { data: [], columns: [] };
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize filters based on discovered columns
  const initializeFilters = (columns: string[]) => {
    const initialFilters: FilterState = {};
    columns.forEach((column) => {
      initialFilters[column] = new Set();
    });
    setFilters(initialFilters);
  };

  // Calculate filtered data based on active filters
  const filteredData = useMemo(() => {
    return rawData?.filter((row) => {
      return Object.entries(filters).every(([column, selectedValues]) => {
        if (selectedValues.size === 0) return true;
        return selectedValues.has(row[column as keyof DataRow] as number);
      });
    });
  }, [rawData, filters, filterColumns]);

  // Calculate available options for each filter based on current filtered data
  const availableOptions = useMemo(() => {
    const options: { [key: string]: number[] } = {};
    if (!rawData || filterColumns.length === 0) return options;

    filterColumns.forEach((column) => {
      // For the current column being filtered, show all original options
      // For other columns, show only options available in filtered data
      const dataToConsider = Object.entries(filters).some(
        ([filterColumn, filterValues]) =>
          filterColumn !== column && filterValues.size > 0
      )
        ? filteredData
        : rawData;

      const uniqueValues = [
        ...new Set(
          dataToConsider?.map((row) => row[column as keyof DataRow] as number)
        ),
      ].sort((a, b) => a - b);

      options[column] = uniqueValues;
    });

    return options;
  }, [rawData, filteredData, filters, filterColumns]);

  useEffect(() => {
    loadCSVData().then(({ data, columns }) => {
      setRawData(data);
      setFilterColumns(columns);
      initializeFilters(columns);
    });
  }, []);

  const contextValue: FilterContextType = {
    filters,
    setFilters,
    filteredData,
    availableOptions,
    filterColumns,
    isLoading,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
