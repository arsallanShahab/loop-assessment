import Home from "@/pages/home";
import { BrowserRouter, Route, Routes } from "react-router";

const Providers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Providers;
