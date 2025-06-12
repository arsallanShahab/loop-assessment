import type { DataRow } from "@/pages/home";
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
  const [filters, setFilters] = useState<FilterState>({
    mod3: new Set(),
    mod4: new Set(),
    mod5: new Set(),
    mod6: new Set(),
  });

  const loadCSVData = async (): Promise<DataRow[]> => {
    try {
      // small dataset for testing
      // const response = await fetch("/data/dataset_small.csv");
      // large dataset for production
      const response = await fetch("/data/dataset_large.csv");
      const csvContent = await response.text();
      console.log(csvContent);
      const parsed = Papa.parse(csvContent, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });
      return parsed.data as DataRow[];
    } catch (error) {
      console.error("Error loading CSV:", error);
      return [];
    }
  };

  // Calculate filtered data based on active filters
  const filteredData = useMemo(() => {
    return rawData?.filter((row) => {
      return Object.entries(filters).every(([column, selectedValues]) => {
        if (selectedValues.size === 0) return true;
        return selectedValues.has(row[column as keyof DataRow] as number);
      });
    });
  }, [rawData, filters]);

  // Calculate available options for each filter based on current filtered data
  const availableOptions = useMemo(() => {
    const options: { [key: string]: number[] } = {};
    const filterColumns = ["mod3", "mod4", "mod5", "mod6"];

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
  }, [rawData, filteredData, filters]);

  useEffect(() => {
    loadCSVData().then(setRawData);
  }, []);

  const contextValue: FilterContextType = {
    filters,
    setFilters,
    filteredData,
    availableOptions,
  };

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};
