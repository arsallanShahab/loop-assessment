import { fireEvent, render, screen } from "@testing-library/react";
import MultiSelect from "../../components/system/multi-select";

describe("MultiSelect Component", () => {
  const mockProps = {
    label: "Test Label",
    column: "mod3",
    options: [1, 2, 3, 4, 5],
    selectedValues: new Set([1, 3]),
    onSelectionChange: jest.fn(),
    searchable: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with label", () => {
    render(<MultiSelect {...mockProps} />);
    expect(screen.getByTestId("multiselect-trigger")).toBeInTheDocument();
  });

  it("should show selected count", () => {
    render(<MultiSelect {...mockProps} />);
    expect(screen.getByTestId("multiselect-trigger")).toHaveTextContent(
      "Test Label (2)"
    );
  });

  it("should open dropdown when clicked", () => {
    render(<MultiSelect {...mockProps} />);
    const trigger = screen.getByTestId("multiselect-trigger");

    fireEvent.click(trigger);
    expect(screen.getByTestId("multiselect-search")).toBeInTheDocument();
  });

  it("should show search input when searchable is true", () => {
    render(<MultiSelect {...mockProps} />);
    const trigger = screen.getByTestId("multiselect-trigger");

    fireEvent.click(trigger);
    expect(screen.getByTestId("multiselect-search")).toBeInTheDocument();
  });

  it("should display all options when opened", () => {
    render(<MultiSelect {...mockProps} />);
    const trigger = screen.getByTestId("multiselect-trigger");

    fireEvent.click(trigger);
    mockProps.options.forEach((option) => {
      expect(screen.getByTestId(`option-${option}`)).toBeInTheDocument();
    });
  });

  it("should call onSelectionChange when option is clicked", () => {
    render(<MultiSelect {...mockProps} />);
    const trigger = screen.getByTestId("multiselect-trigger");

    fireEvent.click(trigger);

    const option = screen.getByTestId("option-2");
    fireEvent.click(option);

    expect(mockProps.onSelectionChange).toHaveBeenCalledWith(
      "mod3",
      expect.any(Set)
    );
  });
});
