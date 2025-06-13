import { FilterProvider } from "@/context/filter-context";
import Dashboard from "@/pages/dashboard";
import { BrowserRouter, Route, Routes } from "react-router";

const Providers = () => {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
};

export default Providers;
