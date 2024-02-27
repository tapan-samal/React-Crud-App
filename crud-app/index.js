import React from "react";
import Display from "./components/Display";
import Create from "./components/Create";
import Update from "./components/Update";
import { Route, Routes } from "react-router-dom";

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
 