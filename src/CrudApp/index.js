import React from "react";
import { Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Display from "./components/Display";
import Update from "./components/Update";

const CrudApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Display />} />
      <Route path="/create" element={<Create />} />
      <Route path="/update" element={<Update />} />
    </Routes>
  );
};

export default CrudApp;
