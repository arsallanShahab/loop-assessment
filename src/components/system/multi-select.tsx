import { ChevronDown, Search } from "lucide-react";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface MultiSelectProps {
  label: string;
  column: string;
  options: number[];
  selectedValues: Set<number>;
  onSelectionChange: (column: string, values: Set<number>) => void;
  searchable?: boolean;
}
const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  column,
  options,
  selectedValues,
  onSelectionChange,
  searchable = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((option) =>
      option.toString().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const handleToggleOption = useCallback(
    (value: number) => {
      const newSelection = new Set(selectedValues);
      if (newSelection.has(value)) {
        newSelection.delete(value);
      } else {
        newSelection.add(value);
      }
      onSelectionChange(column, newSelection);
    },
    [column, selectedValues, onSelectionChange]
  );

  const handleClearAll = useCallback(() => {
    onSelectionChange(column, new Set());
  }, [column, onSelectionChange]);

  const selectedCount = selectedValues.size;
  const displayText =
    selectedCount === 0 ? `Select ${label}` : `${label} (${selectedCount})`;

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-testid="multiselect-trigger"
        className="w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <div className="flex items-center justify-between">
          <span className="truncate">{displayText}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-hidden">
          {searchable && (
            <div className="p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  data-testid="multiselect-search"
                  type="text"
                  placeholder="Type to search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div className="p-2 border-b border-gray-200">
            <button
              data-testid="clear-all-button"
              onClick={handleClearAll}
              className="text-sm text-red-600 hover:text-red-800"
              disabled={selectedCount === 0}
            >
              Clear All ({selectedCount})
            </button>
          </div>

          <div className="max-h-40 overflow-y-auto">
            {filteredOptions.map((option) => (
              <Label
                key={option}
                data-testid={`option-${option}`}
                className="flex items-center px-3 py-2 hover:bg-gray-50 cursor-pointer"
              >
                <Checkbox
                  checked={selectedValues.has(option)}
                  onCheckedChange={() => handleToggleOption(option)}
                  className="mr-3"
                />
                <span className="text-sm">{option}</span>
                {/* <span className="ml-auto text-xs text-gray-500">
                  {options.includes(option) ? "Available" : "N/A"}
                </span> */}
              </Label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
